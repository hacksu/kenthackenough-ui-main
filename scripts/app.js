angular
  .module('khe', ['ngCookies', 'btford.socket-io', 'ui.router', 'ngAnimate', 'angularMoment'])
  .constant('angularMomentConfig', {timezone: 'America/New_York'})
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function ($locationProvider, $state, $route) {
    $locationProvider.html5Mode(true);

    // Handle 404s
    $route.otherwise(function ($injector, $location) {
      var state = $injector.get('$state');
      state.go('404');
      return $location.path();
    });
    $state.state('404', {
      templateUrl: '/views/404.html'
    });
  }]);
