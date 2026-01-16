// var createError = require('http-errors');
// var cookieParser = require('cookie-parser');
import express from 'express';
import path from 'node:path';
import os from 'node:os'
import logger from 'morgan';
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import plansRouter from './routes/plan.js';
import cacheManager from './utility/cacheManager.js';
import responseMiddleware from './middlewares/resposeMiddleware.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const cm = new cacheManager()
// console.log(cm)

// console.log(os)
const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.set('port', normalizePort(process.env.PORT));
app.set('env', process.env.NODE_ENV);
app.set('trust proxy', true);
app.use(responseMiddleware.responseHandler);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/api', indexRouter);
app.use('/users', usersRouter);
app.use('/plans', plansRouter);

app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.status(404).send('404--error')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send(err.message + err.stack);
});

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

export default app
