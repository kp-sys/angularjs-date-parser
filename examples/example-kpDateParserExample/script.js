(function(angular) {
  'use strict';
angular.module('kpDateParserExample', ['ngMessages', 'kpDateParser'])
    .controller('ctrl', function Controller() {

        this.getNow = function() {
            return new Date().toISOString();
        }
    });
})(window.angular);