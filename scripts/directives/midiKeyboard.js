angular
    .module('khe')
    .directive('midiKeyboard', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../views/directives/midi-keyboard.html',

            link: function(scope, element, attrs) {

                    $compile(element)(scope);
                
            }
        };
    }]);