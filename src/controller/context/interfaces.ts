
import { FastifyRequest,FastifyReply } from 'fastify'
import {Context}   from '../../types/context'
import { FromSchema } from "json-schema-to-ts";


export interface IContextRequest extends FastifyRequest {
    body:  Context
}


