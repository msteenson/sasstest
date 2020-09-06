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
var NAME = 'scrollspy';
var VERSION = '4.5.2';
var DATA_KEY = 'bs.scrollspy';
var EVENT_KEY = ".".concat(DATA_KEY);
var DATA_API_KEY = '.data-api';
var JQUERY_NO_CONFLICT = _jquery["default"].fn[NAME];
var Default = {
  offset: 10,
  method: 'auto',
  target: ''
};
var DefaultType = {
  offset: 'number',
  method: 'string',
  target: '(string|element)'
};
var EVENT_ACTIVATE = "activate".concat(EVENT_KEY);
var EVENT_SCROLL = "scroll".concat(EVENT_KEY);
var EVENT_LOAD_DATA_API = "load".concat(EVENT_KEY).concat(DATA_API_KEY);
var CLASS_NAME_DROPDOWN_ITEM = 'dropdown-item';
var CLASS_NAME_ACTIVE = 'active';
var SELECTOR_DATA_SPY = '[data-spy="scroll"]';
var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
var SELECTOR_NAV_LINKS = '.nav-link';
var SELECTOR_NAV_ITEMS = '.nav-item';
var SELECTOR_LIST_ITEMS = '.list-group-item';
var SELECTOR_DROPDOWN = '.dropdown';
var SELECTOR_DROPDOWN_ITEMS = '.dropdown-item';
var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
var METHOD_OFFSET = 'offset';
var METHOD_POSITION = 'position';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var ScrollSpy =
/*#__PURE__*/
function () {
  function ScrollSpy(element, config) {
    var _this = this;

    _classCallCheck(this, ScrollSpy);

    this._element = element;
    this._scrollElement = element.tagName === 'BODY' ? window : element;
    this._config = this._getConfig(config);
    this._selector = "".concat(this._config.target, " ").concat(SELECTOR_NAV_LINKS, ",") + "".concat(this._config.target, " ").concat(SELECTOR_LIST_ITEMS, ",") + "".concat(this._config.target, " ").concat(SELECTOR_DROPDOWN_ITEMS);
    this._offsets = [];
    this._targets = [];
    this._activeTarget = null;
    this._scrollHeight = 0;
    (0, _jquery["default"])(this._scrollElement).on(EVENT_SCROLL, function (event) {
      return _this._process(event);
    });
    this.refresh();

    this._process();
  } // Getters


  _createClass(ScrollSpy, [{
    key: "refresh",
    // Public
    value: function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? METHOD_OFFSET : METHOD_POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === METHOD_POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;

        var targetSelector = _util["default"].getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [(0, _jquery["default"])(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    }
  }, {
    key: "dispose",
    value: function dispose() {
      _jquery["default"].removeData(this._element, DATA_KEY);

      (0, _jquery["default"])(this._scrollElement).off(EVENT_KEY);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private

  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread({}, Default, {}, _typeof(config) === 'object' && config ? config : {});

      if (typeof config.target !== 'string' && _util["default"].isElement(config.target)) {
        var id = (0, _jquery["default"])(config.target).attr('id');

        if (!id) {
          id = _util["default"].getUID(NAME);
          (0, _jquery["default"])(config.target).attr('id', id);
        }

        config.target = "#".concat(id);
      }

      _util["default"].typeCheckConfig(NAME, config, DefaultType);

      return config;
    }
  }, {
    key: "_getScrollTop",
    value: function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    }
  }, {
    key: "_getScrollHeight",
    value: function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    }
  }, {
    key: "_getOffsetHeight",
    value: function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    }
  }, {
    key: "_process",
    value: function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      for (var i = this._offsets.length; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    }
  }, {
    key: "_activate",
    value: function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return "".concat(selector, "[data-target=\"").concat(target, "\"],").concat(selector, "[href=\"").concat(target, "\"]");
      });

      var $link = (0, _jquery["default"])([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(CLASS_NAME_DROPDOWN_ITEM)) {
        $link.closest(SELECTOR_DROPDOWN).find(SELECTOR_DROPDOWN_TOGGLE).addClass(CLASS_NAME_ACTIVE);
        $link.addClass(CLASS_NAME_ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(CLASS_NAME_ACTIVE); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev("".concat(SELECTOR_NAV_LINKS, ", ").concat(SELECTOR_LIST_ITEMS)).addClass(CLASS_NAME_ACTIVE); // Handle special case when .nav-link is inside .nav-item

        $link.parents(SELECTOR_NAV_LIST_GROUP).prev(SELECTOR_NAV_ITEMS).children(SELECTOR_NAV_LINKS).addClass(CLASS_NAME_ACTIVE);
      }

      (0, _jquery["default"])(this._scrollElement).trigger(EVENT_ACTIVATE, {
        relatedTarget: target
      });
    }
  }, {
    key: "_clear",
    value: function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(CLASS_NAME_ACTIVE);
      }).forEach(function (node) {
        return node.classList.remove(CLASS_NAME_ACTIVE);
      });
    } // Static

  }], [{
    key: "_jQueryInterface",
    value: function _jQueryInterface(config) {
      return this.each(function () {
        var data = (0, _jquery["default"])(this).data(DATA_KEY);

        var _config = _typeof(config) === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
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
    get: function get() {
      return VERSION;
    }
  }, {
    key: "Default",
    get: function get() {
      return Default;
    }
  }]);

  return ScrollSpy;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


(0, _jquery["default"])(window).on(EVENT_LOAD_DATA_API, function () {
  var scrollSpys = [].slice.call(document.querySelectorAll(SELECTOR_DATA_SPY));
  var scrollSpysLength = scrollSpys.length;

  for (var i = scrollSpysLength; i--;) {
    var $spy = (0, _jquery["default"])(scrollSpys[i]);

    ScrollSpy._jQueryInterface.call($spy, $spy.data());
  }
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

_jquery["default"].fn[NAME] = ScrollSpy._jQueryInterface;
_jquery["default"].fn[NAME].Constructor = ScrollSpy;

_jquery["default"].fn[NAME].noConflict = function () {
  _jquery["default"].fn[NAME] = JQUERY_NO_CONFLICT;
  return ScrollSpy._jQueryInterface;
};

var _default = ScrollSpy;
exports["default"] = _default;