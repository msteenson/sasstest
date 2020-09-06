"use strict";

require("popper.js");

var _jquery = _interopRequireDefault(require("jquery"));

var _bootstrap = _interopRequireDefault(require("../../../dist/js/bootstrap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _jquery["default"])(function () {
  (0, _jquery["default"])('#resultUID').text(_bootstrap["default"].Util.getUID('bs'));
  (0, _jquery["default"])('[data-toggle="tooltip"]').tooltip();
});