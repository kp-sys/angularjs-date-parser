import register from '@kpsys/angularjs-register';
import {DateTime, Settings} from 'luxon';

import dateParserModule from './../dist/angularjs-date-parser';

import DemoController from './demo.controller';

Settings.defaultLocale = DateTime.local().resolvedLocaleOpts().locale;

register('demo', [dateParserModule])
    .controller(DemoController.controllerName, DemoController);
