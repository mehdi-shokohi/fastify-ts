import Fastify from 'fastify'
import * as path from 'path'
// const controllerLoader = require(path.join(__dirname, "/module/controller_loader"))
import fastifyFormbody from '@fastify/formbody'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'


// Load env vars
import loadConfig from './config/config'
loadConfig()
const startServer = async () => {

  try {
    const server = Fastify({
      logger: false
    })

    // custom middleware, routes, hooks
    // check user router for how to use middleware function into api request

    // third party packages
    server.register(fastifyFormbody)
    server.register(fastifyCors)
    server.register(fastifyHelmet)

    //Load Plugins
    await  server.register(require('./module/logger'))
    await  server.register(require('./module/redis_helper'))
    // API routers
    // controllerLoader(path.join(__dirname,'/route'), server)
    const contextRoute = require('./route/context')
    const testRoute = require('./route/test')
    server.register(contextRoute,{ prefix: `/context` })
    server.register(testRoute,{ prefix: `/test` })

    const { API_HOST = "localhost", API_PORT = 8080 } = process.env

    server.listen({host:API_HOST,port: Number(API_PORT)}, (err, address): void => {
      if (err) { 
        server['logger'].error(err)
      }
      server['logger'].info(`Server listening at ${address}`)
    })
  } catch (err) {
    console.log(err)
  }
}

startServer()



