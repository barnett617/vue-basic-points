const isProd = process.env.NODE_ENV === 'production'

const githubPages = 'https://www.techdemo.top/'
// const githubPages = 'https://barnett617.github.io/vue-basic-points/'
// const projectRoot = '/vue-basic-points/'

module.exports = {
  publicPath: isProd ? githubPages : '/'
}