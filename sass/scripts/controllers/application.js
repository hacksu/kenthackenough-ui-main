angular
  .module('khe')
  .config(['$stateProvider', '$urlRouterProvider', function ($state, $url) {
    $url.when('/apply', '/apply/1');
    $url.when('/apply/', '/apply/1');
    $state
      .state('apply', {
        url: '/apply',
        templateUrl: '/views/application/application.html',
        controller: 'ApplicationCtrl as application'
      })
        .state('apply.page1', {
          url: '/1',
          templateUrl: '/views/application/page1.html'
        })
        .state('apply.page2', {
          url: '/2',
          templateUrl: '/views/application/page2.html'
        })
        .state('apply.page3', {
          url: '/3',
          templateUrl: '/views/application/page3.html'
        })
        .state('apply.page4', {
          url: '/4',
          templateUrl: '/views/application/page4.html'
        });
  }])
  .controller('ApplicationCtrl', ['$scope', '$location', '$filter', 'User', 'Application', function ($scope, $location, $filter, User, Application) {

    var self = this;
    var user = new User();
    var application = new Application();

    // Get the logged in user if it exists
    self.me = user.getMe();

    /**
    * Open and close form inputs
    */
    $scope.display = {};

    $scope.open = function (field) {
      $scope.display.blinds = true;
      $scope.display[field] = true;
    };

    $scope.closeAll = function () {
      $scope.display = {};
    };

    /**
    * An object with an array of possible dietary restrictions,
    * an array of selected restrictions, and a function to toggle a
    * selection.
    */
    self.diet = {
      possible: [
        'Vegetarian',
        'Vegan',
        'Kosher',
        'Gluten Free',
        'Other'
      ],
      selected: [],
      toggleSelection: function (restriction) {
        var idx = this.selected.indexOf(restriction);
        if (idx > -1) {
          this.selected.splice(idx, 1);
        } else {
          this.selected.push(restriction);
        }
      }
    };

    /**
    * Pre-populate the form if the user has already submitted
    * an application.
    */
    application.get().
    success(function (data) {
      if (data.application) {
        angular.extend(self, data.application);
        self.first = String(self.first);
        self.travel = String(self.travel);
        if (self.dietary) self.diet.selected = self.dietary;
        self.phone = $filter('formatPhone')(self.phone);
        self.submitted = true;
      } else {
        self.submitted = false;
      }
    }).
    error(function (data) {
      self.errors = data.errors || ['An internal error occurred'];
    });

    /**
    * Submit or update the user's application
    */
    self.submit = function () {
      // make a string of dietary restrictions
      var restrictions = null;
      if (self.diet.selected.length) {
        restrictions = '';
        for (var i = 0; i < self.diet.selected.length; ++i) {
          restrictions += self.diet.selected[i] + '|';
        }
        restrictions = restrictions.substr(0, restrictions.length - 1);
      }

      // build the application object
      var phone = (self.phone) ? self.phone.replace(/\D/g,'') : '';
      var app = {
        name: self.name,
        school: self.school,
        phone: phone,
        shirt: self.shirt,
        demographic: self.demographic,
        first: self.first,
        year: self.year,
        age: self.age,
        gender: self.gender,
        major: self.major,
        conduct: self.conduct,
        travel: self.travel,
        waiver: self.waiver,
        resume: self.resume,
        link: self.link
      };
      if (restrictions) {
        angular.extend(app, {dietary: restrictions});
      }

      // submit the application
      if (self.submitted) {
        application.update(app).
        success(function (data) {
          $location.path('/');
        }).
        error(function (data) {
          self.errors = data.errors || ['An internal error occurred'];
        });
      } else {
        application.submit(app).
        success(function (data) {
          console.log(data);
          $location.path('/');
        }).
        error(function (data) {
          self.errors = data.errors || ['An internal error occurred'];
        });
      }
    };

  }]);
