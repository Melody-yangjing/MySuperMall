const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: (config)=>{
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets',resolve('src/assets'))
      .set('components',resolve('src/components'))
      .set('serve',resolve('src/serve'))
      .set('store',resolve('src/store'))
      .set('view',resolve('src/view'))
  }
}