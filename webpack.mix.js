const mix = require('laravel-mix').setPublicPath('dist')
const fs  = require('fs')
const webpack = require('webpack')
const TargetsPlugin = require('targets-webpack-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const tailwindcss = require('tailwindcss')
require('laravel-mix-polyfill')

const getWebpackConfig = function(){
  let  commonConfig = {
    plugins: [
      new HardSourceWebpackPlugin(),
    ],
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      }
    }
  };

  switch(process.env.NODE_ENV){
    case 'development':
    break;

    case 'production':
      commonConfig.plugins = [
        ...commonConfig.plugins,
        new TargetsPlugin({ browsers: ['last 2 versions', 'chrome >= 41', 'IE 11'] })
      ];
    break;
  }

  return commonConfig;
};

const getFiles = function (dir) {
  // get all 'files' in this directory
  // filter directories
  return fs.readdirSync(dir).filter(file => {
      return fs.statSync(`${dir}/${file}`).isFile();
  });
};

getFiles('src/pages').forEach(function (path) {
  switch( path ){
    case ('.DS_Store'):
    return;
    default:
      mix.js('src/pages/'+path, 'dist/pages');
    break;
  }
})

getFiles('src/styles').forEach(function (path) {
  switch( path ){
    case ('.DS_Store'):
    return;
    default:
      if(path.charAt(0) !== '_'){  // Do not mix which files start with '_' (underscore)
        mix.sass('src/styles/'+path, 'dist/styles');
      }
    break;
  }
})

mix.js('src/main.js', 'dist') //webpack module 為倒敘法，所以 mix.js 同樣要採用倒敘法（會影響到 manifest 的 output 路徑）

mix.options({
  // extractVueStyles: 'dist/styles/vue.css',
  clearConsole: process.env.NODE_ENV==='production' ?true :false,
  processCssUrls: false,
  postCss: [
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer')({
      grid: true,
      overrideBrowserslist: [
        '>0.1%',
        'ie 11',
      ]
    }),
    require('postcss-custom-properties')({
      preserve: true
    })
  ]
})
// .extract() //extract all
.extract([
  '@babel/polyfill',
  'jquery',
  'vue',
  'vuex',
  'react',
  'react-dom',
], 'dist/vendor.js')
.autoload({
  jquery: ['$', 'window.jQuery', 'jQuery'],
  // vue: ['Vue', 'window.Vue'],
  react: ['React'],
  'react-dom': ['ReactDOM'],
})
.polyfill({
  enabled: true,
  useBuiltIns: "usage",
  targets: {"ie": 11},
  debug: true,
  corejs: 3,
})
.webpackConfig(getWebpackConfig())
.babelConfig({
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env", {
        "useBuiltIns": "usage",
        "corejs": { "version": 3, "proposals": true }
      },
    ],
  ],
  plugins: [
    [
      "styled-jsx/babel",
      {
        "optimizeForSpeed": true,
        "plugins": [
          "@styled-jsx/plugin-sass"
        ]
      }
    ],
    //babel plugin vue 和 react 無法同時混用
    // "jsx-vue-functional",
    // "@vue/babel-plugin-transform-vue-jsx",
    // "@babel/plugin-syntax-dynamic-import"
  ]
})

mix.browserSync({
  proxy: 'localhost:8000',
  port: '8001'
})


// if( mix.inProduction() ) {
//     mix.version();
//     mix.then(() => {
//         const convertToFileHash = require("laravel-mix-make-file-hash");
//         convertToFileHash({
//             publicPath: "public",
//             manifestFilePath: "public/mix-manifest.json"
//         });
//     });
// }else{
//     mix.sourceMaps();
// }