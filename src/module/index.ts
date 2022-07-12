export default async function registerAll(server){
    await server.register(require('./logger'))
    await server.register(require('@fastify/redis'),{
        host: '127.0.0.1', 
        password: '',
        port: 6040, // Redis port
        family: 4   // 4 (IPv4) or 6 (IPv6)
    })
}