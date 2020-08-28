import register from '@kpsys/angularjs-register';
import DateParserDirective from './kp-date-parser.directive';
import KpDateParserServiceProvider from './kp-date-parser.provider';
import KpDateParserValidationService from './kp-date-parser-validation.service';

/**
 * @ngdoc module
 * @name kpDateParser
 * @module kpDateParser
 *
 * @description
 * This module depends on `luxon` library - [https://moment.github.io/luxon/](https://moment.github.io/luxon/)
 */

export default register('kpDateParser')
    .provider(KpDateParserServiceProvider.providerName, KpDateParserServiceProvider)
    .service(KpDateParserValidationService.serviceName, KpDateParserValidationService)
    .directive(DateParserDirective.directiveName, DateParserDirective)
    .name();
