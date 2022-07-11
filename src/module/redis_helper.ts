const fp = require('fastify-plugin')

import { createRedisClient } from 'node-async-redis';
const config = process.env

function plugin(fastify, opts, next) {



    let redisClient;
    const node_prefix = config.REDIS_PREFIX ? config.REDIS_PREFIX + "_" : ""

    if (process.env.REDIS_PASSWORD === '')  
        redisClient = createRedisClient({ host: config.REDIS_HOST, port: config.REDIS_PORT });
    else
        redisClient = createRedisClient({ host: config.REDIS_HOST, password: config.REDIS_PASSWORD, port: config.REDIS_PORT });

    redisClient.on("error", (err) => {
        fastify.logger.error('Error on conecting to redis', err);
    });
    redisClient.on("connect", () => {
        fastify.logger.info('Connected to redis')
    });

    redisClient.get = async function (key) {
        const result = await redisClient.getAsync(node_prefix + key);
        return JSON.parse(result);
    }

    redisClient.set = async function (key, value) {
        const result = await redisClient.setAsync(node_prefix + key, value);
        return (result);
    }
    redisClient.hset = async function (key, f, value) {
        const result = await redisClient.hsetAsync(node_prefix + key, f, value);
        return { result }

    }
    redisClient.expire = async function (key, ttl) {
        const result = await redisClient.expireAsync(node_prefix + key, ttl);
        return { result }

    }
    redisClient.hget = async function (key, f) {
        const result = await redisClient.hgetAsync(node_prefix + key, f)
        return JSON.parse(result);

    }
    redisClient.read = async function (key) {
        const result = await redisClient.getAsync(node_prefix + key);
        return JSON.parse(result);
    }
    redisClient.hgetAll = async function (key) {
        const result = await redisClient.hgetallAsync(node_prefix + key);
        return JSON.parse(result);
    }
    redisClient.delete = async function (key) {
        return await redisClient.delAsync(node_prefix + key);
    }
    fastify.decorate('redis', redisClient);
    next()
}

module.exports = fp(plugin, {
    fastify: '4.x',
    name: 'redis-async-helper',
    decorators: {
        fastify: ['logger'],
    },
    dependencies: ['logger',]
},

)