import Fastify from 'fastify'
import fastifyFormbody from '@fastify/formbody'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'


// Load env vars
import loadConfig from './config/config'
loadConfig()
import registerRoutes from './route'
import pluginsRegister from './module'
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
    await pluginsRegister(server)
    
    // API routers
    registerRoutes(server)

    const { API_HOST = "localhost", API_PORT = 8080 } = process.env

    server.listen({host:API_HOST,port: Number(API_PORT)}, (err, address): void => {
      if (err) { 
        server.logger.error(err)
      }
      server.logger.info(`Server listening at ${address}`)
    })
  } catch (err) {
    console.log(err)
  }
}

startServer()



