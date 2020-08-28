(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("luxon"), require("@kpsys/angularjs-register"));
	else if(typeof define === 'function' && define.amd)
		define(["luxon", "@kpsys/angularjs-register"], factory);
	else if(typeof exports === 'object')
		exports["@kpsys/angularjs-date-parser"] = factory(require("luxon"), require("@kpsys/angularjs-register"));
	else
		root["@kpsys/angularjs-date-parser"] = factory(root["luxon"], root["@kpsys/angularjs-register"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var angularjs_register_1 = __webpack_require__(3);

var kp_date_parser_directive_1 = __webpack_require__(4);

var kp_date_parser_provider_1 = __webpack_require__(5);

var kp_date_parser_validation_service_1 = __webpack_require__(7);
/**
 * @ngdoc module
 * @name kpDateParser
 * @module kpDateParser
 *
 * @description
 * This module depends on `luxon` library - [https://moment.github.io/luxon/](https://moment.github.io/luxon/)
 */


exports.default = angularjs_register_1.default('kpDateParser').provider(kp_date_parser_provider_1.default.providerName, kp_date_parser_provider_1.default).service(kp_date_parser_validation_service_1.default.serviceName, kp_date_parser_validation_service_1.default).directive(kp_date_parser_directive_1.default.directiveName, kp_date_parser_directive_1.default).name();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
}); // @formatter:off

/**
 * @ngdoc directive
 * @name kpDateParser
 * @module kpDateParser
 *
 * @restrict A
 *
 * @requires https://moment.github.io/luxon/ luxon
 * @requires $parse
 * @requires $log
 * @requires service:dateParserService
 * @requires ngModel
 *
 * @param {string} kpDateParserModelFormat Custom model format.
 * @param {string} kpDateParserViewFormat Custom view format.
 *
 * @param {expression=} minDate Minimum date validation given in {@link string} [ISO format](https://en.wikipedia.org/wiki/ISO_8601) or null for disable it.
 * @param {expression=} maxDate Maximum date validation given in {@link string} [ISO format](https://en.wikipedia.org/wiki/ISO_8601) or null for disable it.
 *
 * @description
 * This directive converts model from date inserted by user to ISO format. Directive tries more formats specified in constant.
 * If input does not match any format, ngModel is null.
 *
 * Directive also adds some validation functions.
 *
 * | Validation name | Description |
 * |-----------------|-------------|
 * | date            | If inserted date is valid. |
 * | minDate         | If parsed date is greater then or equal date specified in `minDate` param. |
 * | maxDate         | If parsed date is lower then or equal date specified in `maxDate` param. |
 *
 * @example
 * <example name="kpDateParserExample" module="kpDateParserExample" frame-no-resize="true">
 *   <file name="index.html">
 *       <main class="container-fluid" ng-form="form" ng-controller="ctrl as ctrl">
 *           <div class="row">
 *               <div class="col-sm-2 form-group">
 *                   <label><input type="checkbox" ng-model="minDateValidation">Min Date Validation: </label>
 *                   <input class="form-control" type="date" ng-disabled="!minDateValidation" ng-model="minDate">
 *               </div>
 *           </div>
 *           <div class="row">
 *               <div class="col-sm-2 form-group">
 *                   <label><input type="checkbox" ng-model="maxDateValidation">Max Date Validation: </label>
 *                   <input class="form-control" type="date" ng-disabled="!maxDateValidation" ng-model="maxDate">
 *               </div>
 *           </div>
 *           <div class="row">
 *               <div class="col-sm-2">
 *                   <input class="form-control"
 *                   type="text" name="date"
 *                   ng-model="dateParserModel"
 *                   kp-date-parser
 *                   view-format="dd.LL.yyyy"
 *                   min-date="minDateValidation && minDate ? minDate.toISOString() : null"
 *                   max-date="maxDateValidation && maxDate ? maxDate.toISOString() : null"
 *                   >
 *               </div>
 *               <div class="col-sm-1">
 *                   <button class="btn btn-default" type="button" ng-click="dateParserModel = ctrl.getNow()">Now</button>
 *               </div>
 *           </div>
 *           <div class="row">
 *               <div class="col-sm-3">
 *                   <label>Date parser model:</label>
 *                   <input class="form-control" type="text" disabled="disabled" ng-model="dateParserModel">
 *               </div>
 *           </div>
 *           <ng-messages for="form.date.$error">
 *               <div ng-message="date">Invalid date</div>
 *               <div ng-message="minDate">Min date error</div>
 *               <div ng-message="maxDate">Max date error</div>
 *           </ng-messages>
 *       </main>
 *   </file>
 *   <file name="script.js">
 *       angular.module('kpDateParserExample', ['ngMessages', 'kpDateParser'])
 *           .controller('ctrl', function Controller() {
 *
 *               this.getNow = function() {
 *                   return new Date().toISOString();
 *               }
 *           });
 *   </file>
 * </example>
 */
