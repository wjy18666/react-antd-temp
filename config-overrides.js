/*
 * @Descripttion: 
 * @version: 
 * @Author: Jianyong Wang
 * @Date: 2020-01-20 09:35:21
 * @LastEditors: Jianyong Wang
 * @LastEditTime: 2020-04-23 11:47:36
 */
const path = require('path');
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addDecoratorsLegacy,
  addWebpackPlugin,
  overrideDevServer
} = require('customize-cra');

// 关闭 sourcemap
process.env.GENERATE_SOURCEMAP = "false";

// 补充：对开发友好，打包完成桌面提醒
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

//  添加mock配置
const apiMocker = require('mocker-api');
const mockerFile = path.resolve(__dirname, './src/mock/index.js')
const addMock = () => (configFunction) => {
  let beforeFunc = configFunction.before
  configFunction.before = function(app, server) {
    beforeFunc.call(this, app, server)
    apiMocker(app, mockerFile)
  }

  return configFunction;
}

//  是否需要Mock
const isNeedMock = false

//  代理配置
const addProxy = () => (configFunction) => {
  configFunction.proxy = {
    '/federal-api': {
        target: 'http://192.168.1.156:8800',
        target: 'http://192.168.1.175:80',
        target: 'http://192.168.1.71:80',
        changeOrigin: true,
        pathRewrite: { '^/federal-api': '' },
    },
    '/cultural-center': {
      target: 'http://192.168.1.117:99',
      changeOrigin: true,
      pathRewrite: { '^/cultural-center': '' },
    },
  };

  return configFunction;
}


const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const myPlugin = [
  new UglifyJsPlugin(
    {
      uglifyOptions: {
        warnings: false,
        compress: {
          drop_debugger: true,
          drop_console: true
        }
      }
    }
  )
]

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }),
    addDecoratorsLegacy(),
    addLessLoader({
      javascriptEnabled: true,
      // modifyVars: { '@primary-color': '#1DA57A' },
    }),
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src')
    }),
  
    // 打包编译完成提醒
    addWebpackPlugin(new WebpackBuildNotifierPlugin({
      title: "react-temp Webpack Build",
      //  logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true
    })),
    (config) => { 
      //暴露webpack的配置 config ,evn
      // 去掉打包生产map 文件
      // config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
      if(process.env.NODE_ENV === 'production') config.devtool = false;
      if(process.env.NODE_ENV !== 'development') config.plugins = [...config.plugins,...myPlugin]
      //  1.修改、添加loader 配置 :
      // 所有的loaders规则是在config.module.rules(数组)的第二项
      // 即：config.module.rules[2].oneof  (如果不是，具体可以打印 一下是第几项目)
      // 修改 sass 配置 ，规则 loader 在第五项(具体看配置)
      //  console.log('addLess', config.module)
      const loaders = config.module.rules.find(rule => {
        //  console.log(rule)
        return Array.isArray(rule.oneOf)
      }).oneOf;

      // loaders.forEach(rule => {
      //   console.log('rule', rule)
      //   if ((rule.test + '').includes('less')) {
      //     rule.use.push({
      //       //  loader: 'style-resources-loader',
      //       loader: require.resolve('style-resources-loader'), //  require.resolve('style-resources-loader'),
      //       options: {
      //         patterns: [path.resolve(__dirname, '../src/style/common.less')]
      //       }
      //     })

      //     rule.sideEffects = true
      //   }
      // })

      loaders.forEach(rule => {
        if ((rule.test + '').includes('scss')) {
          //  console.log('rule', rule)
          rule.use && rule.use.push({
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(__dirname, './src/style/common.scss')  //  全局引入公共的scss 文件
            }
          })
        }
      })
    
      return config
    }
  ),
  devServer: overrideDevServer(
    // dev server plugin
    isNeedMock ? addMock() : addProxy()
  )
}