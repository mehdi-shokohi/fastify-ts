import { FastifyInstance } from 'fastify'

async function testRouter(fastify: FastifyInstance) {
  // fastify.decorate('db', new DbConnection())
  fastify.route({
    method: 'GET',
    url: '/ping',
    handler: async () => {

      return ({ ok: 'pong' ,path:"/"})
    }



  })
}
export default testRouter