// @formatter:on

var DateParserDirective =
/*#__PURE__*/
function () {
  DateParserDirective.$inject = ["$parse", "kpDateParserService", "kpDateParserValidationService"];

  /*@ngInject*/
  function DateParserDirective($parse, kpDateParserService, kpDateParserValidationService) {
    _classCallCheck(this, DateParserDirective);

    this.$parse = $parse;
    this.kpDateParserService = kpDateParserService;
    this.kpDateParserValidationService = kpDateParserValidationService;
    this.restrict = 'A';
    this.require = 'ngModel';
  }

  _createClass(DateParserDirective, [{
    key: "link",
    value: function link($scope, $element, $attrs, ngModelController) {
      var _this = this;

      var customModelFormat = null;
      var customViewFormat = null;
      var minValidationDate = null;
      var maxValidationDate = null;

      var refreshAttributes = function refreshAttributes() {
        customModelFormat = _this.$parse($attrs[DateParserDirective.MODEL_FORMAT_ATTRIBUTE])($scope);
        customViewFormat = _this.$parse($attrs[DateParserDirective.VIEW_FORMAT_ATTRIBUTE])($scope);
        minValidationDate = _this.$parse($attrs[DateParserDirective.MIN_VALIDATION_ATTRIBUTE])($scope);
        maxValidationDate = _this.$parse($attrs[DateParserDirective.MAX_VALIDATION_ATTRIBUTE])($scope);
      };

      ngModelController.$formatters.push(function (modelValue) {
        return _this.kpDateParserService.format(modelValue, function () {
          return customModelFormat;
        }, function () {
          return customViewFormat;
        });
      });
      ngModelController.$parsers.push(function (viewValue) {
        return _this.kpDateParserService.parse(viewValue, function () {
          return customModelFormat;
        }, function () {
          return customViewFormat;
        });
      });
      ngModelController.$validators.date = this.kpDateParserValidationService.validateDate(function () {
        return customViewFormat;
      });
      ngModelController.$validators.minDate = this.kpDateParserValidationService.validateMinDate(function () {
        return minValidationDate;
      }, function () {
        return customViewFormat;
      }, function () {
        return customModelFormat;
      });
      ngModelController.$validators.maxDate = this.kpDateParserValidationService.validateMaxDate(function () {
        return maxValidationDate;
      }, function () {
        return customViewFormat;
      }, function () {
        return customModelFormat;
      });
      $scope.$watchGroup([$attrs[DateParserDirective.MIN_VALIDATION_ATTRIBUTE], $attrs[DateParserDirective.MAX_VALIDATION_ATTRIBUTE]], function () {
        refreshAttributes();
        ngModelController.$validate();
      });
      $scope.$watchGroup([$attrs[DateParserDirective.MODEL_FORMAT_ATTRIBUTE], $attrs[DateParserDirective.VIEW_FORMAT_ATTRIBUTE]], function () {
        refreshAttributes();
        ngModelController.$processModelValue();
      });
    }
  }]);

  return DateParserDirective;
}();

