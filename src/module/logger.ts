const winston = require('winston');
const fp = require('fastify-plugin')
import { FastifyPluginCallback } from 'fastify';


export interface LoggerPlugin {
  error: (a:string | object) => void,
  info: (a: string | object) => void,
  warn: (a: string | object) => void
}

declare module 'fastify' {
  interface FastifyInstance {
    logger: LoggerPlugin;
  }
}

const plugin: FastifyPluginCallback = function (fastify, opts, next) {

  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.prettyPrint()
    ),
    transports: [
      new winston.transports.File({ timestamp: true, level: 'error', filename: './logs/logError.log' }),
      new winston.transports.File({ timestamp: true, level: 'warn', filename: './logs/logWarn.log' }),
      new winston.transports.Console({ timestamp: true })
    ]
  });
  fastify.decorate('logger', logger);
  next()
}

module.exports = fp(plugin, {
  fastify: '4.x',
  name: 'logger',
})