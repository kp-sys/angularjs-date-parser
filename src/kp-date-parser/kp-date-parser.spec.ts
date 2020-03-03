import {DateTime} from 'luxon/src/luxon';
import directivesModule from './kp-date-parser.module';
import angular = require('angular');

describe('kp-date-parser directive', () => {
    let $compile;
    let $scope;

    function compileElement(template) {
        const element = angular.element(template);
        const compiledElement = $compile(element)($scope);
        $scope.$digest();
        return compiledElement;
    }

    function compileAndReturnInputRef(template) {
        const el = compileElement(template);
        return angular.element(el[0].querySelector('input'));
    }

    function changeInputValue(input, value) {
        input.val(value);
        input.triggerHandler('change');
    }

    describe('provider & service', () => {

        it('should have default values', () => {
            angular.mock.module(directivesModule);

            inject((dateParserService) => {

                expect(dateParserService.getParsingPipeline()).toEqual(['d.L.y', 'dd.L.y', 'd.LL.y', 'dd.LL.y']);
                expect(dateParserService.getViewFormat()).toBe('d.L.y');
            });

        });

        it('should clear parsing pipeline', () => {
            angular.mock.module(directivesModule, (dateParserServiceProvider) => {
                dateParserServiceProvider.clearDateFormatsPipeline();
            });

            inject((dateParserService) => {
                expect(dateParserService.getParsingPipeline()).toEqual([]);
            });
        });

        it('should add new format', () => {
            angular.mock.module(directivesModule, (dateParserServiceProvider) => {
                dateParserServiceProvider.clearDateFormatsPipeline();
                dateParserServiceProvider.pushNewFormatToPipeline('a.B.c');
            });

            inject((dateParserService) => {
                expect(dateParserService.getParsingPipeline()).toEqual(['a.B.c']);
            });
        });

        it('should restore defaults', () => {
            angular.mock.module(directivesModule, (dateParserServiceProvider) => {
                dateParserServiceProvider.clearDateFormatsPipeline();
                dateParserServiceProvider.setFormatsPipelineToDefault();
            });

            inject((dateParserService) => {
                expect(dateParserService.getParsingPipeline()).toEqual(['d.L.y', 'dd.L.y', 'd.LL.y', 'dd.LL.y']);
            });
        });

        it('should change view format', () => {
            angular.mock.module(directivesModule, (dateParserServiceProvider) => {
                dateParserServiceProvider.setViewDefaultFormat('a.B.c');
            });

            inject((dateParserService) => {
                expect(dateParserService.getViewFormat()).toEqual('a.B.c');
            });
        });
    });

    describe('default directive behaviour', () => {

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

        it('should validate input by default validation and with ng-required', () => {

            const template = `
				<form name="form">
					<input type="text" name="date" ng-model="date" ng-required="true" kp-date-parser>
				</form>
			`;

            const input = compileAndReturnInputRef(template);

            expect($scope.form.date.$valid).toBe(false);
            expect($scope.form.date.$error.required).toBe(true);

            changeInputValue(input, '15.3.2018');

            expect($scope.form.date.$valid).toBe(true);

            changeInputValue(input, '1c5.3.2018');

            expect($scope.form.date.$valid).toBe(false);
            expect($scope.form.date.$error.date).toBe(true);
        });
    });

    describe('additional validations', () => {

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
					<input type="text" name="date" ng-model="date" kp-date-parser max-date="'2018-03-15T00:00:00'">
				</form>
			`;

            const input = compileAndReturnInputRef(template);

            changeInputValue(input, '14.3.2018');
            expect($scope.form.date.$valid).toBe(true);

            changeInputValue(input, '16.3.2018');
            expect($scope.form.date.$valid).toBe(false);
            expect($scope.form.date.$error.maxDate).toBe(true);
        });

        it('should validate by min-date', () => {
            const template = `
				<form name="form">
					<input type="text" name="date" ng-model="date" kp-date-parser min-date="'2018-03-15T00:00:00'">
				</form>
			`;

            const input = compileAndReturnInputRef(template);

            changeInputValue(input, '16.3.2018');
            expect($scope.form.date.$valid).toBe(true);

            changeInputValue(input, '14.3.2018');
            expect($scope.form.date.$valid).toBe(false);
            expect($scope.form.date.$error.minDate).toBe(true);
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

            $scope.minDate = '2018-03-18T00:00:00';
            $scope.$digest();

            expect($scope.form.date.$valid).toBe(false);
            expect($scope.form.date.$error.minDate).toBe(true);

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

    describe('custom view format', () => {

        beforeEach(() => {
            angular.mock.module(directivesModule);

            // tslint:disable-next-line:variable-name
            inject((_$compile_, _$rootScope_) => {
                $compile = _$compile_;
                $scope = _$rootScope_;
            });
        });

        it('should change view format by specified format in template', () => {
            $scope.date = '2018-03-15T00:00:00';

            const input = compileElement(`<input type="text" ng-model="date" kp-date-parser view-format="dd/LL/yy">`);

            const viewValue = input.val();

            expect(viewValue).toBe('15/03/18');
        });
    });

    describe('provider -> directive', () => {

        it('should parse date before year 1891', () => {

            angular.mock.module(directivesModule, (dateParserServiceProvider) => {
                dateParserServiceProvider.pushNewFormatToPipeline('y');
            });

            // tslint:disable-next-line:variable-name
            inject((_$compile_, _$rootScope_) => {
                $compile = _$compile_;
                $scope = _$rootScope_;
            });

            $scope.model = '';
            const input = compileElement('<input type="text" ng-model="model" kp-date-parser>');
            const year = DateTime.fromISO('1018-03-05').year;
            const date = '1018';

            changeInputValue(input, date);

            expect(DateTime.fromISO($scope.model).year).toBe(year);

        });


        it('should parse added format via provider', () => {
            angular.mock.module(directivesModule, (dateParserServiceProvider) => {
                dateParserServiceProvider.pushNewFormatToPipeline('dd.LL.y HH:mm');
            });

            // tslint:disable-next-line:variable-name
            inject((_$compile_, _$rootScope_) => {
                $compile = _$compile_;
                $scope = _$rootScope_;
            });

            const input = compileElement(`<input type="text" ng-model="date" kp-date-parser>`);

            changeInputValue(input, '15.03.2018 11:45');

            expect($scope.date).toMatch(/^2018-03-15T11:45:00/);
        });

        it('should set default view format', () => {
            angular.mock.module(directivesModule, (dateParserServiceProvider) => {
                dateParserServiceProvider.setViewDefaultFormat('dd/LL/yy');
            });

            // tslint:disable-next-line:variable-name
            inject((_$compile_, _$rootScope_) => {
                $compile = _$compile_;
                $scope = _$rootScope_;
            });

            $scope.date = '2018-03-15T00:00:00';

            const input = compileElement(`<input type="text" ng-model="date" kp-date-parser>`);

            const viewValue = input.val();

            expect(viewValue).toBe('15/03/18');
        });
    });
});