exports.default = DateParserDirective;
DateParserDirective.directiveName = 'kpDateParser';
DateParserDirective.MODEL_FORMAT_ATTRIBUTE = 'kpDateParserModelFormat';
DateParserDirective.VIEW_FORMAT_ATTRIBUTE = 'kpDateParserViewFormat';
DateParserDirective.MIN_VALIDATION_ATTRIBUTE = 'minDate';
DateParserDirective.MAX_VALIDATION_ATTRIBUTE = 'maxDate';

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  privateMap.set(receiver, value);
  return value;
};

var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver);
};

var _parsingPipeline, _defaultModelFormat, _logger;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var luxon_1 = __webpack_require__(0);

var bind_decorator_1 = __webpack_require__(6);

var DEFAULT_DATE_FORMATS = ['d.L.y', 'dd.L.y', 'd.LL.y', 'dd.LL.y']; // https://github.com/moment/luxon/issues/632

function tzIncludingSecondsBugWorkaround(date) {
  if (date) {
    var isoDate = date.toISO();
    var tz = isoDate.split('T')[1].match(/[+-].*$/);

    if (tz && tz[0] && tz[0] === '+00:57') {
      // @ts-ignore
      var result = isoDate.replace(tz[0], luxon_1.LocalZone.instance.formatOffset(new Date().getTimezoneOffset(), 'short'));
      return luxon_1.DateTime.fromISO(result);
    }
  }

  return date;
}
/**
 * @ngdoc provider
 * @module kpDateParser
 * @name kpDateParserServiceProvider
 *
 * @description
 * Provider for {@link directive:kpDateParser} directive providing default settings.
 */


var KpDateParserServiceProvider =
/*#__PURE__*/
function () {
  function KpDateParserServiceProvider() {
    _classCallCheck(this, KpDateParserServiceProvider);

    _parsingPipeline.set(this, void 0);

    _defaultModelFormat.set(this, void 0);

    _logger.set(this, void 0);

    __classPrivateFieldSet(this, _parsingPipeline, DEFAULT_DATE_FORMATS);

    __classPrivateFieldSet(this, _logger, console);
  }
  /**
   * @ngdoc method
   * @name kpDateParserServiceProvider#clearDateFormatsPipeline
   *
   * @description
   * Clear parsing pipeline.
   */


  _createClass(KpDateParserServiceProvider, [{
    key: "clearDateFormatsPipeline",
    value: function clearDateFormatsPipeline() {
      __classPrivateFieldSet(this, _parsingPipeline, []);
    }
    /**
     * @ngdoc method
     * @name kpDateParserServiceProvider#setFormatsPipelineToDefault
     *
     * @description
     * Roll back parsing pipes to default values
     */

  }, {
    key: "setFormatsPipelineToDefault",
    value: function setFormatsPipelineToDefault() {
      __classPrivateFieldSet(this, _parsingPipeline, DEFAULT_DATE_FORMATS);
    }
    /**
     * @ngdoc method
     * @name kpDateParserServiceProvider#pushNewFormatToPipeline
     *
     * @param {string} format New format to push
     *
     * @description
     * Add new format to parsing pipeline
     */

  }, {
    key: "pushNewFormatToPipeline",
    value: function pushNewFormatToPipeline(format) {
      __classPrivateFieldGet(this, _parsingPipeline).push(format);
    }
    /**
     * @ngdoc method
     * @name kpDateParserServiceProvider#setDefaultModelFormat
     *
     * @description
     * Set default model format. If not set, model will be parsed into ISO format of specific format given by {@link directive:kpDateParser}.
     */

  }, {
    key: "setDefaultModelFormat",
    value: function setDefaultModelFormat(format) {
      __classPrivateFieldSet(this, _defaultModelFormat, format);
    }
    /*@ngInject*/

  }, {
    key: "$get",
    value: ["$log", function $get($log) {
      var _this = this;

      __classPrivateFieldSet(this, _logger, $log);

      return {
        getParsingPipeline: function getParsingPipeline() {
          return __classPrivateFieldGet(_this, _parsingPipeline).slice();
        },
        getDefaultModelFormat: function getDefaultModelFormat() {
          return __classPrivateFieldGet(_this, _defaultModelFormat);
        },
        parse: this.parse,
        format: this.format
      };
    }]
  }, {
    key: "parse",
    value: function parse(parsingDate, customModelFormatProvider, customViewFormatProvider) {
      if (!parsingDate) {
        return null;
      }

      try {
        var result = {
          isValid: false
        };

        var parsingPipeline = __classPrivateFieldGet(this, _parsingPipeline).slice();

        if (customViewFormatProvider && customViewFormatProvider()) {
          parsingPipeline.unshift(customViewFormatProvider());
        }

        var formatsIterator = parsingPipeline[Symbol.iterator]();
        var format = formatsIterator.next();

        while (!result.isValid && !format.done) {
          result = luxon_1.DateTime.fromFormat(parsingDate, format.value);
          format = formatsIterator.next();
        }

        if (result.isValid) {
          var patchedDateTime = tzIncludingSecondsBugWorkaround(result);
          var customModel = customModelFormatProvider ? customModelFormatProvider() : null;

          if (customModel || __classPrivateFieldGet(this, _defaultModelFormat)) {
            return patchedDateTime.toFormat(customModel || __classPrivateFieldGet(this, _defaultModelFormat));
          }

          return patchedDateTime.toISO();
        }
      } catch (e) {
        /* istanbul ignore next */
        __classPrivateFieldGet(this, _logger).debug('DateParserService#parse: ', e);
      }

      return null;
    }
  }, {
    key: "format",
    value: function format(formattingDate, customModelFormatProvider, customViewFormatProvider) {
      if (!formattingDate) {
        return null;
      }

      try {
        var parsedDate;
        var customModelFormat = customModelFormatProvider ? customModelFormatProvider() : null;

        if (customModelFormat || __classPrivateFieldGet(this, _defaultModelFormat)) {
          parsedDate = luxon_1.DateTime.fromFormat(formattingDate, customModelFormat || __classPrivateFieldGet(this, _defaultModelFormat));
        } else {
          parsedDate = luxon_1.DateTime.fromISO(formattingDate);
        }

        if (customViewFormatProvider && customViewFormatProvider()) {
          return parsedDate.toFormat(customViewFormatProvider());
        }

        return parsedDate.toISO();
      } catch (e) {
        /* istanbul ignore next */
        __classPrivateFieldGet(this, _logger).debug('DateParserService#format: ', e);
      }

      return null;
    }
  }]);

  return KpDateParserServiceProvider;
}();

