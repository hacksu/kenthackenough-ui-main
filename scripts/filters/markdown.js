angular
  .module('khe')
  .filter('markdown', function () {
    return function (input) {
    	console.log("original", input);
      return marked(input || '');
    };
  });