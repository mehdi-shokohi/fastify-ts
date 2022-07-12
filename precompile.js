const fs = require('fs');
const path = require('path');
const myArgs = process.argv.slice(2);

const walkSync = function (dir) {
  const files = fs.readdirSync(dir);
  let l = []
  files.forEach(function (file) {
    if (file.match(/\.ts|\.js$/) !== null && file != 'index.ts') {
      const fullname = path.basename(file)
      const ext = path.extname(file);
      const name = path.basename(fullname, ext)
      // console.log('name', name)
      const address = dir.replace(dir + '/\/', '.') + '/' + name;
      // console.log(address);
      l.push({ filename: name, address: address })
      //   router.register(require(address), { prefix: `/${name}` })

    }

  })
  return l

}


let l = walkSync(myArgs[0])

let content = ''
l.map(v => {
  content += `import ${v.filename}Route from '${v.address}'\n`
})
content += 'export default function registerRoutes (server){\n'
l.map(v => {
  content += ` server.register(${v.filename}Route,{ prefix: '/${v.filename}' })\n`
})
content += '}'
fs.writeFile('src/route/index.ts', content, (err) => {
  if (err) {
    console.log('err', err)

  }
})




