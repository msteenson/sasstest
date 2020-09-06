'use strict';

var pkg = require('../package.json');

var year = new Date().getFullYear();

function getBanner(pluginFilename) {
  return "/*!\n  * Bootstrap".concat(pluginFilename ? " ".concat(pluginFilename) : '', " v").concat(pkg.version, " (").concat(pkg.homepage, ")\n  * Copyright 2011-").concat(year, " ").concat(pkg.author, "\n  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)\n  */");
}

module.exports = getBanner;