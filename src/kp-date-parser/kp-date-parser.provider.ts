const DEFAULT_DATE_FORMATS = [
    'd.L.y',
    'dd.L.y',
    'd.LL.y',
    'dd.LL.y'
];
const DEFAULT_VIEW_FORMAT = 'd.L.y';

/**
 * @ngdoc service
 * @module kpDateParser
 * @name dateParserService
 */
export interface DateParserService {
    getParsingPipeline(): string[];
    getViewFormat(): string;
}

/**
 * @ngdoc provider
 * @module kpDateParser
 * @name dateParserServiceProvider
 *
 * @description
 * Provider for {@link directive:kpDateParser} directive providing default settings.
 */
export default class DateParserProvider {
    public static providerName = 'dateParserService';

    private formats: string[];
    private viewFormat: string;

    constructor() {
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
    public clearDateFormatsPipeline(): void {
        this.formats = [];
    }

    /**
     * @ngdoc method
     * @name dateParserServiceProvider#setFormatsPipelineToDefault
     *
     * @description
     * Roll back parsing pipes to default values
     */
    public setFormatsPipelineToDefault(): void {
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
    public pushNewFormatToPipeline(format: string): void {
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
    public setViewDefaultFormat(format: string): void {
        this.viewFormat = format;
    }

    public $get(): DateParserService {
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
            getParsingPipeline: () => {
                return this.formats.slice();
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
            getViewFormat: () => {
                return this.viewFormat;
            }
        };
    }

}
