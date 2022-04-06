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
    handler: contextController.getContextData


  })
}
export default contextRouter