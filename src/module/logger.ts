const winston = require('winston');
const fp = require('fastify-plugin')


function plugin(fastify, opts, next) {

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        winston.format.prettyPrint()
      ),
    transports: [
        new winston.transports.File({timestamp:true,level:'error',filename:'./logs/logError.log'}),
        new winston.transports.File({timestamp:true,level:'warn',filename:'./logs/logWarn.log'}),
        new winston.transports.Console({timestamp:true})
    ]
});
fastify.decorate('logger', logger);
next()
}
module.exports = fp(plugin, {
    fastify: '3.x',
    name: 'logger',
})