_parsingPipeline = new WeakMap(), _defaultModelFormat = new WeakMap(), _logger = new WeakMap();
KpDateParserServiceProvider.providerName = 'kpDateParserService';

__decorate([bind_decorator_1.default], KpDateParserServiceProvider.prototype, "parse", null);

__decorate([bind_decorator_1.default], KpDateParserServiceProvider.prototype, "format", null);

exports.default = KpDateParserServiceProvider;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var constants;
(function (constants) {
    constants.typeOfFunction = 'function';
    constants.boolTrue = true;
})(constants || (constants = {}));
function bind(target, propertyKey, descriptor) {
    if (!descriptor || (typeof descriptor.value !== constants.typeOfFunction)) {
        throw new TypeError("Only methods can be decorated with @bind. <" + propertyKey + "> is not a method!");
    }
    return {
        configurable: constants.boolTrue,
        get: function () {
            var bound = descriptor.value.bind(this);
            // Credits to https://github.com/andreypopp/autobind-decorator for memoizing the result of bind against a symbol on the instance.
            Object.defineProperty(this, propertyKey, {
                value: bound,
                configurable: constants.boolTrue,
                writable: constants.boolTrue
            });
            return bound;
        }
    };
}
exports.bind = bind;
exports.default = bind;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var luxon_1 = __webpack_require__(0);
/**
 * @ngdoc service
 * @name kpDateParserValidation
 * @module
 *
 * @description
 * Validation service.
 */


