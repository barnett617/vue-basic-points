const isProd = process.env.NODE_ENV === 'production'
const { account } = require('./account.common.js')

const githubPages = account.deployUrl
// const githubPages = 'https://www.techdemo.top/'
// const githubPages = 'https://barnett617.github.io/vue-basic-points/'
// const projectRoot = '/vue-basic-points/'

module.exports = {
  publicPath: isProd ? githubPages : '/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Wilson\'s Site'
        return args
      })
  },
  configureWebpack: {
    externals: {
      BMap: 'BMap',
      BMapGL: 'BMapGL'
    }
  }
}