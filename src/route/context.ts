import { FastifyInstance } from 'fastify'
import * as contextController from '../controller/context/context'
import Context  from '../../schemas/context.json'
async function contextRouter(fastify: FastifyInstance) {

  // fastify.decorate('db', new DbConnection())


  fastify.route({
    method: 'POST',
    url: '/register',
    handler: contextController.register,
    schema: {
       body:   Context
    } 
  }),
  fastify.route({
    method: 'GET',
    url: '/getdata',
    preHandler:[preHandler,preHandler2],
    handler: contextController.getContextData


  })

}
function preHandler(req,res,next) {
  console.log('req.url', req.url)
  console.log('onPreHandler')
  next()
}

function preHandler2(req,res,next) {
  console.log('onPreHandler2')
  next()
}
export default contextRouter