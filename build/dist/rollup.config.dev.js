'use strict';

var path = require('path');

var _require = require('@rollup/plugin-babel'),
    babel = _require.babel;

var _require2 = require('@rollup/plugin-node-resolve'),
    nodeResolve = _require2.nodeResolve;

var banner = require('./banner.js');

var BUNDLE = process.env.BUNDLE === 'true';
var fileDest = 'bootstrap.js';
var external = ['jquery', 'popper.js'];
var plugins = [babel({
  // Only transpile our source code
  exclude: 'node_modules/**',
  // Include the helpers in the bundle, at most one copy of each
  babelHelpers: 'bundled'
})];
var globals = {
  jquery: 'jQuery',
  // Ensure we use jQuery which is always available even in noConflict mode
  'popper.js': 'Popper'
};

if (BUNDLE) {
  fileDest = 'bootstrap.bundle.js'; // Remove last entry in external array to bundle Popper

  external.pop();
  delete globals['popper.js'];
  plugins.push(nodeResolve());
}

module.exports = {
  input: path.resolve(__dirname, '../js/src/index.js'),
  output: {
    banner: banner,
    file: path.resolve(__dirname, "../dist/js/".concat(fileDest)),
    format: 'umd',
    globals: globals,
    name: 'bootstrap'
  },
  external: external,
  plugins: plugins
};