"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _util = _interopRequireDefault(require("./util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
var NAME = 'toast';
var VERSION = '4.5.2';
var DATA_KEY = 'bs.toast';
var EVENT_KEY = ".".concat(DATA_KEY);
var JQUERY_NO_CONFLICT = _jquery["default"].fn[NAME];
var EVENT_CLICK_DISMISS = "click.dismiss".concat(EVENT_KEY);
var EVENT_HIDE = "hide".concat(EVENT_KEY);
var EVENT_HIDDEN = "hidden".concat(EVENT_KEY);
var EVENT_SHOW = "show".concat(EVENT_KEY);
var EVENT_SHOWN = "shown".concat(EVENT_KEY);
var CLASS_NAME_FADE = 'fade';
var CLASS_NAME_HIDE = 'hide';
var CLASS_NAME_SHOW = 'show';
var CLASS_NAME_SHOWING = 'showing';
var DefaultType = {
  animation: 'boolean',
  autohide: 'boolean',
  delay: 'number'
};
var Default = {
  animation: true,
  autohide: true,
  delay: 500
};
var SELECTOR_DATA_DISMISS = '[data-dismiss="toast"]';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Toast =
/*#__PURE__*/
function () {
  function Toast(element, config) {
    _classCallCheck(this, Toast);

    this._element = element;
    this._config = this._getConfig(config);
    this._timeout = null;

    this._setListeners();
  } // Getters


  _createClass(Toast, [{
    key: "show",
    // Public
    value: function show() {
      var _this = this;

      var showEvent = _jquery["default"].Event(EVENT_SHOW);

      (0, _jquery["default"])(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      this._clearTimeout();

      if (this._config.animation) {
        this._element.classList.add(CLASS_NAME_FADE);
      }

      var complete = function complete() {
        _this._element.classList.remove(CLASS_NAME_SHOWING);

        _this._element.classList.add(CLASS_NAME_SHOW);

        (0, _jquery["default"])(_this._element).trigger(EVENT_SHOWN);

        if (_this._config.autohide) {
          _this._timeout = setTimeout(function () {
            _this.hide();
          }, _this._config.delay);
        }
      };

      this._element.classList.remove(CLASS_NAME_HIDE);

      _util["default"].reflow(this._element);

      this._element.classList.add(CLASS_NAME_SHOWING);

      if (this._config.animation) {
        var transitionDuration = _util["default"].getTransitionDurationFromElement(this._element);

        (0, _jquery["default"])(this._element).one(_util["default"].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      if (!this._element.classList.contains(CLASS_NAME_SHOW)) {
        return;
      }

      var hideEvent = _jquery["default"].Event(EVENT_HIDE);

      (0, _jquery["default"])(this._element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      this._close();
    }
  }, {
    key: "dispose",
    value: function dispose() {
      this._clearTimeout();

      if (this._element.classList.contains(CLASS_NAME_SHOW)) {
        this._element.classList.remove(CLASS_NAME_SHOW);
      }

      (0, _jquery["default"])(this._element).off(EVENT_CLICK_DISMISS);

      _jquery["default"].removeData(this._element, DATA_KEY);

      this._element = null;
      this._config = null;
    } // Private

  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread({}, Default, {}, (0, _jquery["default"])(this._element).data(), {}, _typeof(config) === 'object' && config ? config : {});

      _util["default"].typeCheckConfig(NAME, config, this.constructor.DefaultType);

      return config;
    }
  }, {
    key: "_setListeners",
    value: function _setListeners() {
      var _this2 = this;

      (0, _jquery["default"])(this._element).on(EVENT_CLICK_DISMISS, SELECTOR_DATA_DISMISS, function () {
        return _this2.hide();
      });
    }
  }, {
    key: "_close",
    value: function _close() {
      var _this3 = this;

      var complete = function complete() {
        _this3._element.classList.add(CLASS_NAME_HIDE);

        (0, _jquery["default"])(_this3._element).trigger(EVENT_HIDDEN);
      };

      this._element.classList.remove(CLASS_NAME_SHOW);

      if (this._config.animation) {
        var transitionDuration = _util["default"].getTransitionDurationFromElement(this._element);

        (0, _jquery["default"])(this._element).one(_util["default"].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    }
  }, {
    key: "_clearTimeout",
    value: function _clearTimeout() {
      clearTimeout(this._timeout);
      this._timeout = null;
    } // Static

  }], [{
    key: "_jQueryInterface",
    value: function _jQueryInterface(config) {
      return this.each(function () {
        var $element = (0, _jquery["default"])(this);
        var data = $element.data(DATA_KEY);

        var _config = _typeof(config) === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config](this);
        }
      });
    }
  }, {
    key: "VERSION",
    get: function get() {
      return VERSION;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default;
    }
  }]);

  return Toast;
}();
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */


_jquery["default"].fn[NAME] = Toast._jQueryInterface;
_jquery["default"].fn[NAME].Constructor = Toast;

_jquery["default"].fn[NAME].noConflict = function () {
  _jquery["default"].fn[NAME] = JQUERY_NO_CONFLICT;
  return Toast._jQueryInterface;
};

var _default = Toast;
exports["default"] = _default;