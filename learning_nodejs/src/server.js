#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './app.js';
import http from 'node:http';
import { pool } from './repos/dbConnector.js'
import { logger } from './utils/logger.util.js'
import { connectRedis, disconnectRedis } from './repos/redisConnector.js';

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || '3000';

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
try {
  // await connectRedis();
}catch (error){
  logger.error(error, `Failed to start redis service:`)
  // process.exit(1)
}
    
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(error, `${bind} requires elevated privileges`)
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(error, `${bind} is already in use`)
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  logger.info(`Server is listening on : ${bind}`);

  if (process.send) process.send('ready');
}

let isShuttingdown = false
async function gracefulShutdown(signal) {
  if (isShuttingdown) return;
  isShuttingdown = true;
  
  logger.info({ signal }, 'shutting down...')
  
  server.close(async (err) => {
    try {
      await pool.end();
      await disconnectRedis();
    } catch (error) {
      logger.error(error, 'error during shutdown repositories')
    }
    if (err) {
      logger.error(err, 'error during shutdown')
      process.exit(1)
    }
    logger.info('server closed')
    process.exit(0)
  })

  //shutdown timeout
  setTimeout(() => {
    logger.fatal('forced shutdown after timeout')
    process.exit(1)
  }, 10000).unref()
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (err) => {
  logger.fatal(err, 'uncaught exception') 
  gracefulShutdown();
});

process.on('unhandledRejection', (reason) => {
  logger.fatal({ err: reason }, 'unhandled rejection') 
  gracefulShutdown();
});
