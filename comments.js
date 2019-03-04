/* @formatter:off*/
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
/* @formatter:on*/
/*@ngInject*/
/**
     * Convert [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date format to JS {@link Date}.
     * If input is not valid ISO date in string, return original value.
     */
/**
     * Convert string date to JS Date using more formats. If no luck, return `null`.
     */
/* istanbul ignore next */
/**
     * Validates user input if is correct according to parser formats.
     */
/* required validation must be provided by another directive*/
/**
     * Validates if view date is greater then or equal user specified min date.
     */
/* istanbul ignore else */
/* istanbul ignore else */
/**
     * Validates if view date is less then or equal user specified max date.
     */
/* istanbul ignore else */
/* istanbul ignore else *//**
 * @ngdoc module
 * @name kpDateParser
 * @module kpDateParser
 *
 * @description
 * This module depends on `luxon` library - [https://moment.github.io/luxon/](https://moment.github.io/luxon/)
 *//**
 * @ngdoc service
 * @module kpDateParser
 * @name dateParserService
 */
/**
 * @ngdoc provider
 * @module kpDateParser
 * @name dateParserServiceProvider
 *
 * @description
 * Provider for {@link directive:kpDateParser} directive providing default settings.
 */
/**
     * @ngdoc method
     * @name dateParserServiceProvider#clearDateFormatsPipeline
     *
     * @description
     * Clear parsing pipeline.
     */
/**
     * @ngdoc method
     * @name dateParserServiceProvider#setFormatsPipelineToDefault
     *
     * @description
     * Roll back parsing pipes to default values
     */
/**
     * @ngdoc method
     * @name dateParserServiceProvider#pushNewFormatToPipeline
     *
     * @param {string} format New format to push
     *
     * @description
     * Add new format to parsing pipeline
     */
/**
     * @ngdoc method
     * @name dateParserServiceProvider#setViewDefaultFormat
     *
     * @param {string} format New default view format
     *
     * @description
     * Set default view format
     */
/**
             * @ngdoc method
             * @name dateParserService#getParsingPipeline
             *
             * @returns {string[]}
             *
             * @description
             * Returns parsing formats
             */
/**
             * @ngdoc method
             * @name dateParserService#getViewFormat
             *
             * @returns {string}
             *
             * @description
             * Returns default view format
             *//* tslint:disable-next-line:variable-name*/
/* tslint:disable-next-line:variable-name*/
/* tslint:disable-next-line:variable-name*/
/* tslint:disable-next-line:variable-name*/
/* tslint:disable-next-line:variable-name*/