/**
 * @ngdoc service
 * @name kpDateParserValidation
 * @module
 *
 * @description
 * Validation service.
 */
/*@ngInject*/
/**
     * @ngdoc method
     * @name kpDateParserValidation#validateDate
     *
     * @param {string=} customViewFormatProvider Custom view format provider passed from directive.
     *
     * @description
     * Function returns validator on valid date.
     */
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
/* istanbul ignore else *//* @formatter:off*/
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
/* @formatter:on*/
/*@ngInject*//**
 * @ngdoc module
 * @name kpDateParser
 * @module kpDateParser
 *
 * @description
 * This module depends on `luxon` library - [https://moment.github.io/luxon/](https://moment.github.io/luxon/)
 *//* https://github.com/moment/luxon/issues/632*/
/* @ts-ignore*/
/**
 * @ngdoc service
 * @module kpDateParser
 * @name kpDateParserService
 */
/**
     * @ngdoc method
     * @name kpDateParserService#getParsingPipeline
     *
     * @returns {string[]}
     *
     * @description
     * Returns parsing pipeline.
     */
/**
     * @ngdoc method
     * @name kpDateParserService#getDefaultModelFormat
     *
     * @returns {string}
     *
     * @description
     * Returns default model format.
     */
/**
     * @ngdoc method
     * @name kpDateParserService#parse
     *
     * @param {string} parsingDate
     * @param {string=} customModelFormatProvider
     * @param {string=} customViewFormatProvider
     *
     * @returns {string} Parsed date in ISO / customModelFormatProvider / defaultModelFormat.
     *
     * @description
     * Function tries to parse date using formats pipeline and if no format matches, it tries to use `customViewFormatProvider` if it is specified.\
     * Then parse date and returns it formatted using `customModelFormatProvider` or if it is not specified, `defaultModelFormat`.
     * If no model format specified it returns ISO format.
     *
     * If no format matches, it returns `null`.
     */
/**
     * @ngdoc method
     * @name kpDateParserService#format
     *
     * @param {string} formattingDate
     * @param {string=} customModelFormatProvider
     * @param {string=} customViewFormatProvider
     *
     * @returns {string} Formatted date in ISO / customViewFormatProvider.
     *
     * @description
     * Function tries to parse date using `customModelFormatProvider` or if it is not specified, `defaultModelFormat`.
     * If no format specified, ISO format is used.
     * Then it is formatted with `customViewFormatProvider` or ISO is used.
     *
     * If parsing is unsuccessful, it returns `null`.
     */
/**
 * @ngdoc provider
 * @module kpDateParser
 * @name kpDateParserServiceProvider
 *
 * @description
 * Provider for {@link directive:kpDateParser} directive providing default settings.
 */
/**
     * @ngdoc method
     * @name kpDateParserServiceProvider#clearDateFormatsPipeline
     *
     * @description
     * Clear parsing pipeline.
     */
/**
     * @ngdoc method
     * @name kpDateParserServiceProvider#setFormatsPipelineToDefault
     *
     * @description
     * Roll back parsing pipes to default values
     */
/**
     * @ngdoc method
     * @name kpDateParserServiceProvider#pushNewFormatToPipeline
     *
     * @param {string} format New format to push
     *
     * @description
     * Add new format to parsing pipeline
     */
/**
     * @ngdoc method
     * @name kpDateParserServiceProvider#setDefaultModelFormat
     *
     * @description
     * Set default model format. If not set, model will be parsed into ISO format of specific format given by {@link directive:kpDateParser}.
     */
/*@ngInject*/
/* istanbul ignore next */
/* istanbul ignore next *//*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/* tslint:disable-next-line:variable-name*/
/*@ngInject*/
/*@ngInject*/
/*@ngInject*/
/* tslint:disable-next-line:variable-name*/