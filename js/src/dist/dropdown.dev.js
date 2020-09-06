"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _popper = _interopRequireDefault(require("popper.js"));

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
var NAME = 'dropdown';
var VERSION = '4.5.2';
var DATA_KEY = 'bs.dropdown';
var EVENT_KEY = ".".concat(DATA_KEY);
var DATA_API_KEY = '.data-api';
var JQUERY_NO_CONFLICT = _jquery["default"].fn[NAME];
var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

var REGEXP_KEYDOWN = new RegExp("".concat(ARROW_UP_KEYCODE, "|").concat(ARROW_DOWN_KEYCODE, "|").concat(ESCAPE_KEYCODE));
var EVENT_HIDE = "hide".concat(EVENT_KEY);
var EVENT_HIDDEN = "hidden".concat(EVENT_KEY);
var EVENT_SHOW = "show".concat(EVENT_KEY);
var EVENT_SHOWN = "shown".concat(EVENT_KEY);
var EVENT_CLICK = "click".concat(EVENT_KEY);
var EVENT_CLICK_DATA_API = "click".concat(EVENT_KEY).concat(DATA_API_KEY);
var EVENT_KEYDOWN_DATA_API = "keydown".concat(EVENT_KEY).concat(DATA_API_KEY);
var EVENT_KEYUP_DATA_API = "keyup".concat(EVENT_KEY).concat(DATA_API_KEY);
var CLASS_NAME_DISABLED = 'disabled';
var CLASS_NAME_SHOW = 'show';
var CLASS_NAME_DROPUP = 'dropup';
var CLASS_NAME_DROPRIGHT = 'dropright';
var CLASS_NAME_DROPLEFT = 'dropleft';
var CLASS_NAME_MENURIGHT = 'dropdown-menu-right';
var CLASS_NAME_POSITION_STATIC = 'position-static';
var SELECTOR_DATA_TOGGLE = '[data-toggle="dropdown"]';
var SELECTOR_FORM_CHILD = '.dropdown form';
var SELECTOR_MENU = '.dropdown-menu';
var SELECTOR_NAVBAR_NAV = '.navbar-nav';
var SELECTOR_VISIBLE_ITEMS = '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)';
var PLACEMENT_TOP = 'top-start';
var PLACEMENT_TOPEND = 'top-end';
var PLACEMENT_BOTTOM = 'bottom-start';
var PLACEMENT_BOTTOMEND = 'bottom-end';
var PLACEMENT_RIGHT = 'right-start';
var PLACEMENT_LEFT = 'left-start';
var Default = {
  offset: 0,
  flip: true,
  boundary: 'scrollParent',
  reference: 'toggle',
  display: 'dynamic',
  popperConfig: null
};
var DefaultType = {
  offset: '(number|string|function)',
  flip: 'boolean',
  boundary: '(string|element)',
  reference: '(string|element)',
  display: 'string',
  popperConfig: '(null|object)'
};
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Dropdown =
/*#__PURE__*/
function () {
  function Dropdown(element, config) {
    _classCallCheck(this, Dropdown);

    this._element = element;
    this._popper = null;
    this._config = this._getConfig(config);
    this._menu = this._getMenuElement();
    this._inNavbar = this._detectNavbar();

    this._addEventListeners();
  } // Getters


  _createClass(Dropdown, [{
    key: "toggle",
    // Public
    value: function toggle() {
      if (this._element.disabled || (0, _jquery["default"])(this._element).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var isActive = (0, _jquery["default"])(this._menu).hasClass(CLASS_NAME_SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      this.show(true);
    }
  }, {
    key: "show",
    value: function show() {
      var usePopper = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this._element.disabled || (0, _jquery["default"])(this._element).hasClass(CLASS_NAME_DISABLED) || (0, _jquery["default"])(this._menu).hasClass(CLASS_NAME_SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };

      var showEvent = _jquery["default"].Event(EVENT_SHOW, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      (0, _jquery["default"])(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar && usePopper) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof _popper["default"] === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (_util["default"].isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          (0, _jquery["default"])(parent).addClass(CLASS_NAME_POSITION_STATIC);
        }

        this._popper = new _popper["default"](referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && (0, _jquery["default"])(parent).closest(SELECTOR_NAVBAR_NAV).length === 0) {
        (0, _jquery["default"])(document.body).children().on('mouseover', null, _jquery["default"].noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      (0, _jquery["default"])(this._menu).toggleClass(CLASS_NAME_SHOW);
      (0, _jquery["default"])(parent).toggleClass(CLASS_NAME_SHOW).trigger(_jquery["default"].Event(EVENT_SHOWN, relatedTarget));
    }
  }, {
    key: "hide",
    value: function hide() {
      if (this._element.disabled || (0, _jquery["default"])(this._element).hasClass(CLASS_NAME_DISABLED) || !(0, _jquery["default"])(this._menu).hasClass(CLASS_NAME_SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };

      var hideEvent = _jquery["default"].Event(EVENT_HIDE, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      (0, _jquery["default"])(parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      if (this._popper) {
        this._popper.destroy();
      }

      (0, _jquery["default"])(this._menu).toggleClass(CLASS_NAME_SHOW);
      (0, _jquery["default"])(parent).toggleClass(CLASS_NAME_SHOW).trigger(_jquery["default"].Event(EVENT_HIDDEN, relatedTarget));
    }
  }, {
    key: "dispose",
    value: function dispose() {
      _jquery["default"].removeData(this._element, DATA_KEY);

      (0, _jquery["default"])(this._element).off(EVENT_KEY);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    }
  }, {
    key: "update",
    value: function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private

  }, {
    key: "_addEventListeners",
    value: function _addEventListeners() {
      var _this = this;

      (0, _jquery["default"])(this._element).on(EVENT_CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    }
  }, {
    key: "_getConfig",
    value: function _getConfig(config) {
      config = _objectSpread({}, this.constructor.Default, {}, (0, _jquery["default"])(this._element).data(), {}, config);

      _util["default"].typeCheckConfig(NAME, config, this.constructor.DefaultType);

      return config;
    }
  }, {
    key: "_getMenuElement",
    value: function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(SELECTOR_MENU);
        }
      }

      return this._menu;
    }
  }, {
    key: "_getPlacement",
    value: function _getPlacement() {
      var $parentDropdown = (0, _jquery["default"])(this._element.parentNode);
      var placement = PLACEMENT_BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(CLASS_NAME_DROPUP)) {
        placement = (0, _jquery["default"])(this._menu).hasClass(CLASS_NAME_MENURIGHT) ? PLACEMENT_TOPEND : PLACEMENT_TOP;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPRIGHT)) {
        placement = PLACEMENT_RIGHT;
      } else if ($parentDropdown.hasClass(CLASS_NAME_DROPLEFT)) {
        placement = PLACEMENT_LEFT;
      } else if ((0, _jquery["default"])(this._menu).hasClass(CLASS_NAME_MENURIGHT)) {
        placement = PLACEMENT_BOTTOMEND;
      }

      return placement;
    }
  }, {
    key: "_detectNavbar",
    value: function _detectNavbar() {
      return (0, _jquery["default"])(this._element).closest('.navbar').length > 0;
    }
  }, {
    key: "_getOffset",
    value: function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, {}, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    }
  }, {
    key: "_getPopperConfig",
    value: function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        }
      }; // Disable Popper.js if we have a static display

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return _objectSpread({}, popperConfig, {}, this._config.popperConfig);
    } // Static

  }], [{
    key: "_jQueryInterface",
    value: function _jQueryInterface(config) {
      return this.each(function () {
        var data = (0, _jquery["default"])(this).data(DATA_KEY);

        var _config = _typeof(config) === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
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
    key: "_clearMenus",
    value: function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = (0, _jquery["default"])(toggles[i]).data(DATA_KEY);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!(0, _jquery["default"])(parent).hasClass(CLASS_NAME_SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && _jquery["default"].contains(parent, event.target)) {
          continue;
        }

        var hideEvent = _jquery["default"].Event(EVENT_HIDE, relatedTarget);

        (0, _jquery["default"])(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          (0, _jquery["default"])(document.body).children().off('mouseover', null, _jquery["default"].noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');

        if (context._popper) {
          context._popper.destroy();
        }

        (0, _jquery["default"])(dropdownMenu).removeClass(CLASS_NAME_SHOW);
        (0, _jquery["default"])(parent).removeClass(CLASS_NAME_SHOW).trigger(_jquery["default"].Event(EVENT_HIDDEN, relatedTarget));
      }
    }
  }, {
    key: "_getParentFromElement",
    value: function _getParentFromElement(element) {
      var parent;

      var selector = _util["default"].getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    } // eslint-disable-next-line complexity

  }, {
    key: "_dataApiKeydownHandler",
    value: function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || (0, _jquery["default"])(event.target).closest(SELECTOR_MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      if (this.disabled || (0, _jquery["default"])(this).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = (0, _jquery["default"])(parent).hasClass(CLASS_NAME_SHOW);

      if (!isActive && event.which === ESCAPE_KEYCODE) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE) {
          (0, _jquery["default"])(parent.querySelector(SELECTOR_DATA_TOGGLE)).trigger('focus');
        }

        (0, _jquery["default"])(this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(SELECTOR_VISIBLE_ITEMS)).filter(function (item) {
        return (0, _jquery["default"])(item).is(':visible');
      });

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
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
  }, {
    key: "DefaultType",
    get: function get() {
      return DefaultType;
    }
  }]);

  return Dropdown;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


(0, _jquery["default"])(document).on(EVENT_KEYDOWN_DATA_API, SELECTOR_DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(EVENT_KEYDOWN_DATA_API, SELECTOR_MENU, Dropdown._dataApiKeydownHandler).on("".concat(EVENT_CLICK_DATA_API, " ").concat(EVENT_KEYUP_DATA_API), Dropdown._clearMenus).on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  event.preventDefault();
  event.stopPropagation();

  Dropdown._jQueryInterface.call((0, _jquery["default"])(this), 'toggle');
}).on(EVENT_CLICK_DATA_API, SELECTOR_FORM_CHILD, function (e) {
  e.stopPropagation();
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

_jquery["default"].fn[NAME] = Dropdown._jQueryInterface;
_jquery["default"].fn[NAME].Constructor = Dropdown;

_jquery["default"].fn[NAME].noConflict = function () {
  _jquery["default"].fn[NAME] = JQUERY_NO_CONFLICT;
  return Dropdown._jQueryInterface;
};

var _default = Dropdown;
exports["default"] = _default;