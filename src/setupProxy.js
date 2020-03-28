const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(proxy('/federal-api', {
    target: 'http://192.168.1.156:8800',
    target: 'http://192.168.1.175:80',
    target: 'http://192.168.1.71:80',
    //  target: 'http://180.109.219.56:20002/',
    //  target: 'http://ev-api.samego.com',
    changeOrigin: true,
    "secure": false,
    pathRewrite: {
      // '^/federal-api': '/federal-api',
      '^/federal-api': '',
    }
  }));
  app.use(proxy('//ws-webs', {
    target: 'ws://192.168.1.197',
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      '^/ws-webs': '',
    }
  }));
};