"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _tooltip = _interopRequireDefault(require("./tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
var NAME = 'popover';
var VERSION = '4.5.2';
var DATA_KEY = 'bs.popover';
var EVENT_KEY = ".".concat(DATA_KEY);
var JQUERY_NO_CONFLICT = _jquery["default"].fn[NAME];
var CLASS_PREFIX = 'bs-popover';
var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)".concat(CLASS_PREFIX, "\\S+"), 'g');

var Default = _objectSpread({}, _tooltip["default"].Default, {
  placement: 'right',
  trigger: 'click',
  content: '',
  template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
});

var DefaultType = _objectSpread({}, _tooltip["default"].DefaultType, {
  content: '(string|element|function)'
});

var CLASS_NAME_FADE = 'fade';
var CLASS_NAME_SHOW = 'show';
var SELECTOR_TITLE = '.popover-header';
var SELECTOR_CONTENT = '.popover-body';
var Event = {
  HIDE: "hide".concat(EVENT_KEY),
  HIDDEN: "hidden".concat(EVENT_KEY),
  SHOW: "show".concat(EVENT_KEY),
  SHOWN: "shown".concat(EVENT_KEY),
  INSERTED: "inserted".concat(EVENT_KEY),
  CLICK: "click".concat(EVENT_KEY),
  FOCUSIN: "focusin".concat(EVENT_KEY),
  FOCUSOUT: "focusout".concat(EVENT_KEY),
  MOUSEENTER: "mouseenter".concat(EVENT_KEY),
  MOUSELEAVE: "mouseleave".concat(EVENT_KEY)
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Popover =
/*#__PURE__*/
function (_Tooltip) {
  _inherits(Popover, _Tooltip);

  function Popover() {
    _classCallCheck(this, Popover);

    return _possibleConstructorReturn(this, _getPrototypeOf(Popover).apply(this, arguments));
  }

  _createClass(Popover, [{
    key: "isWithContent",
    // Overrides
    value: function isWithContent() {
      return this.getTitle() || this._getContent();
    }
  }, {
    key: "addAttachmentClass",
    value: function addAttachmentClass(attachment) {
      (0, _jquery["default"])(this.getTipElement()).addClass("".concat(CLASS_PREFIX, "-").concat(attachment));
    }
  }, {
    key: "getTipElement",
    value: function getTipElement() {
      this.tip = this.tip || (0, _jquery["default"])(this.config.template)[0];
      return this.tip;
    }
  }, {
    key: "setContent",
    value: function setContent() {
      var $tip = (0, _jquery["default"])(this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(SELECTOR_TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(SELECTOR_CONTENT), content);
      $tip.removeClass("".concat(CLASS_NAME_FADE, " ").concat(CLASS_NAME_SHOW));
    } // Private

  }, {
    key: "_getContent",
    value: function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    }
  }, {
    key: "_cleanTipClass",
    value: function _cleanTipClass() {
      var $tip = (0, _jquery["default"])(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    } // Static

  }], [{
    key: "_jQueryInterface",
    value: function _jQueryInterface(config) {
      return this.each(function () {
        var data = (0, _jquery["default"])(this).data(DATA_KEY);

        var _config = _typeof(config) === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          (0, _jquery["default"])(this).data(DATA_KEY, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"".concat(config, "\""));
          }

          data[config]();
        }
      });
    }
  }, {
    key: "VERSION",
    // Getters
    get: function get() {
      return VERSION;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default;
    }
  }, {
    key: "NAME",
    get: function get() {
      return NAME;
    }
  }, {
    key: "DATA_KEY",
    get: function get() {
      return DATA_KEY;
    }
  }, {
    key: "Event",
    get: function get() {
      return Event;
    }
  }, {
    key: "EVENT_KEY",
    get: function get() {
      return EVENT_KEY;
    }
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType;
    }
  }]);

  return Popover;
}(_tooltip["default"]);
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */


_jquery["default"].fn[NAME] = Popover._jQueryInterface;
_jquery["default"].fn[NAME].Constructor = Popover;

_jquery["default"].fn[NAME].noConflict = function () {
  _jquery["default"].fn[NAME] = JQUERY_NO_CONFLICT;
  return Popover._jQueryInterface;
};

var _default = Popover;
exports["default"] = _default;