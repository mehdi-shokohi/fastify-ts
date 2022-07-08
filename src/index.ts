import Fastify from 'fastify'

const controllerLoader = require(__dirname + "/module/controller_loader")

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
    server.register(require('fastify-formbody'))
    server.register(require('fastify-cors'))
    server.register(require('fastify-helmet'))

    //Load Plugins
    await  server.register(require('./module/logger'))
    await  server.register(require('./module/redis_helper'))
    // API routers
    controllerLoader(__dirname + '/route', server)

    server.listen(process.env.API_PORT, process.env.API_HOST, (err, address): void => {
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



