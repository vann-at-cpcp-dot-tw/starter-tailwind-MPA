const path = require('path');
const mix = require('laravel-mix').setPublicPath('dist');
const fs  = require('fs')

const getWebpackConfig = function(){
  let  commonConfig = {
    plugins: [
    ],
    optimization: {
      providedExports: false,
      sideEffects: false,
      usedExports: false
    },
    output: {
        chunkFilename: 'dist/chunks/[name].js',
    },
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
    case ('sample.js'):
    return
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
mix.vue({version: 2})
mix.options({
  clearConsole: process.env.NODE_ENV==='production' ?true :false,
  processCssUrls: false,
  postCss: [
    require("tailwindcss"),
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
.extract() //extract all
// .extract([
//   '@babel/polyfill',
//   'jquery',
//   'vue',
//   'vuex',
//   'react',
//   'react-dom',
// ], 'dist/vendor.js')
.autoload({
  jquery: ['$', 'window.jQuery', 'jQuery'],
  // vue: ['Vue', 'window.Vue'],
  react: ['React'],
  'react-dom': ['ReactDOM'],
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
    "@babel/plugin-syntax-dynamic-import"
  ]
})

// mix.browserSync({
//   proxy: 'localhost:8000',
//   port: '8001'
// })


// if( mix.inProduction() ) {
//     mix.version();
// }else{
//     mix.sourceMaps();
// }