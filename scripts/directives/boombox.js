angular
  .module('khe')
  .directive('boombox', ['$compile', function ($compile) {

    return {

      restrict: 'E',
      replace: true,
      template: '<img src="img/boombox.svg" id="boombox" class="wow slideInRight animated" data-wow-duration="2s">',

      link: function (scope, element, attrs) {
        $compile(element.contents())(scope);

        jQuery(document).ready(function ($) {

          new WOW({offset: 200}).init();

        });
      }

    };

  }]);