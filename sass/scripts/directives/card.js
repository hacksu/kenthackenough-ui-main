angular
  .module('khe')
  .directive('card', ['$compile', function ($compile) {

    return {

      restrict: 'E',
      template: '<img src="/img/king_of_spades.svg" id="card" class="wow rotateInDownLeft animated float-left">',

      link: function (scope, element, attrs) {
        $compile(element.contents())(scope);

        jQuery(document).ready(function ($) {

          new WOW({offset: 200}).init();

        });
      }

    };

  }]);