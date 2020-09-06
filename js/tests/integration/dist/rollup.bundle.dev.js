"use strict";

/* eslint-env node */
var commonjs = require('@rollup/plugin-commonjs');

var _require = require('@rollup/plugin-babel'),
    babel = _require.babel;

var _require2 = require('@rollup/plugin-node-resolve'),
    nodeResolve = _require2.nodeResolve;

module.exports = {
  input: 'js/tests/integration/bundle.js',
  output: {
    file: 'js/coverage/bundle.js',
    format: 'iife'
  },
  plugins: [nodeResolve(), commonjs(), babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled'
  })]
};