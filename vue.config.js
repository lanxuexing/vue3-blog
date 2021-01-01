module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
  outputDir: 'docs',
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    // 以上的ip和端口是我们本机的;下面为需要跨域的，配置文档API：https://cli.vuejs.org/zh/config/#devserver-proxy
    proxy: { // 配置跨域
      '/api': {
        target: 'http://api.vikingship.xyz/api/', // 这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '' // 请求的时候使用这个api就可以
        }
      }
    }
  }
}
