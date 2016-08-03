angular
  .module('khe')
  .config(['$stateProvider', '$urlRouterProvider', function ($state, $router) {
    $router.when('/links', '/info');
    $router.when('/about', '/info');
    $state
      .state('about', {
        url: '/info',
        templateUrl: '/views/about.html',
        controller: 'AboutCtrl as about'
      });
  }])
  .controller('AboutCtrl', ['About', function (About) {

    var view = this;

    var Models = {
      about: new About()
    };

    view.errors = null;
    view.page = {};

    /**
    * Retreive the about page
    */
    function get() {
      Models.about.get().
      success(function (data) {
        view.errors = null;
        view.page = data;
      }).
      error(function (data) {
        view.errors = data.errors;
      });
    }

    /**
    * Connect to sockets and listen for changes to the page
    */
    function listen() {
      // Page created
      Models.about.socket().on('create', function (page) {
        view.page = page;
      });

      // Page updated
      Models.about.socket().on('update', function (page) {
        view.page = page;
      });
    }

    // Initialize the controller
    get();
    listen();

  }]);
