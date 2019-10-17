module.exports = {
  // 表示生成之后直接放到 server/admin
  outputDir: __dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'
    : '/'
}