angular
  .module('khe')
  .directive('schoolDatalist', [function () {

    return {

      restrict: 'E',
      templateUrl: '/views/directives/school-datalist.html'

    };

  }]);