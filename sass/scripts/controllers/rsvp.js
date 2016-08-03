angular
  .module('khe')
  .config(['$stateProvider', function ($state) {
    $state
      .state('rsvp', {
        url: '/rsvp',
        templateUrl: '/views/account/rsvp.html',
        controller: 'RsvpCtrl as ctrl'
      });
  }])
  .controller('RsvpCtrl', ['User', 'Application', function (User, Application) {

    var view = this;

    var Models = {
      user: new User(),
      application: new Application()
    };

    view.rsvp = function () {
      Models.user.login({
        email: view.email,
        password: view.password
      }).
      success(function (data) {
        view.email = null;
        view.password = null;
        Models.user.setMe(data);
        Models.application.get().
        success(function (data) {
          var application = data.application;
          application.going = true;
          Models.application.update(application).
          success(function (data) {
            view.success = true;
            view.name = application.name.split(' ')[0];
          }).
          error(function (data) {
            view.errors = data.errors;
          });
        }).
        error(function (data) {
          view.errors = data.errors;
        });
      }).
      error(function (data) {
        view.errors = data.errors || ['An internal error has occurred'];
      });
    };

  }]);
