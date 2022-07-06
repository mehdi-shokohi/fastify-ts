import { FastifyInstance } from 'fastify'

async function testRouter(fastify: FastifyInstance) {
  // fastify.decorate('db', new DbConnection())

  fastify.route({
    method: 'GET',
    url: '/ping',
    handler: async () => {
      
      const plans  = await fastify['redis'].hget('plans','Gold')
      return ({ ok: 'pong' ,path:(plans)})
    }



  })
}
export default testRouter