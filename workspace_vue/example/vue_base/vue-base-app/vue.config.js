let fs = require('fs');
//const px2rem = require('postcss-px2rem');
const path = require('path');
const isProduction = process.env.NODE_ENV !== 'production';
// const postcss = px2rem({
//     remUnit: 75   //基准大小 baseSize，需要和rem.js中相同
// })
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: true,
    chainWebpack: config => {
        config
            .plugin('webpack-bundle-analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    },
    configureWebpack: (config) => {
       if (isProduction) {
         config.devtool = 'cheap-module-eval-source-map'
       } else {
         //pro
       }
       Object.assign(config, {
         resolve: {
           alias: {
             '@': path.resolve(__dirname, './src')
           }
         }
       })
    },
    productionSourceMap: false,
    css: {
     extract: true,
     sourceMap: false,
     loaderOptions: {
        // postcss: {
        //     plugins: [
        //         postcss
        //     ]
        // }
     },
     modules: false,
    },
    parallel: require('os').cpus().length > 1,
    // 第三方插件配置
    pluginOptions: {},
    // webpack-dev-server 相关配置
    devServer: {
        port: 8082,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'https://devminiapi.yangguangzhenxuan.com',  // target host
                ws: true,  // proxy websockets
                changeOrigin: true,  // needed for virtual hosted sites
                changOrigin: true,
                pathRewrite: {
                    '^/api': ''  // rewrite path
                }
            },
        }
    }
}

