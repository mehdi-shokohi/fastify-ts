import { FastifyInstance } from 'fastify'

async function testRouter(fastify: FastifyInstance) {
  // fastify.decorate('db', new DbConnection())


  fastify.route({
    method: 'GET',
    url: '/ping',
    handler: async (_request, _reply) => {

      return ({ ok: 'pong' })
    }



  })
}
export default testRouter