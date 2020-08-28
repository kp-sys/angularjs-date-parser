import {IAttributes, INgModelController, IParseService, IScope} from 'angular';
import {KpDateParserService} from './kp-date-parser.provider';
import KpDateParserValidationService from './kp-date-parser-validation.service';

// @formatter:off
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
export default class DateParserDirective {
    public static readonly directiveName = 'kpDateParser';

    private static readonly MODEL_FORMAT_ATTRIBUTE = 'kpDateParserModelFormat';
    private static readonly VIEW_FORMAT_ATTRIBUTE = 'kpDateParserViewFormat';

    private static readonly MIN_VALIDATION_ATTRIBUTE = 'minDate';
    private static readonly MAX_VALIDATION_ATTRIBUTE = 'maxDate';

    public restrict = 'A';
    public require = 'ngModel';

    /*@ngInject*/
    constructor(private $parse: IParseService, private kpDateParserService: KpDateParserService, private kpDateParserValidationService: KpDateParserValidationService) {
    }

    public link($scope: IScope, $element, $attrs: IAttributes, ngModelController: INgModelController) {
        let customModelFormat: string = null;
        let customViewFormat: string = null;
        let minValidationDate: string = null;
        let maxValidationDate: string = null;

        const refreshAttributes = () => {
            customModelFormat = this.$parse($attrs[DateParserDirective.MODEL_FORMAT_ATTRIBUTE])($scope);
            customViewFormat = this.$parse($attrs[DateParserDirective.VIEW_FORMAT_ATTRIBUTE])($scope);

            minValidationDate = this.$parse($attrs[DateParserDirective.MIN_VALIDATION_ATTRIBUTE])($scope);
            maxValidationDate = this.$parse($attrs[DateParserDirective.MAX_VALIDATION_ATTRIBUTE])($scope);
        };

        ngModelController.$formatters.push((modelValue) => this.kpDateParserService.format(modelValue, () => customModelFormat, () => customViewFormat));
        ngModelController.$parsers.push((viewValue) => this.kpDateParserService.parse(viewValue, () => customModelFormat, () => customViewFormat));

        ngModelController.$validators.date = this.kpDateParserValidationService.validateDate(() => customViewFormat);
        ngModelController.$validators.minDate = this.kpDateParserValidationService.validateMinDate(() => minValidationDate, () => customViewFormat, () => customModelFormat);
        ngModelController.$validators.maxDate = this.kpDateParserValidationService.validateMaxDate(() => maxValidationDate, () => customViewFormat, () => customModelFormat);

        $scope.$watchGroup([$attrs[DateParserDirective.MIN_VALIDATION_ATTRIBUTE], $attrs[DateParserDirective.MAX_VALIDATION_ATTRIBUTE]], () => {
            refreshAttributes();
            ngModelController.$validate();
        });

        $scope.$watchGroup([$attrs[DateParserDirective.MODEL_FORMAT_ATTRIBUTE], $attrs[DateParserDirective.VIEW_FORMAT_ATTRIBUTE]], () => {
            refreshAttributes();
            ngModelController.$processModelValue();
        });
    }
}
