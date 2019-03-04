import {DateTime} from 'luxon';
import {IAttributes, ILogService, INgModelController, IParseService, IScope} from 'angular';
import {DateParserService} from './kp-date-parser.provider';

// @formatter:off
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
// @formatter:on
export default class DateParserDirective {
    public static directiveName = 'kpDateParser';

    public restrict = 'A';
    public require = 'ngModel';
    public priority = 100;

    /*@ngInject*/
    constructor(private $parse: IParseService, private $log: ILogService, private dateParserService: DateParserService) {
    }

    public link($scope: IScope, $element, $attrs: IAttributes, ngModelController: INgModelController) {
        ngModelController.$parsers.push(this.parse.bind(this));

        const viewFormat = $attrs.viewFormat || this.dateParserService.getViewFormat();
        ngModelController.$formatters.push(this.fromISOToFormattedDate(viewFormat));

        ngModelController.$validators.date = this.validateInput.bind(this);
        ngModelController.$validators.minDate = this.validateMinDate($scope, $attrs).bind(this);
        ngModelController.$validators.maxDate = this.validateMaxDate($scope, $attrs).bind(this);

        $scope.$watchGroup([$attrs.minDate, $attrs.maxDate], () => ngModelController.$validate());
    }

    /**
     * Convert [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date format to JS {@link Date}.
     * If input is not valid ISO date in string, return original value.
     */
    private fromISOToFormattedDate(viewFormat: string): (isoDate: string) => string {
        return (isoDate) => {
            const dateTime = DateTime.fromISO(isoDate);

            if (typeof isoDate === 'string' && dateTime.isValid) {
                return dateTime.toFormat(viewFormat);
            }

            return isoDate;
        };
    }

    /**
     * Convert string date to JS Date using more formats. If no luck, return `null`.
     */
    private parse(date: string): string {
        if (!date) {
            return null;
        }

        try {
            let result = {isValid: false};

            const dateFormats = this.dateParserService.getParsingPipeline();
            const formatsIterator = dateFormats[Symbol.iterator]();
            let format = formatsIterator.next();

            while (!result.isValid && !format.done) {
                result = DateTime.fromFormat(date, format.value);
                format = formatsIterator.next();
            }

            if (result.isValid) {
                return (result as DateTime).toISO();
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
    private validateInput(model: string, view: string): boolean {
        // required validation must be provided by another directive
        if (!view) {
            return true;
        }

        return this.parse(view) !== null;
    }

    /**
     * Validates if view date is greater then or equal user specified min date.
     */
    private validateMinDate($scope: IScope, $attrs: IAttributes): (model: string, view: string) => boolean {
        return (model, view) => {
            const currentDate = this.parse(view);
            if (currentDate === null) {
                return true;
            }

            if ($attrs.minDate) {
                const parsedMinDate = this.$parse($attrs.minDate)($scope);

                /* istanbul ignore else */
                if (parsedMinDate) {
                    const minDate = DateTime.fromISO(parsedMinDate);

                    /* istanbul ignore else */
                    if (minDate.isValid) {
                        return minDate <= DateTime.fromISO(currentDate);
                    } else {
                        this.$log.warn(`DateParserDirective: minDate argument for date validation is not in ISO format: ${parsedMinDate}`);
                    }
                } else {
                    if (parsedMinDate !== null) {
                        this.$log.warn(`DateParserDirective: minDate argument for date validation cannot be parsed: ${$attrs.minDate}`);
                    }
                }
            }

            return true;
        };
    }

    /**
     * Validates if view date is less then or equal user specified max date.
     */
    public validateMaxDate($scope: IScope, $attrs: IAttributes): (model: string, view: string) => boolean {
        return (model, view) => {
            const currentDate = this.parse(view);
            if (currentDate === null) {
                return true;
            }

            if ($attrs.maxDate) {
                const parsedMaxDate = this.$parse($attrs.maxDate)($scope);

                /* istanbul ignore else */
                if (parsedMaxDate) {
                    const maxDate = DateTime.fromISO(parsedMaxDate);

                    /* istanbul ignore else */
                    if (maxDate.isValid) {
                        return DateTime.fromISO(currentDate) <= maxDate;
                    } else {
                        this.$log.warn(`DateParserDirective: maxDate argument for date validation is not in ISO format: ${parsedMaxDate}`);
                    }
                } else {
                    if (parsedMaxDate !== null) {
                        this.$log.warn(`DateParserDirective: maxDate argument for date validation cannot be parsed: ${$attrs.maxDate}`);
                    }
                }
            }

            return true;
        };
    }
}
