"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _util = _interopRequireDefault(require("./util"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
var NAME = 'tab';
var VERSION = '4.5.2';
var DATA_KEY = 'bs.tab';
var EVENT_KEY = ".".concat(DATA_KEY);
var DATA_API_KEY = '.data-api';
var JQUERY_NO_CONFLICT = _jquery["default"].fn[NAME];
var EVENT_HIDE = "hide".concat(EVENT_KEY);
var EVENT_HIDDEN = "hidden".concat(EVENT_KEY);
var EVENT_SHOW = "show".concat(EVENT_KEY);
var EVENT_SHOWN = "shown".concat(EVENT_KEY);
var EVENT_CLICK_DATA_API = "click".concat(EVENT_KEY).concat(DATA_API_KEY);
var CLASS_NAME_DROPDOWN_MENU = 'dropdown-menu';
var CLASS_NAME_ACTIVE = 'active';
var CLASS_NAME_DISABLED = 'disabled';
var CLASS_NAME_FADE = 'fade';
var CLASS_NAME_SHOW = 'show';
var SELECTOR_DROPDOWN = '.dropdown';
var SELECTOR_NAV_LIST_GROUP = '.nav, .list-group';
var SELECTOR_ACTIVE = '.active';
var SELECTOR_ACTIVE_UL = '> li > .active';
var SELECTOR_DATA_TOGGLE = '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]';
var SELECTOR_DROPDOWN_TOGGLE = '.dropdown-toggle';
var SELECTOR_DROPDOWN_ACTIVE_CHILD = '> .dropdown-menu .active';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Tab =
/*#__PURE__*/
function () {
  function Tab(element) {
    _classCallCheck(this, Tab);

    this._element = element;
  } // Getters


  _createClass(Tab, [{
    key: "show",
    // Public
    value: function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && (0, _jquery["default"])(this._element).hasClass(CLASS_NAME_ACTIVE) || (0, _jquery["default"])(this._element).hasClass(CLASS_NAME_DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = (0, _jquery["default"])(this._element).closest(SELECTOR_NAV_LIST_GROUP)[0];

      var selector = _util["default"].getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? SELECTOR_ACTIVE_UL : SELECTOR_ACTIVE;
        previous = _jquery["default"].makeArray((0, _jquery["default"])(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = _jquery["default"].Event(EVENT_HIDE, {
        relatedTarget: this._element
      });

      var showEvent = _jquery["default"].Event(EVENT_SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        (0, _jquery["default"])(previous).trigger(hideEvent);
      }

      (0, _jquery["default"])(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = _jquery["default"].Event(EVENT_HIDDEN, {
          relatedTarget: _this._element
        });

        var shownEvent = _jquery["default"].Event(EVENT_SHOWN, {
          relatedTarget: previous
        });

        (0, _jquery["default"])(previous).trigger(hiddenEvent);
        (0, _jquery["default"])(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      _jquery["default"].removeData(this._element, DATA_KEY);

      this._element = null;
    } // Private

  }, {
    key: "_activate",
    value: function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? (0, _jquery["default"])(container).find(SELECTOR_ACTIVE_UL) : (0, _jquery["default"])(container).children(SELECTOR_ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && (0, _jquery["default"])(active).hasClass(CLASS_NAME_FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = _util["default"].getTransitionDurationFromElement(active);

        (0, _jquery["default"])(active).removeClass(CLASS_NAME_SHOW).one(_util["default"].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    }
  }, {
    key: "_transitionComplete",
    value: function _transitionComplete(element, active, callback) {
      if (active) {
        (0, _jquery["default"])(active).removeClass(CLASS_NAME_ACTIVE);
        var dropdownChild = (0, _jquery["default"])(active.parentNode).find(SELECTOR_DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          (0, _jquery["default"])(dropdownChild).removeClass(CLASS_NAME_ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      (0, _jquery["default"])(element).addClass(CLASS_NAME_ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      _util["default"].reflow(element);

      if (element.classList.contains(CLASS_NAME_FADE)) {
        element.classList.add(CLASS_NAME_SHOW);
      }

      if (element.parentNode && (0, _jquery["default"])(element.parentNode).hasClass(CLASS_NAME_DROPDOWN_MENU)) {
        var dropdownElement = (0, _jquery["default"])(element).closest(SELECTOR_DROPDOWN)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(SELECTOR_DROPDOWN_TOGGLE));
          (0, _jquery["default"])(dropdownToggleList).addClass(CLASS_NAME_ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static

  }], [{
    key: "_jQueryInterface",
    value: function _jQueryInterface(config) {
      return this.each(function () {
        var $this = (0, _jquery["default"])(this);
        var data = $this.data(DATA_KEY);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY, data);
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
  }]);

  return Tab;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


(0, _jquery["default"])(document).on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE, function (event) {
  event.preventDefault();

  Tab._jQueryInterface.call((0, _jquery["default"])(this), 'show');
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

_jquery["default"].fn[NAME] = Tab._jQueryInterface;
_jquery["default"].fn[NAME].Constructor = Tab;

_jquery["default"].fn[NAME].noConflict = function () {
  _jquery["default"].fn[NAME] = JQUERY_NO_CONFLICT;
  return Tab._jQueryInterface;
};

var _default = Tab;
exports["default"] = _default;