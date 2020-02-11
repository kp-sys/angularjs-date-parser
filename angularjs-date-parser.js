(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@kpsys/angularjs-register"), require("luxon"));
	else if(typeof define === 'function' && define.amd)
		define(["@kpsys/angularjs-register", "luxon"], factory);
	else if(typeof exports === 'object')
		exports["@kpsys/angularjs-date-parser"] = factory(require("@kpsys/angularjs-register"), require("luxon"));
	else
		root["@kpsys/angularjs-date-parser"] = factory(root["@kpsys/angularjs-register"], root["luxon"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__4__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var angularjs_register_1 = __webpack_require__(2);

var kp_date_parser_directive_1 = __webpack_require__(3);

var kp_date_parser_provider_1 = __webpack_require__(5);
/**
 * @ngdoc module
 * @name kpDateParser
 * @module kpDateParser
 *
 * @description
 * This module depends on `luxon` library - [https://moment.github.io/luxon/](https://moment.github.io/luxon/)
 */


exports.default = angularjs_register_1.default('kpDateParser').provider(kp_date_parser_provider_1.default.providerName, kp_date_parser_provider_1.default).directive(kp_date_parser_directive_1.default.directiveName, kp_date_parser_directive_1.default).name();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var luxon_1 = __webpack_require__(4); // @formatter:off

/**
 * @ngdoc directive
 * @name kpDateParser
 * @module kpDateParser
 *
 * @restrict A
 * @priority 100
 *
 * @requires https://moment.github.io/luxon/ luxon
 * @requires $parse
 * @requires $log
 * @requires service:dateParserService
 *
 * @param {string} ngModel Directive model
 * @param {string=} kpDateParser Custom parsing format.
 * @param {string=} viewFormat Specific view date format. Default is `'d.L.y'`.
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
  DateParserDirective.$inject = ["$parse", "$log", "dateParserService"];

  /*@ngInject*/
  function DateParserDirective($parse, $log, dateParserService) {
    _classCallCheck(this, DateParserDirective);

    this.$parse = $parse;
    this.$log = $log;
    this.dateParserService = dateParserService;
    this.restrict = 'A';
    this.require = 'ngModel';
    this.priority = 100;
  }

  _createClass(DateParserDirective, [{
    key: "link",
    value: function link($scope, $element, $attrs, ngModelController) {
      var viewFormat = $attrs.viewFormat || this.dateParserService.getViewFormat();
      ngModelController.$formatters.push(this.fromISOToFormattedDate(viewFormat));
      ngModelController.$parsers.push(this.parse.bind(this, viewFormat));
      ngModelController.$validators.date = this.validateInput.bind(this, viewFormat);
      ngModelController.$validators.minDate = this.validateMinDate($scope, $attrs, viewFormat).bind(this);
      ngModelController.$validators.maxDate = this.validateMaxDate($scope, $attrs, viewFormat).bind(this);
      $scope.$watchGroup([$attrs.minDate, $attrs.maxDate], function () {
        return ngModelController.$validate();
      });
    }
    /**
     * Convert [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date format to JS {@link Date}.
     * If input is not valid ISO date in string, return original value.
     */

  }, {
    key: "fromISOToFormattedDate",
    value: function fromISOToFormattedDate(viewFormat) {
      return function (isoDate) {
        var dateTime = luxon_1.DateTime.fromISO(isoDate);

        if (typeof isoDate === 'string' && dateTime.isValid) {
          return dateTime.toFormat(viewFormat);
        }

        return isoDate;
      };
    }
    /**
     * Convert string date to JS Date using more formats. If no luck, return `null`.
     */

  }, {
    key: "parse",
    value: function parse(customParsingFormat, date) {
      // TODO: Move this method to service
      if (!date) {
        return null;
      }

      try {
        var result = {
          isValid: false
        };
        var dateFormats = this.dateParserService.getParsingPipeline();

        if (customParsingFormat) {
          dateFormats.push(customParsingFormat);
        }

        var formatsIterator = dateFormats[Symbol.iterator]();
        var format = formatsIterator.next();

        while (!result.isValid && !format.done) {
          result = luxon_1.DateTime.fromFormat(date, format.value);
          format = formatsIterator.next();
        }

        if (result.isValid) {
          return result.toISO();
        }
      } catch (e) {
        /* istanbul ignore next */
        this.$log.debug('DateParserDirective#parse: ', e);
      }

      return null;
    }
    /**
     * Validates user input if is correct according to parser formats.
     */

  }, {
    key: "validateInput",
    value: function validateInput(customParsingFormat, model, view) {
      // required validation must be provided by another directive
      if (!view) {
        return true;
      }

      return this.parse(customParsingFormat, view) !== null;
    }
    /**
     * Validates if view date is greater then or equal user specified min date.
     */

  }, {
    key: "validateMinDate",
    value: function validateMinDate($scope, $attrs, customParsingFormat) {
      var _this = this;

      return function (model, view) {
        var currentDate = _this.parse(customParsingFormat, view);

        if (currentDate === null) {
          return true;
        }

        if ($attrs.minDate) {
          var parsedMinDate = _this.$parse($attrs.minDate)($scope);
          /* istanbul ignore else */


          if (parsedMinDate) {
            var minDate = luxon_1.DateTime.fromISO(parsedMinDate);
            /* istanbul ignore else */

            if (minDate.isValid) {
              return minDate <= luxon_1.DateTime.fromISO(currentDate);
            } else {
              _this.$log.warn("DateParserDirective: minDate argument for date validation is not in ISO format: ".concat(parsedMinDate));
            }
          } else {
            if (parsedMinDate !== null) {
              _this.$log.warn("DateParserDirective: minDate argument for date validation cannot be parsed: ".concat($attrs.minDate));
            }
          }
        }

        return true;
      };
    }
    /**
     * Validates if view date is less then or equal user specified max date.
     */

  }, {
    key: "validateMaxDate",
    value: function validateMaxDate($scope, $attrs, customParsingFormat) {
      var _this2 = this;

      return function (model, view) {
        var currentDate = _this2.parse(customParsingFormat, view);

        if (currentDate === null) {
          return true;
        }

        if ($attrs.maxDate) {
          var parsedMaxDate = _this2.$parse($attrs.maxDate)($scope);
          /* istanbul ignore else */


          if (parsedMaxDate) {
            var maxDate = luxon_1.DateTime.fromISO(parsedMaxDate);
            /* istanbul ignore else */

            if (maxDate.isValid) {
              return luxon_1.DateTime.fromISO(currentDate) <= maxDate;
            } else {
              _this2.$log.warn("DateParserDirective: maxDate argument for date validation is not in ISO format: ".concat(parsedMaxDate));
            }
          } else {
            if (parsedMaxDate !== null) {
              _this2.$log.warn("DateParserDirective: maxDate argument for date validation cannot be parsed: ".concat($attrs.maxDate));
            }
          }
        }

        return true;
      };
    }
  }]);

  return DateParserDirective;
}();

exports.default = DateParserDirective;
DateParserDirective.directiveName = 'kpDateParser';

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DEFAULT_DATE_FORMATS = ['d.L.y', 'dd.L.y', 'd.LL.y', 'dd.LL.y'];
var DEFAULT_VIEW_FORMAT = 'd.L.y';
/**
 * @ngdoc provider
 * @module kpDateParser
 * @name dateParserServiceProvider
 *
 * @description
 * Provider for {@link directive:kpDateParser} directive providing default settings.
 */

var DateParserProvider =
/*#__PURE__*/
function () {
  function DateParserProvider() {
    _classCallCheck(this, DateParserProvider);

    this.formats = DEFAULT_DATE_FORMATS;
    this.viewFormat = DEFAULT_VIEW_FORMAT;
  }
  /**
   * @ngdoc method
   * @name dateParserServiceProvider#clearDateFormatsPipeline
   *
   * @description
   * Clear parsing pipeline.
   */


  _createClass(DateParserProvider, [{
    key: "clearDateFormatsPipeline",
    value: function clearDateFormatsPipeline() {
      this.formats = [];
    }
    /**
     * @ngdoc method
     * @name dateParserServiceProvider#setFormatsPipelineToDefault
     *
     * @description
     * Roll back parsing pipes to default values
     */

  }, {
    key: "setFormatsPipelineToDefault",
    value: function setFormatsPipelineToDefault() {
      this.formats = DEFAULT_DATE_FORMATS;
    }
    /**
     * @ngdoc method
     * @name dateParserServiceProvider#pushNewFormatToPipeline
     *
     * @param {string} format New format to push
     *
     * @description
     * Add new format to parsing pipeline
     */

  }, {
    key: "pushNewFormatToPipeline",
    value: function pushNewFormatToPipeline(format) {
      this.formats.push(format);
    }
    /**
     * @ngdoc method
     * @name dateParserServiceProvider#setViewDefaultFormat
     *
     * @param {string} format New default view format
     *
     * @description
     * Set default view format
     */

  }, {
    key: "setViewDefaultFormat",
    value: function setViewDefaultFormat(format) {
      this.viewFormat = format;
    }
  }, {
    key: "$get",
    value: function $get() {
      var _this = this;

      return {
        /**
         * @ngdoc method
         * @name dateParserService#getParsingPipeline
         *
         * @returns {string[]}
         *
         * @description
         * Returns parsing formats
         */
        getParsingPipeline: function getParsingPipeline() {
          return _this.formats.slice();
        },

        /**
         * @ngdoc method
         * @name dateParserService#getViewFormat
         *
         * @returns {string}
         *
         * @description
         * Returns default view format
         */
        getViewFormat: function getViewFormat() {
          return _this.viewFormat;
        }
      };
    }
  }]);

  return DateParserProvider;
}();

exports.default = DateParserProvider;
DateParserProvider.providerName = 'dateParserService';

/***/ })
/******/ ]);
});