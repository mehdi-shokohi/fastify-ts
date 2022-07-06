import path from 'path'
import conf from 'dotenv'
export default function loadConfig(): void {
  const c = conf.config({
    path: path.join(
      __dirname,
      `../../${
        process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '.development'
      }.env`,
    ),
  })

  if (c.error) {
    const c = conf.config({
      path: path.join(
        __dirname,
        `../../.env`,
      ),
    })
    if (c.error) {
    throw new Error(c.error.message)
    }
  }

}
