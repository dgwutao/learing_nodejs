
import process from 'node:process';

const CONFIG = {
  services: [
    { name: '主服务-3000', url: 'http://127.0.0.1:3000/health' },
    { name: '主服务-3001', url: 'http://127.0.0.1:3001/health' },
  ],

  intervalMs: 60_000,    
  timeoutMs: 10_000,         
  failureThreshold: 3,       
  recoveryThreshold: 2,    

  webhookUrl: process.env.HEALTH_WEBHOOK_URL || '',

  historyLimit: 100,
};


const states = new Map();

function getState(name) {
  if (!states.has(name)) {
    states.set(name, {
      consecutiveFailures: 0,
      consecutiveSuccesses: 0,
      alerting: false,          // 当前是否处于“已告警”状态
      history: [],              // 最近几次检测结果
      lastError: null,
    });
  }
  return states.get(name);
}

async function notify(title, message, level = 'error') {
  const timestamp = new Date().toISOString();
  const text = `[${timestamp}] ${title}\n${message}`;

  const logFn = level === 'error' ? console.error : console.log;
  logFn(text);

  if (!CONFIG.webhookUrl) return;

  try {
    const isSlack = CONFIG.webhookUrl.includes('slack.com');
    const body = isSlack
      ? { text }
      : { msgtype: 'text', text: { content: text } };

    const resp = await fetch(CONFIG.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });

    if (!resp.ok) {
      console.error(`通知发送失败：HTTP ${resp.status}`);
    }
  } catch (err) {
    console.error(`通知发送异常：${err.message}`);
  }
}

async function checkService(service) {
  const state = getState(service.name);
  const startedAt = Date.now();

  let ok = false;
  let statusCode = null;
  let errorMsg = null;

  try {
    const resp = await fetch(service.url, {
      method: 'GET',
      signal: AbortSignal.timeout(CONFIG.timeoutMs),
    });
    statusCode = resp.status;
    ok = resp.status === 200;
    if (!ok) {
      const body = await resp.text().catch(() => '');
      errorMsg = `HTTP ${resp.status}${body ? `: ${body.slice(0, 200)}` : ''}`;
    }
  } catch (err) {
    errorMsg = err.name === 'TimeoutError'
      ? `请求超时（>${CONFIG.timeoutMs}ms）`
      : err.message;
  }

  const elapsed = Date.now() - startedAt;

  state.history.push({
    at: new Date().toISOString(),
    ok,
    statusCode,
    elapsed,
    error: errorMsg,
  });
  if (state.history.length > CONFIG.historyLimit) {
    state.history.shift();
  }

  if (!ok) {
    state.consecutiveSuccesses = 0;
    state.consecutiveFailures++;
    state.lastError = errorMsg;

    if (state.consecutiveFailures >= CONFIG.failureThreshold && !state.alerting) {
      state.alerting = true;
      await notify(
        `🔴 服务异常：${service.name}`,
        `地址：${service.url}\n` +
          `连续失败：${state.consecutiveFailures} 次\n` +
          `最后错误：${errorMsg}\n` +
          `耗时：${elapsed}ms`
      );
    }
  } else {
    state.consecutiveFailures = 0;
    state.consecutiveSuccesses++;

    // 连续成功达到阈值，且之前处于告警状态 → 发恢复通知
    if (state.consecutiveSuccesses >= CONFIG.recoveryThreshold && state.alerting) {
      state.alerting = false;
      await notify(
        `🟢 服务已恢复：${service.name}`,
        `地址：${service.url}\n` +
          `连续成功：${state.consecutiveSuccesses} 次\n` +
          `耗时：${elapsed}ms`,
        'info'
      );
    }
  }
}

async function pollAll() {
  await Promise.allSettled(
    CONFIG.services.map((svc) =>
      checkService(svc).catch((err) => {
        console.error(`检测 ${svc.name} 时发生意外错误：`, err);
      })
    )
  );
}

function main() {
  console.log('健康检测启动');
  console.log(`监控 ${CONFIG.services.length} 个服务，间隔 ${CONFIG.intervalMs}ms`);
  if (!CONFIG.webhookUrl) {
    console.warn('⚠️  未配置 HEALTH_WEBHOOK_URL，告警只会输出到控制台');
  }

  pollAll();

  const timer = setInterval(pollAll, CONFIG.intervalMs);

  const shutdown = (signal) => {
    console.log(`\n收到 ${signal}，停止检测`);
    clearInterval(timer);
    for (const [name, state] of states) {
      console.log(
        `${name}: ${state.alerting ? '🔴 异常' : '🟢 正常'} ` +
          `(连续失败 ${state.consecutiveFailures} 次)`
      );
    }
    process.exit(0);
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

main();