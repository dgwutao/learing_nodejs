package utils

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"errors"
	"time"
	"learning_golang/src/repos"
	"github.com/redis/go-redis/v9"
)

const (
	SessionPrefix      = "session:"
	UserSessionsPrefix = "user_sessions:"
)

const (
	DefaultTTL     = 7 * 24 * time.Hour // 7 天
	TouchThreshold = 5 * time.Minute    // 5 分钟
)

var (
	ErrEmptyToken = errors.New("session: empty token")
	ErrNilStore   = errors.New("session: nil store")
)

func sessionKey(token string) string       { return SessionPrefix + token }
func userSessionsKey(userID string) string { return UserSessionsPrefix + userID }

type Session struct {
	Token        string         `json:"token"`
	UserID       string         `json:"userId"`
	Username     string         `json:"username"`
	Roles        []string       `json:"roles"`
	CreatedAt    int64          `json:"createdAt"`    // 毫秒时间戳
	LastActiveAt int64          `json:"lastActiveAt"` // 毫秒时间戳
	Meta         map[string]any `json:"-"`            // 平铺的额外字段
}

func (s *Session) MarshalJSON() ([]byte, error) {
	roles := s.Roles
	if roles == nil {
		roles = []string{}
	}

	m := make(map[string]any, 6+len(s.Meta))
	m["token"] = s.Token
	m["userId"] = s.UserID
	m["username"] = s.Username
	m["roles"] = roles
	m["createdAt"] = s.CreatedAt
	m["lastActiveAt"] = s.LastActiveAt
	for k, v := range s.Meta {
		m[k] = v
	}
	return json.Marshal(m)
}

func (s *Session) UnmarshalJSON(data []byte) error {
	var raw map[string]json.RawMessage
	if err := json.Unmarshal(data, &raw); err != nil {
		return err
	}

	get := func(k string, dst any) {
		if v, ok := raw[k]; ok && string(v) != "null" {
			_ = json.Unmarshal(v, dst)
		}
	}
	get("token", &s.Token)
	get("userId", &s.UserID)
	get("username", &s.Username)
	get("roles", &s.Roles)
	get("createdAt", &s.CreatedAt)
	get("lastActiveAt", &s.LastActiveAt)

	for _, k := range []string{"token", "userId", "username", "roles", "createdAt", "lastActiveAt"} {
		delete(raw, k)
	}

	if len(raw) > 0 {
		s.Meta = make(map[string]any, len(raw))
		for k, v := range raw {
			var val any
			if err := json.Unmarshal(v, &val); err == nil {
				s.Meta[k] = val
			}
		}
	} else {
		s.Meta = nil
	}
	return nil
}

// User 是创建会话所需的最小用户信息。
type User struct {
	ID       string
	Username string
	Roles    []string
}

// CreateOptions 可选参数。
type CreateOptions struct {
	TTL  time.Duration  // 0 表示使用 DefaultTTL
	Meta map[string]any // 额外写入会话的字段
}

// ---------------------------------------------------------------- Store

// Store 持有 Redis 客户端，封装所有会话操作。
type Store struct {
	rdb *redis.Client
	TTL time.Duration // 默认过期时间，零值视为 DefaultTTL
}

func DefaultStore() *Store {
	return &Store{rdb: repos.RDB, TTL: DefaultTTL}
}


func (s *Store) CreateSession(ctx context.Context, user User, opts *CreateOptions) (*Session, error) {
	if s == nil || s.rdb == nil {
		return nil, ErrNilStore
	}
	if opts == nil {
		opts = &CreateOptions{}
	}
	ttl := s.resolveTTL(opts.TTL)

	token, err := randomToken()
	if err != nil {
		return nil, err
	}

	now := time.Now().UnixMilli()
	sess := &Session{
		Token:        token,
		UserID:       user.ID,
		Username:     user.Username,
		Roles:        user.Roles,
		CreatedAt:    now,
		LastActiveAt: now,
		Meta:         opts.Meta,
	}
	if sess.Roles == nil {
		sess.Roles = []string{}
	}

	payload, err := json.Marshal(sess)
	if err != nil {
		return nil, err
	}

	uKey := userSessionsKey(sess.UserID)
	pipe := s.rdb.TxPipeline()
	pipe.Set(ctx, sessionKey(token), payload, ttl)
	pipe.SAdd(ctx, uKey, token)
	pipe.Expire(ctx, uKey, ttl)
	if _, err := pipe.Exec(ctx); err != nil {
		return nil, err
	}

	return sess, nil
}

