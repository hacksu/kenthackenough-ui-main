angular
  .module('khe')
  .config(['$stateProvider', function ($state) {
    $state
      .state('home', {
        url: '/',
        templateUrl: '/views/home.html',
        controller: 'HomeCtrl as home'
      });
  }])
  .controller('HomeCtrl', ['User', 'News', 'Ticket', 'Application', 'Message', '$location', "$cookieStore", function (User, News, Ticket, Application, Message, $location, $cookieStore) {

    var view = this;

    var Models = {
      user: new User(),
      news: new News(),
      ticket: new Ticket(),
      application: new Application(),
      message: new Message()
    };
    if ($cookieStore.get("visited")) {
        document.getElementById('logo').style.opacity = 1; //fade in logo
        var fading_elements = document.getElementsByClassName('fade');
        for (var i = 0; i < fading_elements.length; ++i) {
            fading_elements[i].style.opacity = '1';
        }
        view.wavesDone = function () {
            console.log("wave done but not doing anything");
        }
    } else {
        view.wavesDone = function () {
            document.getElementById('logo').style.opacity = 1; //fade in logo
            var fading_elements = document.getElementsByClassName('fade');
            setTimeout(function() { //Fade in everything else
                for (var i = 0; i < fading_elements.length; ++i) {
                    fading_elements[i].style.opacity = '1';
                }
            }, 500);
        };
        $cookieStore.put("visited", true);
    }

    view.user = Models.user.getMe();

    /**
    * Allow for RSVP if the user has already submitted an application.
    */
    function getApplication() {
      if (view.user) {
        Models.application.get().
        success(function (data) {
          if (data.application) {
            view.application = data.application;
          }
        }).
        error(function (data) {
        });
      }
    }
    getApplication();

    view.person = {

      email: null,
      password: null,
      errors: null,

      /**
      * Register a new user
      */
      register: function () {
        var self = this;
        Models.user.register({
          email: self.email,
          password: self.password
        }).
        success(function (data) {
          self.errors = null;
          self.email = '';
          self.password = '';
          Models.user.setMe(data);
          view.user = Models.user.getMe();
          console.log(data);
          $location.path('/apply');
        }).
        error(function (data) {
          console.log(data);
          if (data) {
            self.errors = data.errors || ['An internal error has occurred'];
          } else {
            self.errors = ["Can't connect"];
          }
        });
      },

      /**
      * Login a user
      */
      login: function () {
        var self = this;
        Models.user.login({
          email: self.email,
          password: self.password
        }).
        success(function (data) {
          self.email = null;
          self.password = null;
          Models.user.setMe(data);
          view.user = Models.user.getMe();
          getApplication();
        }).
        error(function (data) {
          if (data) {
            self.errors = data.errors || ['An internal error has occurred'];
          } else {
            self.errors = ["Can't connect"];
          }
        });
      },

      /**
      * Logout
      */

      clear: function () {
        view.login = false;
        view.loginRegister = false;
        this.errors = null;
      },

      logout: function () {
        Models.user.removeMe();
        view.user = Models.user.getMe();
        this.clear();
      },

    };

    view.apply = {

      toggleGoing: function () {
        view.application.going = (view.application.going) ? false : true;
        Models.application.update(view.application).
        success(function (data) {
          view.application = data.application;
        }).
        error(function (data) {
          view.errors = data.errors;
        });
      }

    };

    //  Functionality related to mailing list
    view.mail = {

      email: null,
      errors: null,
      successes: null,

      add: function () {
        var self = this;
        Models.news.create(self.email).
        success(function (data) {
          self.errors = null;
          self.success = ['Thanks, you\'ll be hearing from us soon!'];
          self.email = null;
        }).
        error(function (data) {
          self.errors = ['That email is already in use.'];
          self.successes = null;
          self.email = null;
        });
      }

    };

    // functionality to create a ticket.
    view.contact = {

      new: {},

      successes: null,
      errors: null,

      submit: function () {
        var self = this;
        Models.ticket.create(self.new).
        success(function (data) {
          self.errors = null;
          self.successes = ['Thank you, one of our organizers will reach out to you soon!'];
          self.new = {};
        }).
        error(function (data) {
          self.errors = data.errors;
          self.successes = null;
        });
      }

    };

  }]);
