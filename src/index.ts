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

    // API routers
    controllerLoader(__dirname + '/route', server)

    server.listen(process.env.API_PORT, process.env.API_HOST, (err, address): void => {
      if (err) { console.log(err) }
      console.log(`Server listening at ${address}`)
    })
  } catch (err) {
    console.log(err)
  }
}

startServer()