func (s *Store) GetSession(ctx context.Context, token string) (*Session, error) {
	if s == nil || s.rdb == nil {
		return nil, ErrNilStore
	}
	if token == "" {
		return nil, nil
	}

	raw, err := s.rdb.Get(ctx, sessionKey(token)).Result()
	if errors.Is(err, redis.Nil) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}

	var sess Session
	if err := json.Unmarshal([]byte(raw), &sess); err != nil {
		_ = s.rdb.Del(ctx, sessionKey(token)).Err()
		return nil, nil
	}
	return &sess, nil
}


func (s *Store) TouchSession(ctx context.Context, sess *Session, ttl time.Duration) (bool, error) {
	if s == nil || s.rdb == nil {
		return false, ErrNilStore
	}
	if sess == nil || sess.Token == "" {
		return false, nil
	}

	now := time.Now().UnixMilli()
	if now-sess.LastActiveAt < TouchThreshold.Milliseconds() {
		return false, nil
	}
	sess.LastActiveAt = now

	ttl = s.resolveTTL(ttl)
	if err := s.persist(ctx, sess, ttl); err != nil {
		return false, err
	}
	return true, nil
}

// SaveSession 保存并续期会话（滑动过期）。
func (s *Store) SaveSession(ctx context.Context, sess *Session, ttl time.Duration) (*Session, error) {
	if s == nil || s.rdb == nil {
		return nil, ErrNilStore
	}
	if sess == nil || sess.Token == "" {
		return nil, nil
	}

	sess.LastActiveAt = time.Now().UnixMilli()

	ttl = s.resolveTTL(ttl)
	if err := s.persist(ctx, sess, ttl); err != nil {
		return nil, err
	}
	return sess, nil
}

func (s *Store) persist(ctx context.Context, sess *Session, ttl time.Duration) error {
	payload, err := json.Marshal(sess)
	if err != nil {
		return err
	}

	uKey := userSessionsKey(sess.UserID)
	pipe := s.rdb.TxPipeline()
	pipe.Set(ctx, sessionKey(sess.Token), payload, ttl)
	pipe.Expire(ctx, uKey, ttl)
	_, err = pipe.Exec(ctx)
	return err
}

func (s *Store) DestroySession(ctx context.Context, token, userID string) (bool, error) {
	if s == nil || s.rdb == nil {
		return false, ErrNilStore
	}
	if token == "" {
		return false, nil
	}

	key := sessionKey(token)
	raw, err := s.rdb.Get(ctx, key).Result()
	if err != nil && !errors.Is(err, redis.Nil) {
		return false, err
	}
	existed := err == nil && raw != ""

	_ = s.rdb.Del(ctx, key).Err()

	if existed {
		if userID == "" {
			var sess Session
			if json.Unmarshal([]byte(raw), &sess) == nil {
				userID = sess.UserID
			}
		}
		if userID != "" {
			_ = s.rdb.SRem(ctx, userSessionsKey(userID), token).Err()
		}
	}

	return existed, nil
}


func (s *Store) DestroyAllUserSessions(ctx context.Context, userID string) (int, error) {
	if s == nil || s.rdb == nil {
		return 0, ErrNilStore
	}
	if userID == "" {
		return 0, nil
	}

	uKey := userSessionsKey(userID)
	tokens, err := s.rdb.SMembers(ctx, uKey).Result()
	if err != nil {
		return 0, err
	}
	if len(tokens) == 0 {
		return 0, nil
	}

	keys := make([]string, 0, len(tokens)+1)
	for _, t := range tokens {
		keys = append(keys, sessionKey(t))
	}
	keys = append(keys, uKey)

	if err := s.rdb.Del(ctx, keys...).Err(); err != nil {
		return 0, err
	}
	return len(tokens), nil
}


func (s *Store) resolveTTL(ttl time.Duration) time.Duration {
	if ttl <= 0 {
		ttl = s.TTL
	}
	if ttl <= 0 {
		ttl = DefaultTTL
	}
	// Redis EX 精度为秒，且必须 >= 1s
	if ttl < time.Second {
		ttl = time.Second
	}
	return ttl.Truncate(time.Second)
}

func randomToken() (string, error) {
	b := make([]byte, 32)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}

	return base64.RawURLEncoding.EncodeToString(b), nil
}