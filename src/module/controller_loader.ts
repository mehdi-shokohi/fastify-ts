import fs from 'fs';
const walkSync = function (dir,router) {
  const files = fs.readdirSync(dir);
  files.forEach(function (file) {
    if (file.match(/\.ts$/) !== null ) {
      const name = file.replace('.ts', '');
      const address = dir.replace(dir + '/\/', '.') + '/' + name;
      // console.log(address);
      router.register(require(address), { prefix: `/${name}`})

    }
  })
  return 0;
}

module.exports = walkSync;