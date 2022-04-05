import path from 'path'





export default function loadConfig(): void {
  const result = require('dotenv').config({
    path: path.join(
      __dirname,
      `../../${
        process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : '.development'
      }.env`,
    ),
  })

  if (result.error) {
    const result = require('dotenv').config({
      path: path.join(
        __dirname,
        `../../.env`,
      ),
    })
    if (result.error) {
    throw new Error(result.error)
    }
  }

}
