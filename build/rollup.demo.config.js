import config from './config';
import getPlugin from './get-plugin';

export default {
  input: 'src/demo/main.js',
  output: {
    file: 'public/static/bundle.js',
    format: 'iife',
    sourcemap: config.dev
  },
  plugins: [
    getPlugin('progress', {
      clear: false
    }),
    getPlugin('replace'),
    getPlugin('eslint'),
    getPlugin('alias'),
    getPlugin('postcss', {
      extract: 'public/static/style.css',
      minify: !config.dev,
      force: true
    }),
    getPlugin('json'),
    getPlugin('resolve'),
    getPlugin('commonjs'),
    getPlugin('babel'),
    config.dev && getPlugin('serve'),
    config.dev && getPlugin('livereload'),
    !config.dev && getPlugin('uglify'),
    !config.dev && getPlugin('filesize')
  ].filter(p => p)
};
