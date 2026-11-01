package repos

import (
	"time"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"errors"
	"fmt"
	"database/sql"
	"os"
)

var DB *gorm.DB 
var SQLDB *sql.DB

func InitDB() error {
	host := os.Getenv("DB_HOST")
	user := os.Getenv("DB_USER")
	pwd := os.Getenv("DB_PASSWORD")
	db_name := os.Getenv("DB_NAME")
	dsn := user + ":" + pwd +"@tcp(" + host + ")/" + db_name +"?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return err
	}

	sqlDB, err := db.DB()
	if err != nil {
		return err
	}

	sqlDB.SetMaxOpenConns(50)                
	sqlDB.SetMaxIdleConns(25)                  
	sqlDB.SetConnMaxLifetime(4 * time.Minute)  

	if err := sqlDB.Ping(); err != nil {
		return err
	}

	DB = db 
	SQLDB = sqlDB
	return nil
}

func QueryOne[T any](query string, args ...interface{}) (*T, error) {
	var result T

	tx := DB.Raw(query, args...).Scan(&result)

	if tx.Error != nil {
		return nil, fmt.Errorf("query one: %w", tx.Error)
	}
	if tx.RowsAffected == 0 {
		return nil, errors.New("record not found")
	}
	return &result, nil
}

func QueryMany[T any](query string, args ...interface{}) ([]T, error) {
	var results []T

	result := DB.Raw(query, args...).Scan(&results)

	if result.Error != nil {
		return nil, fmt.Errorf("query many: %w", result.Error)
	}
	return results, nil
}

type ExecResult struct {
	RowsAffected int64
	LastInsertID int64
	SQL          string
	Duration     time.Duration
}

func ExecuteSQL(query string, args ...interface{}) (*ExecResult, error) {
	result := DB.Exec(query, args...)

	res := &ExecResult{
		RowsAffected: result.RowsAffected,
		SQL:          result.Statement.SQL.String(),
	}

	// GORM 把底层 sql.Result 放在 Statement.Result 里，取 LastInsertId 需要它
	// if r, ok := tx.Statement.Result.(sql.Result); ok && r != nil {
	// 	if id, err := r.LastInsertId(); err == nil {
	// 		res.LastInsertID = id
	// 	}
	// }

	if result.Error != nil {
		return res, fmt.Errorf("exec: %w", result.Error)
	}
	return res, nil
}