import fs from 'fs';
import path from 'path'
const walkSync = function (dir, router) {
  const files = fs.readdirSync(dir);
  files.forEach(function (file) {
    if (file.match(/\.ts|\.js$/) !== null) {
      const fullname = path.basename(file)
      const ext = path.extname(file);
      const name = path.basename(fullname,ext)
      // console.log('name', name)
      const address = dir.replace(dir + '/\/', '.') + '/' + name;
      // console.log(address);
      router.register(require(address), { prefix: `/${name}` })

    }
  })
  return 0;
}

module.exports = walkSync;