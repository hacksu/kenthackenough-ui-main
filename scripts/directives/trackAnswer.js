angular
  .module('khe')
  .directive('trackAnswer', ['$compile', function ($compile) {

    return {

      restrict: 'E',
      template: '<div class="track-answer></div>',

      link: function (scope, element, attrs) {
        $compile(element.contents())(scope);

      }

    };

  }]);