var KpDateParserValidationService =
/*#__PURE__*/
function () {
  KpDateParserValidationService.$inject = ["kpDateParserService", "$log"];

  /*@ngInject*/
  function KpDateParserValidationService(kpDateParserService, $log) {
    _classCallCheck(this, KpDateParserValidationService);

    this.kpDateParserService = kpDateParserService;
    this.$log = $log;
  }
  /**
   * @ngdoc method
   * @name kpDateParserValidation#validateDate
   *
   * @param {string=} customViewFormatProvider Custom view format provider passed from directive.
   *
   * @description
   * Function returns validator on valid date.
   */


  _createClass(KpDateParserValidationService, [{
    key: "validateDate",
    value: function validateDate(customViewFormatProvider) {
      var _this = this;

      return function (modelValue, viewValue) {
        if (!viewValue) {
          return true;
        }

        return _this.kpDateParserService.parse(viewValue, null, customViewFormatProvider) !== null;
      };
    }
    /**
     * @ngdoc method
     * @name kpDateParserValidation#validateMinDate
     *
     * @param {function(): string} minDateInISOProvider Date in ISO format provider.
     * @param {function(): string=} customViewFormat Custom view format provider passed from directive.
     * @param {function(): string=} customModelFormat Custom model format provider passed from directive.
     *
     * @description
     * Function returns validation on min date.
     */

  }, {
    key: "validateMinDate",
    value: function validateMinDate(minDateInISOProvider, customViewFormat, customModelFormat) {
      return this.dateRestriction(minDateInISOProvider, customViewFormat, customModelFormat, function (currentDate, restrictingDate) {
        return currentDate >= restrictingDate;
      });
    }
    /**
     * @ngdoc method
     * @name kpDateParserValidation#validateMaxDate
     *
     * @param {function(): string} maxDateInISOProvider Date in ISO format provider.
     * @param {function(): string=} customViewFormat Custom view format provider passed from directive.
     * @param {function(): string=} customModelFormat Custom model format provider passed from directive.
     *
     * @description
     * Function returns validation on max date.
     */

  }, {
    key: "validateMaxDate",
    value: function validateMaxDate(maxDateInISOProvider, customViewFormat, customModelFormat) {
      return this.dateRestriction(maxDateInISOProvider, customViewFormat, customModelFormat, function (currentDate, restrictingDate) {
        return currentDate <= restrictingDate;
      });
    }
    /**
     * This function performs some checks and parsings of input dates and then returns `comparator` result.
     *
     * @param {function(): string} restrictingDateInISOProvider Validated date provider.
     * @param {function(): string} customViewFormat Custom view format provider passed from directive.
     * @param {function(): string} customModelFormat Custom model format provider passed from directive.
     * @param {(currentDate: DateTime, restrictingDate: DateTime) => boolean} comparator Executive logic.
     *
     * @returns {ValidatorFunction}
     * @private
     */

  }, {
    key: "dateRestriction",
    value: function dateRestriction(restrictingDateInISOProvider, customViewFormat, customModelFormat, comparator) {
      var _this2 = this;

      return function (modelValue, viewValue) {
        var _a;

        if (!restrictingDateInISOProvider()) {
          return true;
        }

        var currentDateInISO;

        if (viewValue) {
          currentDateInISO = _this2.kpDateParserService.parse(viewValue, null, customViewFormat);
        } else if (modelValue) {
          currentDateInISO = (_a = luxon_1.DateTime.fromISO(modelValue).toISO()) !== null && _a !== void 0 ? _a : luxon_1.DateTime.fromFormat(modelValue, customModelFormat() || _this2.kpDateParserService.getDefaultModelFormat()).toISO();
        } else {
          return true;
        }

        if (currentDateInISO === null) {
          return true;
        }

        var currentDate = luxon_1.DateTime.fromISO(currentDateInISO);
        var restrictingDate = luxon_1.DateTime.fromISO(restrictingDateInISOProvider());
        /* istanbul ignore else */

        if (restrictingDate.isValid) {
          return comparator(currentDate, restrictingDate);
        } else {
          _this2.$log.warn("DateParserDirective: restrictingDate argument for date validation is not in ISO format: ".concat(restrictingDateInISOProvider()));
        }

        return true;
      };
    }
  }]);

  return KpDateParserValidationService;
}();

exports.default = KpDateParserValidationService;
KpDateParserValidationService.serviceName = 'kpDateParserValidationService';

/***/ })
/******/ ]);
});