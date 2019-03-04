import register from '@kpsys/angularjs-register';
import DateParserDirective from './kp-date-parser.directive';
import DateParserProvider from './kp-date-parser.provider';

/**
 * @ngdoc module
 * @name kpDateParser
 * @module kpDateParser
 *
 * @description
 * This module depends on `luxon` library - [https://moment.github.io/luxon/](https://moment.github.io/luxon/)
 */

export default register('kpDateParser')
    .provider(DateParserProvider.providerName, DateParserProvider)
    .directive(DateParserDirective.directiveName, DateParserDirective)
    .name();
