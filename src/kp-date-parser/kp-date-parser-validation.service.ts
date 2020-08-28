import {KpDateParserService} from './kp-date-parser.provider';
import {DateTime} from 'luxon';
import {ILogService} from 'angular';

/**
 * @ngdoc service
 * @name kpDateParserValidation
 * @module
 *
 * @description
 * Validation service.
 */
export default class KpDateParserValidationService {
    public static readonly serviceName = 'kpDateParserValidationService';

    /*@ngInject*/
    constructor(private kpDateParserService: KpDateParserService, private $log: ILogService) {
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
    public validateDate(customViewFormatProvider?: () => string): ValidatorFunction {
        return (modelValue, viewValue) => {
            if (!viewValue) {
                return true;
            }

            return this.kpDateParserService.parse(viewValue, null, customViewFormatProvider) !== null;
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
    public validateMinDate(minDateInISOProvider: () => string, customViewFormat?: () => string, customModelFormat?: () => string): ValidatorFunction {
        return this.dateRestriction(minDateInISOProvider, customViewFormat, customModelFormat, (currentDate, restrictingDate) => currentDate >= restrictingDate);
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
    public validateMaxDate(maxDateInISOProvider: () => string, customViewFormat?: () => string, customModelFormat?: () => string): ValidatorFunction {
        return this.dateRestriction(maxDateInISOProvider, customViewFormat, customModelFormat, (currentDate, restrictingDate) => currentDate <= restrictingDate);
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
    private dateRestriction(restrictingDateInISOProvider: () => string, customViewFormat: () => string, customModelFormat: () => string, comparator: (currentDate: DateTime, restrictingDate: DateTime) => boolean): ValidatorFunction {
        return (modelValue, viewValue) => {

            if (!restrictingDateInISOProvider()) {
                return true;
            }

            let currentDateInISO: string;

            if (viewValue) {
                currentDateInISO = this.kpDateParserService.parse(viewValue, null, customViewFormat);
            } else if (modelValue) {
                currentDateInISO = DateTime.fromISO(modelValue).toISO() ??
                    DateTime.fromFormat(modelValue, customModelFormat() || this.kpDateParserService.getDefaultModelFormat()).toISO();
            } else {
                return true;
            }

            if (currentDateInISO === null) {
                return true;
            }

            const currentDate = DateTime.fromISO(currentDateInISO);
            const restrictingDate = DateTime.fromISO(restrictingDateInISOProvider());

            /* istanbul ignore else */
            if (restrictingDate.isValid) {
                return comparator(currentDate, restrictingDate);
            } else {
                this.$log.warn(`DateParserDirective: restrictingDate argument for date validation is not in ISO format: ${restrictingDateInISOProvider()}`);
            }

            return true;
        };
    }
}

export type ValidatorFunction = (modelValue: string, viewValue: string) => boolean;
