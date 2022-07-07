
async function testRouter(fastify) {
  // fastify.decorate('db', new DbConnection())

  fastify.route({
    method: 'GET',
    url: '/ping',
    handler: async () => {
      const plans  = await fastify.redis.hget('plans','Gold')
      return ({ ok: 'pong' ,path:plans})
    }



  })
}
export default testRouter