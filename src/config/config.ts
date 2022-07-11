import path from 'path'
import conf from 'dotenv'
export default function loadConfig(): void {

  let {
    NODE_ENV = ""
  } = process.env

  if(NODE_ENV.trim().length) NODE_ENV = "." + NODE_ENV

  const c = conf.config({
    path: `.env${NODE_ENV}`,
  })
  if (c.error) {
    throw c.error
  }
}
