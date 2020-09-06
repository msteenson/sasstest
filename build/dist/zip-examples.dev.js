#!/usr/bin/env node

/*!
 * Script to create the built examples zip archive;
 * requires the `zip` command to be present!
 * Copyright 2020 The Bootstrap Authors
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
'use strict';

var path = require('path');

var sh = require('shelljs');

var _require = require('../package.json'),
    version = _require.version,
    versionShort = _require.version_short;

var folderName = "bootstrap-".concat(version, "-examples");
sh.config.fatal = true;

if (!sh.test('-d', '_gh_pages')) {
  throw new Error('The "_gh_pages" folder does not exist, did you forget building the docs?');
} // switch to the root dir


sh.cd(path.join(__dirname, '..')); // remove any previously created folder with the same name

sh.rm('-rf', folderName); // create any folders so that `cp` works

sh.mkdir('-p', folderName);
sh.mkdir('-p', "".concat(folderName, "/assets/brand/"));
sh.cp('-Rf', "_gh_pages/docs/".concat(versionShort, "/examples/*"), folderName);
sh.cp('-Rf', "_gh_pages/docs/".concat(versionShort, "/dist/"), "".concat(folderName, "/assets/")); // also copy the two brand images we use in the examples

sh.cp('-f', ["_gh_pages/docs/".concat(versionShort, "/assets/brand/bootstrap-outline.svg"), "_gh_pages/docs/".concat(versionShort, "/assets/brand/bootstrap-solid.svg")], "".concat(folderName, "/assets/brand/"));
sh.rm("".concat(folderName, "/index.html")); // get all examples' HTML files

sh.find("".concat(folderName, "/**/*.html")).forEach(function (file) {
  var fileContents = sh.cat(file).toString().replace(new RegExp("\"/docs/".concat(versionShort, "/"), 'g'), '"../').replace(/"..\/dist\//g, '"../assets/dist/').replace(/(<link href="\.\.\/.*) integrity=".*>/g, '$1>').replace(/(<script src="\.\.\/.*) integrity=".*>/g, '$1></script>').replace(/( +)<!-- favicons(.|\n)+<style>/i, '    <style>');
  new sh.ShellString(fileContents).to(file);
}); // create the zip file

sh.exec("zip -r9 \"".concat(folderName, ".zip\" \"").concat(folderName, "\""), {
  fatal: true
}); // remove the folder we created

sh.rm('-rf', folderName);