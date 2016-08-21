/**
 * Provides requestAnimationFrame in a cross browser way.
 * @author paulirish / http://paulirish.com/
 */
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
                var time = 0;
                window.setTimeout(function() {callback(time); time+=1000 / 60;} , 1000 / 60);
            };
    })();
}


/*
  Function for drawing a wave
  Color - A string. Color of the line. Accepts 'rgb(255,255,255)'' or '#FFFFFF'
  Speed - Speed that the line is drawn across the screen
  Height - The height of half a period relative to the canvas height. '2' would make a curve that fills the entire canvas in one full period
  offset - periods to offset by. Probably a decimal ex: '0.25'.
  leftToRight [NOT READY YET]-  boolean. True will draw the line left to right. False: right to left
*/


function Waves(element, speed) {
    this.canvas = element;
    this.context = this.canvas.getContext('2d');
    this.canvas.width = this.canvas.width * 4;
    this.canvas.height = this.canvas.height * 4;
    this.dt = 0;
    this.last = -1;

    this.stroke = 4;
    this.periods = 4;
}

Waves.prototype.resize = function resize() {

}

Waves.prototype.animate = function animate(timestamp) {
    this.dt = this.dt + 1;
    var height = this.canvas.height/2;
    if (!this.drawWave('#D21C5A', 9, 2, 0.62, this.dt)) { //Check to see if the slowest wave (Pink) is done drawing
        // done
        /*document.getElementById('logo').style.opacity = 1; //fade in logo
        var fading_elements = document.getElementsByClassName('fade');
        setTimeout(function() { //Fade in everything else
            for (var i = 0; i < fading_elements.length; ++i) {
                fading_elements[i].style.opacity = '1';
            }
        }, 500);*/
    }
    else {
        this.drawWave('#4D7ABD', 10, 8, 0.25, this.dt) //Blue
        this.drawWave('#F7961D', 11, 4, 0, this.dt); //Orange
        requestAnimationFrame(this.animate.bind(this));
    }
    this.last = this.dt;
}

Waves.prototype.getY = function getY(x, periods, height, offset) {
    x = x + (offset * this.canvas.width / (this.periods / 2));
    return Math.sin((periods * 2) * (x / this.canvas.width) * Math.PI) * (this.canvas.height - this.stroke) / height + this.canvas.height / 2;
}

Waves.prototype.getX = function getX(step, speed) {
    return (step*speed);
}

Waves.prototype.drawWave = function drawWave(color, speed, waveHeight, offset, step) {
    //Whoa math!
    var width = this.canvas.width;
    var prevX = this.getX(step-1, speed);
    var prevY = this.getY(prevX, this.periods, waveHeight, offset);
    var x = this.getX(step, speed);
    var y = this.getY(x, this.periods, waveHeight, offset);

    if (x > this.canvas.width) {
        x = this.canvas.width;
        y = this.getY(x, this.periods, waveHeight, offset);
    }

    //Draw those sexy curves ;)
    this.context.beginPath();
    this.context.lineWidth = this.stroke;
    this.context.strokeStyle = color;
    this.context.moveTo(x, y);
    this.context.lineTo(prevX, prevY);
    this.context.closePath();
    this.context.stroke();
    if (x == this.canvas.width) {
        return false;
    }
    return true;
}

angular
.module('khe')
.directive('waves', ['$compile', "$window", function ($compile, $window) {


    return {

        restrict: 'E',
        template: '<canvas id="waves"></canvas>',
        link: function (scope, element, attrs) {
            var waves = new Waves(element[0].childNodes[0], 1);
            waves.animate(0);
            element[0].onresize = function() {
                waves.resize();
             };
            angular.element($window).bind('resize', function() {
                waves.resize();
            });
            $compile(element.contents())(scope);

        }
    };
}
]);