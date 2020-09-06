"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */
var NAME = 'button';
var VERSION = '4.5.2';
var DATA_KEY = 'bs.button';
var EVENT_KEY = ".".concat(DATA_KEY);
var DATA_API_KEY = '.data-api';
var JQUERY_NO_CONFLICT = _jquery["default"].fn[NAME];
var CLASS_NAME_ACTIVE = 'active';
var CLASS_NAME_BUTTON = 'btn';
var CLASS_NAME_FOCUS = 'focus';
var SELECTOR_DATA_TOGGLE_CARROT = '[data-toggle^="button"]';
var SELECTOR_DATA_TOGGLES = '[data-toggle="buttons"]';
var SELECTOR_DATA_TOGGLE = '[data-toggle="button"]';
var SELECTOR_DATA_TOGGLES_BUTTONS = '[data-toggle="buttons"] .btn';
var SELECTOR_INPUT = 'input:not([type="hidden"])';
var SELECTOR_ACTIVE = '.active';
var SELECTOR_BUTTON = '.btn';
var EVENT_CLICK_DATA_API = "click".concat(EVENT_KEY).concat(DATA_API_KEY);
var EVENT_FOCUS_BLUR_DATA_API = "focus".concat(EVENT_KEY).concat(DATA_API_KEY, " ") + "blur".concat(EVENT_KEY).concat(DATA_API_KEY);
var EVENT_LOAD_DATA_API = "load".concat(EVENT_KEY).concat(DATA_API_KEY);
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Button =
/*#__PURE__*/
function () {
  function Button(element) {
    _classCallCheck(this, Button);

    this._element = element;
  } // Getters


  _createClass(Button, [{
    key: "toggle",
    // Public
    value: function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = (0, _jquery["default"])(this._element).closest(SELECTOR_DATA_TOGGLES)[0];

      if (rootElement) {
        var input = this._element.querySelector(SELECTOR_INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(CLASS_NAME_ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(SELECTOR_ACTIVE);

              if (activeElement) {
                (0, _jquery["default"])(activeElement).removeClass(CLASS_NAME_ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input
            if (input.type === 'checkbox' || input.type === 'radio') {
              input.checked = !this._element.classList.contains(CLASS_NAME_ACTIVE);
            }

            (0, _jquery["default"])(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (!(this._element.hasAttribute('disabled') || this._element.classList.contains('disabled'))) {
        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(CLASS_NAME_ACTIVE));
        }

        if (triggerChangeEvent) {
          (0, _jquery["default"])(this._element).toggleClass(CLASS_NAME_ACTIVE);
        }
      }
    }
  }, {
    key: "dispose",
    value: function dispose() {
      _jquery["default"].removeData(this._element, DATA_KEY);

      this._element = null;
    } // Static

  }], [{
    key: "_jQueryInterface",
    value: function _jQueryInterface(config) {
      return this.each(function () {
        var data = (0, _jquery["default"])(this).data(DATA_KEY);

        if (!data) {
          data = new Button(this);
          (0, _jquery["default"])(this).data(DATA_KEY, data);
        }

        if (config === 'toggle') {
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

  return Button;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


(0, _jquery["default"])(document).on(EVENT_CLICK_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
  var button = event.target;
  var initialButton = button;

  if (!(0, _jquery["default"])(button).hasClass(CLASS_NAME_BUTTON)) {
    button = (0, _jquery["default"])(button).closest(SELECTOR_BUTTON)[0];
  }

  if (!button || button.hasAttribute('disabled') || button.classList.contains('disabled')) {
    event.preventDefault(); // work around Firefox bug #1540995
  } else {
    var inputBtn = button.querySelector(SELECTOR_INPUT);

    if (inputBtn && (inputBtn.hasAttribute('disabled') || inputBtn.classList.contains('disabled'))) {
      event.preventDefault(); // work around Firefox bug #1540995

      return;
    }

    if (initialButton.tagName !== 'LABEL' || inputBtn && inputBtn.type !== 'checkbox') {
      Button._jQueryInterface.call((0, _jquery["default"])(button), 'toggle');
    }
  }
}).on(EVENT_FOCUS_BLUR_DATA_API, SELECTOR_DATA_TOGGLE_CARROT, function (event) {
  var button = (0, _jquery["default"])(event.target).closest(SELECTOR_BUTTON)[0];
  (0, _jquery["default"])(button).toggleClass(CLASS_NAME_FOCUS, /^focus(in)?$/.test(event.type));
});
(0, _jquery["default"])(window).on(EVENT_LOAD_DATA_API, function () {
  // ensure correct active class is set to match the controls' actual values/states
  // find all checkboxes/readio buttons inside data-toggle groups
  var buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLES_BUTTONS));

  for (var i = 0, len = buttons.length; i < len; i++) {
    var button = buttons[i];
    var input = button.querySelector(SELECTOR_INPUT);

    if (input.checked || input.hasAttribute('checked')) {
      button.classList.add(CLASS_NAME_ACTIVE);
    } else {
      button.classList.remove(CLASS_NAME_ACTIVE);
    }
  } // find all button toggles


  buttons = [].slice.call(document.querySelectorAll(SELECTOR_DATA_TOGGLE));

  for (var _i = 0, _len = buttons.length; _i < _len; _i++) {
    var _button = buttons[_i];

    if (_button.getAttribute('aria-pressed') === 'true') {
      _button.classList.add(CLASS_NAME_ACTIVE);
    } else {
      _button.classList.remove(CLASS_NAME_ACTIVE);
    }
  }
});
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

_jquery["default"].fn[NAME] = Button._jQueryInterface;
_jquery["default"].fn[NAME].Constructor = Button;

_jquery["default"].fn[NAME].noConflict = function () {
  _jquery["default"].fn[NAME] = JQUERY_NO_CONFLICT;
  return Button._jQueryInterface;
};

var _default = Button;
exports["default"] = _default;