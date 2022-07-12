import contextRoute from '/media/DDrive/Lab/fastify-ts/src/route/context'
import testRoute from '/media/DDrive/Lab/fastify-ts/src/route/test'
export default function registerRoutes (server){
 server.register(contextRoute,{ prefix: '/context' })
 server.register(testRoute,{ prefix: '/test' })
}