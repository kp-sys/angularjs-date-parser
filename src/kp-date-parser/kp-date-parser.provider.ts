import {DateTime, LocalZone} from 'luxon';
import bind from 'bind-decorator';
import {ILogService} from 'angular';
import {Console} from 'inspector';

const ISO_FORMAT_STRING = 'ISO';

const DEFAULT_DATE_FORMATS = [
    'd.L.y',
    'dd.L.y',
    'd.LL.y',
    'dd.LL.y'
];

// https://github.com/moment/luxon/issues/632
function tzIncludingSecondsBugWorkaround(date: DateTime): DateTime {
    if (date) {
        const isoDate = date.toISO();
        const tz: string[] = isoDate.split('T')[1].match(/[+-].*$/);

        if (tz && tz[0] && tz[0] === '+00:57') {
            // @ts-ignore
            const result = isoDate.replace(tz[0], LocalZone.instance.formatOffset(new Date().getTimezoneOffset(), 'short'));
            return DateTime.fromISO(result);
        }
    }

    return date;
}

/**
 * @ngdoc service
 * @module kpDateParser
 * @name kpDateParserService
 */
export interface KpDateParserService {

    /**
     * @ngdoc method
     * @name kpDateParserService#getParsingPipeline
     *
     * @returns {string[]}
     *
     * @description
     * Returns parsing pipeline.
     */
    getParsingPipeline(): string[];

    /**
     * @ngdoc method
     * @name kpDateParserService#getDefaultModelFormat
     *
     * @returns {string}
     *
     * @description
     * Returns default model format.
     */
    getDefaultModelFormat(): string | null;

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
    parse(parsingDate: string, customModelFormatProvider?: () => string, customViewFormatProvider?: () => string): string | null;

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
    format(formattingDate: string, customModelFormatProvider?: () => string, customViewFormatProvider?: () => string): string | null;
}

/**
 * @ngdoc provider
 * @module kpDateParser
 * @name kpDateParserServiceProvider
 *
 * @description
 * Provider for {@link directive:kpDateParser} directive providing default settings.
 */
export default class KpDateParserServiceProvider {
    public static providerName = 'kpDateParserService';

    #parsingPipeline: string[];
    #defaultModelFormat: string;

    #logger: ILogService | Console;

    constructor() {
        this.#parsingPipeline = DEFAULT_DATE_FORMATS;
        this.#logger = console;
    }

    /**
     * @ngdoc method
     * @name kpDateParserServiceProvider#clearDateFormatsPipeline
     *
     * @description
     * Clear parsing pipeline.
     */
    public clearDateFormatsPipeline() {
        this.#parsingPipeline = [];
    }

    /**
     * @ngdoc method
     * @name kpDateParserServiceProvider#setFormatsPipelineToDefault
     *
     * @description
     * Roll back parsing pipes to default values
     */
    public setFormatsPipelineToDefault() {
        this.#parsingPipeline = DEFAULT_DATE_FORMATS;
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
    public pushNewFormatToPipeline(format: string) {
        this.#parsingPipeline.push(format);
    }

    /**
     * @ngdoc method
     * @name kpDateParserServiceProvider#setDefaultModelFormat
     *
     * @description
     * Set default model format. If not set, model will be parsed into ISO format of specific format given by {@link directive:kpDateParser}.
     */
    public setDefaultModelFormat(format: string) {
        this.#defaultModelFormat = format;
    }

    /*@ngInject*/
    protected $get($log: ILogService): KpDateParserService {
        this.#logger = $log;

        return {
            getParsingPipeline: () => this.#parsingPipeline.slice(),

            getDefaultModelFormat: () => this.#defaultModelFormat,

            parse: this.parse,

            format: this.format
        };
    }

    @bind
    private parse(parsingDate: string, customModelFormatProvider?: () => string, customViewFormatProvider?: () => string): string | null {
        if (!parsingDate) {
            return null;
        }

        try {
            let result = {isValid: false};
            const parsingPipeline = this.#parsingPipeline.slice();

            if (customViewFormatProvider && customViewFormatProvider()) {
                parsingPipeline.unshift(customViewFormatProvider());
            }

            const formatsIterator = parsingPipeline[Symbol.iterator]();
            let format = formatsIterator.next();

            while (!result.isValid && !format.done) {
                if (format.value.toUpperCase() === ISO_FORMAT_STRING) {
                    result = DateTime.fromISO(parsingDate);
                } else {
                    result = DateTime.fromFormat(parsingDate, format.value);
                }
                format = formatsIterator.next();
            }

            if (result.isValid) {
                const patchedDateTime = tzIncludingSecondsBugWorkaround(result as DateTime);

                const customModel = customModelFormatProvider ? customModelFormatProvider() : null;

                if (customModel || this.#defaultModelFormat) {
                    return patchedDateTime.toFormat(customModel || this.#defaultModelFormat);
                }

                return patchedDateTime.toISO();
            }
        } catch (e) {
            /* istanbul ignore next */
            this.#logger.debug('DateParserService#parse: ', e);
        }

        return null;
    }

    @bind
    private format(formattingDate: string, customModelFormatProvider?: () => string, customViewFormatProvider?: () => string): string | null {
        if (!formattingDate) {
            return null;
        }

        try {
            let parsedDate: DateTime;

            const customModelFormat = customModelFormatProvider ? customModelFormatProvider() : null;

            if (customModelFormat || this.#defaultModelFormat) {
                parsedDate = DateTime.fromFormat(formattingDate, customModelFormat || this.#defaultModelFormat);
            } else {
                parsedDate = DateTime.fromISO(formattingDate);
            }

            if (customViewFormatProvider && customViewFormatProvider() && customViewFormatProvider().toUpperCase() !== ISO_FORMAT_STRING) {
                return parsedDate.toFormat(customViewFormatProvider());
            }

            return parsedDate.toISO();
        } catch (e) {
            /* istanbul ignore next */
            this.#logger.debug('DateParserService#format: ', e);
        }

        return null;
    }
}
