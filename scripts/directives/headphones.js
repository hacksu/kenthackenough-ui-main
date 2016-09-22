angular
  .module('khe')
  .directive('headphones', ['$compile', function ($compile) {

    return {

      restrict: 'E',
      template: '<img src="img/headphones.svg" id="headphones" class="wow slideInLeft animated" data-wow-duration="2s">',

      link: function (scope, element, attrs) {
        $compile(element.contents())(scope);

        jQuery(document).ready(function ($) {

          new WOW({offset: 400}).init();

        });
      }

    };

  }]);