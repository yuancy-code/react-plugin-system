import getPlugin from './get-plugin';
import { name } from '../package.json';

const entry = 'es/index.js';
const moduleName = name.replace(/-(\w)/g, ($, $1) => $1.toUpperCase());

export default [{
  input: entry,
  name: moduleName,
  output: {
    file: 'lib/index.js',
    format: 'umd',
    exports: 'named',
    sourcemap: false
  },
  plugins: [
    getPlugin('progress', {
      clear: true
    }),
    getPlugin('replace'),
    getPlugin('eslint'),
    getPlugin('alias'),
    getPlugin('postcss', {
      extract: 'lib/style.css',
      minify: false
    }),
    getPlugin('json'),
    getPlugin('resolve'),
    getPlugin('commonjs'),
    getPlugin('babel'),
    getPlugin('filesize')
  ].filter(p => p)
}, {
  input: entry,
  name: moduleName,
  output: {
    file: 'lib/index.min.js',
    format: 'umd',
    exports: 'named',
    sourcemap: false
  },
  plugins: [
    getPlugin('progress', {
      clear: true
    }),
    getPlugin('replace'),
    getPlugin('eslint'),
    getPlugin('alias'),
    getPlugin('postcss', {
      extract: 'lib/style.min.css',
      minify: true
    }),
    getPlugin('json'),
    getPlugin('resolve'),
    getPlugin('commonjs'),
    getPlugin('babel'),
    getPlugin('uglify'),
    getPlugin('filesize')
  ].filter(p => p)
}];