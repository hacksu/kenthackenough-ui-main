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
function drawWave(context, color, speed, height, offset, leftToRight, canvas, periods, stroke, dt) {
    //Whoa math!
    var prevX = leftToRight ? ((dt - 1) * speed) : (canvas.width - (dt - 1) * speed);
    var prevY = Math.sin((periods * 2) * (prevX / canvas.width) * Math.PI) * (canvas.height - stroke) / height + canvas.height / 2;
    var x = leftToRight ? (dt * speed) : (canvas.width - dt * speed);
    var y = Math.sin((periods * 2) * (x / canvas.width) * Math.PI) * (canvas.height - stroke) / height + canvas.height / 2;

    //offset
    x = x - (offset * canvas.width / (periods / 2));
    prevX = prevX - (offset * canvas.width / (periods / 2));
    //return before drawing if beyond the width of the canvas
    if (x > canvas.width) {
        return false;
    }
    //Draw those sexy curves ;)
    context.beginPath();
    context.lineWidth = stroke;
    context.strokeStyle = color;
    context.moveTo(x, y);
    context.lineTo(prevX, prevY);
    context.closePath();
    context.stroke();
    return true;
}


angular
.module('khe')
.directive('waves', ['$compile', function ($compile) {

    var canvas, context, dt;
    var stroke = 4;
    var periods = 3;

    function init(element) {
        canvas = element;
        context = canvas.getContext('2d');
        canvas.width = canvas.width * 4;
        canvas.height = canvas.height * 4;
        dt = 0;
    }

    function animate(timestamp) {
        dt = dt + 1;
        if (!drawWave(context, '#D21C5A', 9, 2, 0.62, true, canvas, periods, stroke, dt)) { //Check to see if the slowest wave (Pink) is done drawing
            document.getElementById('logo').style.opacity = 1; //fade in logo
            var fading_elements = document.getElementsByClassName('fade');
            setTimeout(function() { //Fade in everything else
                for (var i = 0; i < fading_elements.length; ++i) {
                    fading_elements[i].style.opacity = '1';
                }
            }, 500);
        }
        else {
            drawWave(context, '#4D7ABD', 10, 8, 0.25, true, canvas, periods, stroke, dt) //Blue
            drawWave(context, '#F7961D', 11, 4, 0, true, canvas, periods, stroke, dt); //Orange
            requestAnimationFrame(animate);
        }
    }


    return {

        restrict: 'E',
        template: '<canvas id="waves"></canvas>',
        link: function (scope, element, attrs) {
            console.log("ran");
            console.log(element[0].childNodes[0])
            init(element[0].childNodes[0]);
            animate();
            $compile(element.contents())(scope);

            console.log("ran");
        }
    };
}
]);