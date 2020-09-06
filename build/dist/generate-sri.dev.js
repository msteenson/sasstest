#!/usr/bin/env node

/*!
 * Script to generate SRI hashes for use in our docs.
 * Remember to use the same vendor files as the CDN ones,
 * otherwise the hashes won't match!
 *
 * Copyright 2017-2020 The Bootstrap Authors
 * Copyright 2017-2020 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
'use strict';

var crypto = require('crypto');

var fs = require('fs');

var path = require('path');

var sh = require('shelljs');

var pkg = require('../package.json');

sh.config.fatal = true;
var configFile = path.join(__dirname, '../_config.yml'); // Array of objects which holds the files to generate SRI hashes for.
// `file` is the path from the root folder
// `configPropertyName` is the _config.yml variable's name of the file

var files = [{
  file: 'dist/css/bootstrap.min.css',
  configPropertyName: 'css_hash'
}, {
  file: 'dist/js/bootstrap.min.js',
  configPropertyName: 'js_hash'
}, {
  file: 'dist/js/bootstrap.bundle.min.js',
  configPropertyName: 'js_bundle_hash'
}, {
  file: "site/docs/".concat(pkg.version_short, "/assets/js/vendor/jquery.slim.min.js"),
  configPropertyName: 'jquery_hash'
}, {
  file: 'node_modules/popper.js/dist/umd/popper.min.js',
  configPropertyName: 'popper_hash'
}];
files.forEach(function (file) {
  fs.readFile(file.file, 'utf8', function (err, data) {
    if (err) {
      throw err;
    }

    var algo = 'sha384';
    var hash = crypto.createHash(algo).update(data, 'utf8').digest('base64');
    var integrity = "".concat(algo, "-").concat(hash);
    console.log("".concat(file.configPropertyName, ": ").concat(integrity));
    sh.sed('-i', new RegExp("(\\s".concat(file.configPropertyName, ":\\s+\"|')(\\S+)(\"|')")), "$1".concat(integrity, "$3"), configFile);
  });
});