import path from 'path';
import config from './config';

export default function getPostcss ({
  extract,
  minify
}) {
  const cssExportMap = {};

  return {
    sourceMap: config.dev,
    extensions: ['.css', '.mcss'],
    extract,
    getExport (id) {
      return cssExportMap[id] || {};
    },
    plugins: [
      require('postcss-import')({
        path: [
          path.resolve('node_modules')
        ]
      }),
      require('postcss-mixins')(),
      require('postcss-advanced-variables')(),
      require('postcss-color-function')(),
      require('postcss-nested')(),
      require('postcss-extend')(),
      require('postcss-calc')({
        mediaQueries: true,
        selectors: false
      }),
      config.px2rem.use && require('postcss-px2rem')({
        remUnit: config.px2rem.unit || 16,
        remPrecision: 5,
        keepComment: 'no2rem'
      }),
      require('autoprefixer')({
        browsers: [
          'ie >= 9',
          'ie_mob >= 10',
          'ff >= 30',
          'chrome >= 34',
          'safari >= 7',
          'opera >= 23',
          'ios >= 7',
          'android >= 4.4',
          'bb >= 10'
        ]
      }),
      require('postcss-modules')({
        generateScopedName: '[local]___[hash:base64:8]',
        globalModulePaths: config.cssModules.global,
        getJSON (id, exportTokens) {
          cssExportMap[id] = exportTokens;
        }
      }),
      (!config.dev && minify) && require('postcss-csso')()
    ].filter(p => p)
  };
}
