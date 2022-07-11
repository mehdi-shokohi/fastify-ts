
import { FastifyReply ,FastifyRequest } from 'fastify'
import { IContextRequest } from './interfaces'



export const register = async (request: IContextRequest, reply: FastifyReply) => {

   return {data:request.body}




}

export const getContextData = async (request: FastifyRequest, reply: FastifyReply)=>{
return {data:"context code is : 333312"}

}