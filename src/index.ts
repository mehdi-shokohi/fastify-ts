import Fastify from 'fastify'
const controller_loader = require(__dirname+"/module/controller_loader")

// Load env vars
import loadConfig from './config/config'
loadConfig()
global.__basedir = __dirname+"/..";


 const startServer = async () => {

  try {
  const server = Fastify({
    logger: true
  })

  // custom middleware, routes, hooks
  // check user router for how to use middleware function into api request

  // third party packages
  server.register(require('fastify-formbody'))
  server.register(require('fastify-cors'))
  server.register(require('fastify-helmet'))

  controller_loader(__dirname+'/route',server)
  // API routers


  
  
    server.listen(process.env.API_PORT, (err, address): void => {
      if (err) { console.log(err)}
      console.log(`Server listening at ${address}`)
  
    })

  } catch (err) {
    console.log(err)
    
  }


 
}

  startServer()

 

