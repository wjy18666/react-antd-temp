const path = require('path');
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addDecoratorsLegacy
} = require('customize-cra');

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const myPlugin = [
//   new UglifyJsPlugin(
//     {
//       uglifyOptions: {
//         warnings: false,
//         compress: {
//           drop_debugger: true,
//           drop_console: true
//         }
//       }
//     }
//   )
// ]

module.exports = override(
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

  //  修改配置
  // (config) => { //暴露webpack的配置 config ,evn
  //   // 去掉打包生产map 文件
  //   // config.devtool = config.mode === 'development' ? 'cheap-module-source-map' : false;
  //   if(process.env.NODE_ENV === 'production') config.devtool = false;
  //   if(process.env.NODE_ENV !== 'development') config.plugins = [...config.plugins,...myPlugin]
  //   //  1.修改、添加loader 配置 :
  //   // 所有的loaders规则是在config.module.rules(数组)的第二项
  //   // 即：config.module.rules[2].oneof  (如果不是，具体可以打印 一下是第几项目)
  //   // 修改 sass 配置 ，规则 loader 在第五项(具体看配置)
  //   const loaders = config.module.rules.find(rule => {
  //     //  console.log(rule)
  //     return Array.isArray(rule.oneOf)
  //   }).oneOf;

  //   console.log('loaders', loaders[7])

  //   loaders[loaders.length-1].use.push({
  //     //  loader: 'style-resources-loader',
  //     loader: require.resolve('style-resources-loader'), //  require.resolve('style-resources-loader'),
  //     options: {
  //       patterns: [path.resolve(__dirname, '../src/style/common.less')]
  //     }
  //   })

  //   return config
  // }
)