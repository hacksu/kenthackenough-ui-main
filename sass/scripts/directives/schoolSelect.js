angular
  .module('khe')
  .directive('schoolSelect', [function () {

    return {

      restrict: 'E',
      templateUrl: '/views/directives/school-select.html',
      scope: {
        model: '=ngModel'
      }

    };

  }]);