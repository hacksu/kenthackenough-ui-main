angular
    .module('khe')
    .directive('midiKeyboard', ['$compile', function($compile) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '../views/directives/midi-keyboard.html',

            link: function(scope, element, attrs) {
                
                var keyMaps = {
                    65: "#B0",
                    66: "#C1",
                    67: "#C#1",
                    68: "#D1",
                    69: "#D#1",
                    70: "#E1",
                    71: "#F1",
                    72: "#F#1",
                    73: "#G1",
                    74: "#G#1",
                    75: "#A1",
                    76: "#A#1",
                    77: "#B1",
                    78: "#C2",
                    79: "#C#2",
                    80: "#D2",
                    81: "#D#2",
                    82: "#E2",
                    83: "#F2",
                    84: "#F#2",
                    85: "#G2",
                    86: "#G#2",
                    87: "#A2",
                    88: "#A#2",
                    89: "#B2",
                    90: "#C3"
                };
                
                jQuery(element).bind("keydown", function(event) {
                        console.log("event.which", event.keycode, event.which);
                        scope.$apply(function (){
                            element[0](keyMaps[event.which]).addClass("pressed");
                            //console.log("element(keyMaps[event.which])", element[0](keyMaps[event.which]));
                        });
        
                        //event.preventDefault();
                });
                
                $compile(element)(scope);

            }
        };
    }]);