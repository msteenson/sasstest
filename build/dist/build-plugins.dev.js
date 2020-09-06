#!/usr/bin/env node

/*!
 * Script to build our plugins to use them separately.
 * Copyright 2020 The Bootstrap Authors
 * Copyright 2020 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
'use strict';

var path = require('path');

var rollup = require('rollup');

var _require = require('@rollup/plugin-babel'),
    babel = _require.babel;

var banner = require('./banner.js');

var TEST = process.env.NODE_ENV === 'test';
var plugins = [babel({
  // Only transpile our source code
  exclude: 'node_modules/**',
  // Inline the required helpers in each file
  babelHelpers: 'inline'
})];
var bsPlugins = {
  Alert: path.resolve(__dirname, '../js/src/alert.js'),
  Button: path.resolve(__dirname, '../js/src/button.js'),
  Carousel: path.resolve(__dirname, '../js/src/carousel.js'),
  Collapse: path.resolve(__dirname, '../js/src/collapse.js'),
  Dropdown: path.resolve(__dirname, '../js/src/dropdown.js'),
  Modal: path.resolve(__dirname, '../js/src/modal.js'),
  Popover: path.resolve(__dirname, '../js/src/popover.js'),
  ScrollSpy: path.resolve(__dirname, '../js/src/scrollspy.js'),
  Tab: path.resolve(__dirname, '../js/src/tab.js'),
  Toast: path.resolve(__dirname, '../js/src/toast.js'),
  Tooltip: path.resolve(__dirname, '../js/src/tooltip.js'),
  Util: path.resolve(__dirname, '../js/src/util.js')
};
var rootPath = TEST ? '../js/coverage/dist/' : '../js/dist/';

var build = function build(plugin) {
  var external, globals, pluginFilename, bundle;
  return regeneratorRuntime.async(function build$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log("Building ".concat(plugin, " plugin..."));
          external = ['jquery', 'popper.js'];
          globals = {
            jquery: 'jQuery',
            // Ensure we use jQuery which is always available even in noConflict mode
            'popper.js': 'Popper'
          }; // Do not bundle Util in plugins

          if (plugin !== 'Util') {
            external.push(bsPlugins.Util);
            globals[bsPlugins.Util] = 'Util';
          } // Do not bundle Tooltip in Popover


          if (plugin === 'Popover') {
            external.push(bsPlugins.Tooltip);
            globals[bsPlugins.Tooltip] = 'Tooltip';
          }

          pluginFilename = "".concat(plugin.toLowerCase(), ".js");
          _context.next = 8;
          return regeneratorRuntime.awrap(rollup.rollup({
            input: bsPlugins[plugin],
            plugins: plugins,
            external: external
          }));

        case 8:
          bundle = _context.sent;
          _context.next = 11;
          return regeneratorRuntime.awrap(bundle.write({
            banner: banner(pluginFilename),
            format: 'umd',
            name: plugin,
            sourcemap: true,
            globals: globals,
            file: path.resolve(__dirname, "".concat(rootPath).concat(pluginFilename))
          }));

        case 11:
          console.log("Building ".concat(plugin, " plugin... Done!"));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
};

var main = function main() {
  return regeneratorRuntime.async(function main$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Promise.all(Object.keys(bsPlugins).map(function (plugin) {
            return build(plugin);
          })));

        case 3:
          _context2.next = 9;
          break;

        case 5:
          _context2.prev = 5;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0);
          process.exit(1);

        case 9:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 5]]);
};

main();