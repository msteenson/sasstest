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
var NAME = 'alert';
var VERSION = '4.5.2';
var DATA_KEY = 'bs.alert';
var EVENT_KEY = ".".concat(DATA_KEY);
var DATA_API_KEY = '.data-api';
var JQUERY_NO_CONFLICT = _jquery["default"].fn[NAME];
var SELECTOR_DISMISS = '[data-dismiss="alert"]';
var EVENT_CLOSE = "close".concat(EVENT_KEY);
var EVENT_CLOSED = "closed".concat(EVENT_KEY);
var EVENT_CLICK_DATA_API = "click".concat(EVENT_KEY).concat(DATA_API_KEY);
var CLASS_NAME_ALERT = 'alert';
var CLASS_NAME_FADE = 'fade';
var CLASS_NAME_SHOW = 'show';
/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

var Alert =
/*#__PURE__*/
function () {
  function Alert(element) {
    _classCallCheck(this, Alert);

    this._element = element;
  } // Getters


  _createClass(Alert, [{
    key: "close",
    // Public
    value: function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    }
  }, {
    key: "dispose",
    value: function dispose() {
      _jquery["default"].removeData(this._element, DATA_KEY);

      this._element = null;
    } // Private

  }, {
    key: "_getRootElement",
    value: function _getRootElement(element) {
      var selector = _util["default"].getSelectorFromElement(element);

      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = (0, _jquery["default"])(element).closest(".".concat(CLASS_NAME_ALERT))[0];
      }

      return parent;
    }
  }, {
    key: "_triggerCloseEvent",
    value: function _triggerCloseEvent(element) {
      var closeEvent = _jquery["default"].Event(EVENT_CLOSE);

      (0, _jquery["default"])(element).trigger(closeEvent);
      return closeEvent;
    }
  }, {
    key: "_removeElement",
    value: function _removeElement(element) {
      var _this = this;

      (0, _jquery["default"])(element).removeClass(CLASS_NAME_SHOW);

      if (!(0, _jquery["default"])(element).hasClass(CLASS_NAME_FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = _util["default"].getTransitionDurationFromElement(element);

      (0, _jquery["default"])(element).one(_util["default"].TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    }
  }, {
    key: "_destroyElement",
    value: function _destroyElement(element) {
      (0, _jquery["default"])(element).detach().trigger(EVENT_CLOSED).remove();
    } // Static

  }], [{
    key: "_jQueryInterface",
    value: function _jQueryInterface(config) {
      return this.each(function () {
        var $element = (0, _jquery["default"])(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    }
  }, {
    key: "_handleDismiss",
    value: function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    }
  }, {
    key: "VERSION",
    get: function get() {
      return VERSION;
    }
  }]);

  return Alert;
}();
/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */


(0, _jquery["default"])(document).on(EVENT_CLICK_DATA_API, SELECTOR_DISMISS, Alert._handleDismiss(new Alert()));
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

_jquery["default"].fn[NAME] = Alert._jQueryInterface;
_jquery["default"].fn[NAME].Constructor = Alert;

_jquery["default"].fn[NAME].noConflict = function () {
  _jquery["default"].fn[NAME] = JQUERY_NO_CONFLICT;
  return Alert._jQueryInterface;
};

var _default = Alert;
exports["default"] = _default;