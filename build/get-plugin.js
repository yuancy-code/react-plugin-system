import config from './config';
import getPostcss from './get-postcss';

import progress from 'rollup-plugin-progress';
import replace from 'rollup-plugin-replace';
import alias from 'rollup-plugin-alias';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-buble';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const plugins = {
  progress (opt) {
    return progress({
      clearLine: opt.clear || false
    });
  },
  replace () {
    return replace({
      exclude: 'node_modules/**',
      NODE_ENV: JSON.stringify(config.dev ? 'development' : 'production')
    });
  },
  alias () {
    return alias(config.alias);
  },
  json () {
    return json({
      exclude: ['node_modules/**'],
      preferConst: true
    });
  },
  resolve () {
    return resolve();
  },
  commonjs () {
    return commonjs();
  },
  eslint () {
    if (!config.eslint) return;

    return eslint({
      include: ['src/**/*.js', 'es/**/*.js']
    });
  },
  babel () {
    return babel({
      include: ['src/**', 'es/**', 'node_modules/**/es/**']
    });
  },
  uglify (opt) {
    return uglify(opt);
  },
  filesize () {
    return filesize();
  },
  postcss (opt) {
    if (!config.extract && !opt.force) return;

    return postcss(getPostcss(opt));
  },
  serve () {
    return serve({
      contentBase: config.serve.base,
      port: config.serve.port,
      host: '127.0.0.1',
      historyApiFallback: true
    });
  },
  livereload () {
    if (!config.live) return;

    return livereload(
      config.serve.base
    );
  }
};

export default function getPlugin (name, opt = {}) {
  return plugins[name](opt);
}