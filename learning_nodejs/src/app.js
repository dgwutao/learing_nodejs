// var createError = require('http-errors');
// var cookieParser = require('cookie-parser');
import express from 'express';
import path from 'node:path';
import fs from 'fs';
import monitorRoute from './routes/monitor.route.js'
import indexRoute from './routes/index.route.js'
import { fileURLToPath } from 'node:url';
import helmet from 'helmet'
import client from 'prom-client';
import cors from 'cors';
import pinoHttp from 'pino-http'
import { randomUUID } from 'node:crypto'
import { logger,logPersist } from './utils/logger.util.js'

const __dirname = import.meta.dirname;

const app = express();
app.set('port', process.env.PORT || '3000');
app.set('env', process.env.NODE_ENV);
app.set('trust proxy', true);
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(pinoHttp({
    logger,
    autoLogging: false,
    genReqId (req, res) {
      const id = req.headers['x-request-id'] || randomUUID()
      res.setHeader('x-request-id', id)
      return id
    },
    customLogLevel (req, res, err) {
      if (res.statusCode >= 500 || err) return 'error'
      if (res.statusCode >= 400) return 'warn'
      return 'info'
    }
}))
app.use(logPersist)
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(monitor({
//   path: '/monitor',
//   chartVisibility: {
//     cpu: true,
//     mem: true,
//     load: true,
//     eventLoop: true,
//     heap: true,
//     responseTime: true,
//     rps: true,
//     statusCodes: true
//   }
// }));


app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
    },
  })
);

const allowedOrigins = [];
app.use(cors({
  origin:'*',
  // origin: function (origin, callback) {
  //   if (!origin) return callback(null, true); // 允许无 Origin 的请求（如 Postman、curl）
  //   if (allowedOrigins.includes(origin)) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error(`Origin ${origin} not allowed by CORS`), false);
  //   }
  // },
  methods: ['GET', 'POST'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Request-ID',
    'X-CSRF-Token',
    'X-Requested-With',
    'X-Api-Key'
  ],
  exposedHeaders: ['X-Request-ID'],
  // credentials: true, // only for Cookie
  maxAge: 86400, // keep options request info in cache for 1 day
  optionsSuccessStatus: 204
}));

const manifestPath = '../manifest.json';
let manifest = {}
if (fs.existsSync(manifestPath)) {
  try {    
    const raw = fs.readFileSync(manifestPath, 'utf-8');
    const parsed = JSON.parse(raw);
    if (parsed) {
      manifest = parsed
      app.locals.buildVersion = manifest.version;
    }
  } catch (error) { }
}

app.locals.asset = (entry) => {
  return manifest.entryPoints[entry] || entry;  
};


//if use session + cookie 
// app.use(session({
//   secret: process.env.SESSION_SECRET, // 从环境变量读取
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     httpOnly: true, // 防止 XSS 读取
//     secure: true,   // 仅通过 HTTPS 发送
//     sameSite: 'lax', // 缓解 CSRF
//     maxAge: 3600000 // 1 小时
//   }
// }));
// app.use(morgan('dev'));
// app.use(cookieParser());

// app.get('/metrics', async (req, res) => {
//   res.set('Content-Type', client.register.contentType);
//   res.end(await client.register.metrics());
// });

app.use('/api/', indexRoute);
app.use('/api/monitor',monitorRoute);

if (process.env.NODE_ENV !== 'production') {
  const options = {
    maxAge: '7d',          
    etag: true,            
    dotfiles: 'ignore',    
    fallthrough: false,
    index:false,
    immutable:true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        // HTML 不缓存，确保页面结构更新即时可见
        res.setHeader('Cache-Control', 'public, max-age=0');
      }
    },
  }
  const staticPath = path.join(__dirname, 'static');
  const distStaticPath = path.join(import.meta.dirname, '..', 'dist', 'static')
  app.use('/static',express.static(staticPath, options));

  // const swaggerUi = await import('swagger-ui-express');
  // const { swaggerSpec } = await import('../swagger.config.js');
  // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

// 404 not found
app.use(function(req, res, next) {
    req.log.warn({ url: req.url }, 'route not found')
    res.status(404).json({ error: 'Not Found', path: req.url })
});

// error handler
app.use(function(err, req, res, next) {
  req.log.error({ err }, 'unhandled error')
  const status = err.status || err.statusCode || 500
  res.status(status).json({
      error: status >= 500 ? 'Internal Server Error' : err.message,
      reqId: req.id
  })
});

export default app
