angular
  .module('khe')
  .config(['$stateProvider', function ($state) {
    $state
      .state('account', {
        url: '/account',
        templateUrl: '/views/account/edit.html',
        controller: 'AccountCtrl as acc'
      })
      .state('recover', {
        url: '/recover',
        templateUrl: '/views/account/recover.html',
        controller: 'AccountCtrl as acc'
      });
  }])
  .controller('AccountCtrl', ['User', '$location', function (User, $location) {

    var view = this;

    var Models = {
      user: new User()
    };

    view.user = Models.user.getMe();

    if (view.user) {
      Models.user.get(view.user.key).
      success(function (data) {
        view.originalUser = data;
        view.person.email = data.email;
      }).
      error(function (data) {
        view.errors = data.errors;
      });
    }

    view.person = {

      email: null,
      password: null,

      successes: null,
      errors: null,

      /**
      * Update the user's account
      */
      update: function () {
        var self = this;
        Models.user.update({
          email: self.email,
          password: self.password
        }).
        success(function (data) {
          console.log("we got", data);

          self.successe = true;
          if (self.password) {
            self.logout();
          }
        }).
        error(function (data) {
          console.log("we had an error");
          self.errors = data.errors || ['An internal error has occurred'];
        });
      },

      /**
      * Logout
      */
      logout: function () {
        Models.user.removeMe();
        view.user = Models.user.getMe();
      }

    };

    view.recover = {

      email: null,

      errors: null,
      successes: null,

      submit: function () {
        var self = this;
        Models.user.recover(self.email).
        success(function (data) {
          self.email = null;
          self.successe = true;
        }).
        error(function (data) {
          self.email = null;
          self.successe = false;
          self.errors = data.errors;
        });
      }

    };

  }]);
