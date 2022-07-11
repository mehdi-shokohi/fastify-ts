 declare module 'fastify' {
    interface FastifyInstance {
        redis :any
        logger:any
    }
  }
export  interface  IMyPlugin{
    redis :any
    logger:any
}