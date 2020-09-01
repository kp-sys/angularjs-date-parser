import {DateTime} from 'luxon/src/luxon';
import directivesModule from './kp-date-parser.module';
import KpDateParserServiceProvider, {KpDateParserService} from './kp-date-parser.provider';
import KpDateParserValidationService from './kp-date-parser-validation.service';
import angular = require('angular');

describe('kp-date-parser directive', () => {
    let $compile;
    let $scope;

    function compileElement<T = HTMLElement>(template: string): T {
        const element = angular.element(template);
        const compiledElement = $compile(element)($scope);
        $scope.$apply();
        return compiledElement[0];
    }

    function compileAndReturnInputRef(template: string): HTMLInputElement {
        const el = compileElement(template);
        return el.querySelector('input');
    }

    function changeInputValue(input: HTMLElement, value: string) {
        angular.element(input).val(value);
        angular.element(input).triggerHandler('change');
    }

    describe('provider & service', () => {
        it('should have default values', () => {
            angular.mock.module(directivesModule);

            inject((kpDateParserService) => {

                expect(kpDateParserService.getParsingPipeline()).toEqual(['d.L.y', 'dd.L.y', 'd.LL.y', 'dd.LL.y']);
            });

        });

        it('should clear parsing pipeline', () => {
            angular.mock.module(directivesModule, (kpDateParserServiceProvider) => {
                kpDateParserServiceProvider.clearDateFormatsPipeline();
            });

            inject((kpDateParserService) => {
                expect(kpDateParserService.getParsingPipeline()).toEqual([]);
            });
        });

        it('should add new format', () => {
            angular.mock.module(directivesModule, (kpDateParserServiceProvider) => {
                kpDateParserServiceProvider.clearDateFormatsPipeline();
                kpDateParserServiceProvider.pushNewFormatToPipeline('a.B.c');
            });

            inject((kpDateParserService) => {
                expect(kpDateParserService.getParsingPipeline()).toEqual(['a.B.c']);
            });
        });

        it('should restore defaults', () => {
            angular.mock.module(directivesModule, (kpDateParserServiceProvider) => {
                kpDateParserServiceProvider.clearDateFormatsPipeline();
                kpDateParserServiceProvider.setFormatsPipelineToDefault();
            });

            inject((kpDateParserService) => {
                expect(kpDateParserService.getParsingPipeline()).toEqual(['d.L.y', 'dd.L.y', 'd.LL.y', 'dd.LL.y']);
            });
        });

        it('should parse to ISO', () => {
            angular.mock.module(directivesModule);

            inject(/*@ngInject*/ (kpDateParserService: KpDateParserService) => {
                expect(kpDateParserService.parse('12.5.1992')).toEqual(DateTime.fromFormat('12.5.1992', 'd.L.y').toISO());
            });
        });

        it('should parse to custom model value', () => {
            angular.mock.module(directivesModule);

            inject(/*@ngInject*/ (kpDateParserService: KpDateParserService) => {
                expect(kpDateParserService.parse('3.5.1992', () => 'dd.LL.yy')).toEqual('03.05.92');
            });
        });

        it('should parse to default model value provided by provider', () => {
            angular.mock.module(directivesModule, /*@ngInject*/ (kpDateParserServiceProvider: KpDateParserServiceProvider) => kpDateParserServiceProvider.setDefaultModelFormat('dd.LL.yy'));

            inject(/*@ngInject*/ (kpDateParserService: KpDateParserService) => {
                expect(kpDateParserService.parse('3.5.1992')).toEqual('03.05.92');
            });
        });

        it('should parse to custom model and override default value provided by provider', () => {
            angular.mock.module(directivesModule, /*@ngInject*/ (kpDateParserServiceProvider: KpDateParserServiceProvider) => kpDateParserServiceProvider.setDefaultModelFormat('dd.LL.yy'));

            inject(/*@ngInject*/ (kpDateParserService: KpDateParserService) => {
                expect(kpDateParserService.parse('3.5.1992', () => 'y')).toEqual('1992');
            });
        });

        it('should parse view by custom view format', () => {
            angular.mock.module(directivesModule);

            inject(/*@ngInject*/ (kpDateParserService: KpDateParserService) => {
                expect(kpDateParserService.parse('1992', () => 'dd.LL.y', () => 'y')).toEqual('01.01.1992');
            });
        });

        it('should format model from ISO to ISO', () => {
            angular.mock.module(directivesModule);

            inject(/*@ngInject*/ (kpDateParserService: KpDateParserService) => {
                expect(kpDateParserService.format(DateTime.fromFormat('12.5.1992', 'd.L.y').toISO())).toEqual(DateTime.fromFormat('12.5.1992', 'd.L.y').toISO());
            });
        });

        it('should format model from default model format provided by provider to ISO', () => {
            angular.mock.module(directivesModule, /*@ngInject*/ (kpDateParserServiceProvider: KpDateParserServiceProvider) => kpDateParserServiceProvider.setDefaultModelFormat('dd.LL.yy'));

            inject(/*@ngInject*/ (kpDateParserService: KpDateParserService) => {
                expect(kpDateParserService.format('12.05.1992')).toEqual(DateTime.fromFormat('12.5.1992', 'd.L.y').toISO());
            });
        });

        it('should format model from custom model format to ISO', () => {
            angular.mock.module(directivesModule);

            inject(/*@ngInject*/ (kpDateParserService: KpDateParserService) => {
                expect(kpDateParserService.format('12.05.1992', () => 'dd.LL.yy')).toEqual(DateTime.fromFormat('12.5.1992', 'd.L.y').toISO());
            });
        });

        it('should override default model format by custom model format and convert it to ISO', () => {
            angular.mock.module(directivesModule, /*@ngInject*/ (kpDateParserServiceProvider: KpDateParserServiceProvider) => kpDateParserServiceProvider.setDefaultModelFormat('dd.LL.yy'));

            inject(/*@ngInject*/ (kpDateParserService: KpDateParserService) => {
                expect(kpDateParserService.format('3.5.1992', () => 'd.L.y')).toEqual(DateTime.fromFormat('3.5.1992', 'd.L.y').toISO());
            });
        });

        it('should format model from custom model format to ISO', () => {
            angular.mock.module(directivesModule);

            inject(/*@ngInject*/ (kpDateParserService: KpDateParserService) => {
                expect(kpDateParserService.format('02.05.92', () => 'dd.LL.yy', () => 'd.L.y')).toEqual('2.5.1992');
            });
        });
    });

    describe('directive', () => {

        beforeEach(() => {
            angular.mock.module(directivesModule);

            // tslint:disable-next-line:variable-name
            inject((_$compile_, _$rootScope_) => {
                $compile = _$compile_;
                $scope = _$rootScope_;
            });
        });

        it('should have kp-date-parser directive', inject((kpDateParserDirective) => {
            expect(kpDateParserDirective).toBeDefined();
        }));

        it('should parse all default date formats', () => {
            $scope.model = '';
            const input = compileElement('<input type="text" ng-model="model" kp-date-parser>');
            const isoDate = DateTime.fromISO('2018-03-05').toISO();
            const datesToTry = ['5.3.2018', '05.3.2018', '5.03.2018', '05.03.2018'];

            for (const date of datesToTry) {
                changeInputValue(input, date);

                expect($scope.model).toBe(isoDate);
            }
        });

        it('should parse date to custom model format', () => {
            $scope.model = '';
            const input = compileElement(`<input type="text" ng-model="model" kp-date-parser kp-date-parser-model-format="'dd.LL.yy'">`);

            changeInputValue(input, '2.3.1990');

            expect($scope.model).toBe('02.03.90');
        });

        it('should format view to custom view format', () => {
            $scope.model = '05.05.05';

            const input = compileElement<HTMLInputElement>(`<input type="text" ng-model="model" kp-date-parser kp-date-parser-model-format="'dd.LL.yy'" kp-date-parser-view-format="'y'">`);

            expect(input.value).toBe('2005');
        });

        it('should format view to special view format - ’ISO’', () => {
            $scope.model = '05.05.05';

            const input = compileElement<HTMLInputElement>(`<input type="text" ng-model="model" kp-date-parser kp-date-parser-model-format="'dd.LL.yy'" kp-date-parser-view-format="'iso'">`);

            expect(input.value).toBe(DateTime.fromFormat('05.05.05', 'dd.LL.yy').toISO());
        });
    });

    describe('validation service', () => {

        it('should validate date', () => {
            angular.mock.module(directivesModule);

            inject(/*@ngInject*/ (kpDateParserValidationService: KpDateParserValidationService) => {

                let isValid = kpDateParserValidationService.validateDate()(null, '10.03.1990');
                expect(isValid).toBeTrue();

                isValid = kpDateParserValidationService.validateDate()(null, '10.03.');
                expect(isValid).toBeFalse();

                isValid = kpDateParserValidationService.validateDate(() => 'dd.LL.')(null, '10.03.');
                expect(isValid).toBeTrue();
            });
        });

        it('should validate minDate', () => {
            angular.mock.module(directivesModule);

            inject(/*@ngInject*/ (kpDateParserValidationService: KpDateParserValidationService) => {

                let isValid = kpDateParserValidationService.validateMinDate(() => '1990-03-10')(null, '10.03.1990');
                expect(isValid).toBeTrue();

                isValid = kpDateParserValidationService.validateMinDate(() => '1990-03-10')(null, '09.03.1990');
                expect(isValid).toBeFalse();

                isValid = kpDateParserValidationService.validateMinDate(() => '1990-03-10')(null, '11.03.1990');
                expect(isValid).toBeTrue();
            });

        });

        it('should validate maxDate', () => {
            angular.mock.module(directivesModule);

            inject(/*@ngInject*/ (kpDateParserValidationService: KpDateParserValidationService) => {

                let isValid = kpDateParserValidationService.validateMaxDate(() => '1990-03-10')(null, '10.03.1990');
                expect(isValid).toBeTrue();

                isValid = kpDateParserValidationService.validateMaxDate(() => '1990-03-10')(null, '11.03.1990');
                expect(isValid).toBeFalse();

                isValid = kpDateParserValidationService.validateMaxDate(() => '1990-03-10')(null, '09.03.1990');
                expect(isValid).toBeTrue();
            });

        });

    });

    describe('validations', () => {

        beforeEach(() => {
            angular.mock.module(directivesModule);

            // tslint:disable-next-line:variable-name
            inject((_$compile_, _$rootScope_) => {
                $compile = _$compile_;
                $scope = _$rootScope_;
            });
        });

        it('should validate by max-date', () => {
            const template = `
				<form name="form">
					<input type="text" name="date" ng-model="date" kp-date-parser max-date="'2018-03-15'">
				</form>
			`;

            const input = compileAndReturnInputRef(template);
            expect($scope.form.date.$valid).toBe(true);

            changeInputValue(input, '16.3.2018');
            expect($scope.form.date.$valid).toBe(false);
            expect($scope.form.date.$error).toEqual({maxDate: true});
        });

        it('should validate by min-date', () => {
            const template = `
				<form name="form">
					<input type="text" name="date" ng-model="date" kp-date-parser min-date="'2018-03-15'">
				</form>
			`;

            const input = compileAndReturnInputRef(template);

            changeInputValue(input, '16.3.2018');
            expect($scope.form.date.$valid).toBe(true);

            changeInputValue(input, '14.3.2018');
            expect($scope.form.date.$valid).toBe(false);
            expect($scope.form.date.$error).toEqual({minDate: true});
        });

        it('should not validate by max-date', () => {
            const template = `
						<form name="form">
							<input type="text" name="date" ng-model="date" kp-date-parser max-date="null">
						</form>
					`;

            const input = compileAndReturnInputRef(template);

            changeInputValue(input, '14.3.2018');
            expect($scope.form.date.$valid).toBe(true);

            changeInputValue(input, '16.3.2018');
            expect($scope.form.date.$valid).toBe(true);
        });

        it('should not validate by min-date', () => {
            const template = `
						<form name="form">
							<input type="text" name="date" ng-model="date" kp-date-parser min-date="null">
						</form>
					`;

            const input = compileAndReturnInputRef(template);

            changeInputValue(input, '16.3.2018');
            expect($scope.form.date.$valid).toBe(true);

            changeInputValue(input, '14.3.2018');
            expect($scope.form.date.$valid).toBe(true);
        });

        it('should react on min-date validation change', () => {
            $scope.minDate = '2018-03-15T00:00:00';

            const template = `
				<form name="form">
					<input type="text" name="date" ng-model="date" kp-date-parser min-date="minDate">
				</form>
			`;

            const input = compileAndReturnInputRef(template);

            changeInputValue(input, '16.3.2018');
            expect($scope.form.date.$valid).toBe(true);

            $scope.minDate = '2018-03-18';
            $scope.$apply();

            expect($scope.form.date.$valid).toBe(false);
            expect($scope.form.date.$error).toEqual({minDate: true});

        });

        it('should react on max-date validation change', () => {
            $scope.maxDate = '2018-03-15T00:00:00';

            const template = `
				<form name="form">
					<input type="text" name="date" ng-model="date" kp-date-parser max-date="maxDate">
				</form>
			`;

            const input = compileAndReturnInputRef(template);

            changeInputValue(input, '14.3.2018');
            expect($scope.form.date.$valid).toBe(true);

            $scope.maxDate = '2018-03-13T00:00:00';
            $scope.$digest();

            expect($scope.form.date.$valid).toBe(false);
            expect($scope.form.date.$error.maxDate).toBe(true);

        });
    });
});
