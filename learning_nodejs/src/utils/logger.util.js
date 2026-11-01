import pino from 'pino'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const isProd = process.env.NODE_ENV === 'production'
const logLevel = process.env.LOG_LEVEL || (isProd ? 'info' : 'debug')

const logDir = resolve(process.cwd(), 'logs')
mkdirSync(logDir, { recursive: true })

const redactPaths = [
  'req.headers.authorization',
  'req.headers.cookie',
  'req.headers["x-api-key"]',
  'password',
  'token',
  'creditCard',
  '*.password',
  '*.token'
]

const devLogger = pino({
  level: logLevel,
  redact: { paths: redactPaths, censor: '[REDACTED]' },
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
      ignore: 'pid,hostname',
      singleLine: false
    }
  }
})


const prodLogger = pino({
  level: logLevel,
  redact: { paths: redactPaths, censor: '[REDACTED]' },
  timestamp: pino.stdTimeFunctions.isoTime,
  transport: {
    targets: [
      // 1. 输出到 stdout（容器/云环境收集）
      {
        target: 'pino/file',
        options: { destination: 1 }, // 1 = stdout
        level: logLevel
      },
      {
        target: 'pino-roll',
        options: {
            file: resolve(logDir, 'app'),
            frequency: 'daily',
            dateFormat: 'yyyy-MM-dd',
            extension: '.log',
            size: '10m',          
            limit: { count: 30 },
            mkdir: true
        },
        level: 'info'
      }
    ]
  }
})

export const logPersist = (req, res, next) => {
    const start = Date.now()

    res.on('finish', () => {
      const status = res.statusCode
      const shouldLog = status >= 400
      if (!shouldLog) return
      const level = status >= 500 ? 'error' : 'warn'
      const payload = {
        reqId: req.id,
        method: req.method,
        url: req.url,
        statusCode: status,
        responseTime: Date.now() - start,
        remoteAddress: req.socket?.remoteAddress,
        userAgent: req.headers['user-agent']
      }

      if (status >= 500 && res.locals.err) {
        payload.err = res.locals.err
      }

      req.log[level](payload, `${req.method} ${req.url} ${status}`)
    })

    next()
}

export const logger = isProd ? prodLogger : devLogger
export const isProduction = isProd