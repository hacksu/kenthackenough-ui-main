/**
* Application model
* Connects to the /application part of the API
*/
angular
  .module('khe')
  .factory('Application', ['$http', 'User', function ($http, User) {

    var Application = function () {

      var user = new User();

      this.APPROVED = 'approved';
      this.DENIED = 'denied';
      this.WAITLISTED = 'waitlisted';
      this.PENDING = 'pending';

      /**
      * Submit an application
      * @param application An application object
      * @return An $http promise
      */
      this.submit = function (application) {
        var req = user.authorize({
          method: 'POST',
          url: config.api + '/users/application',
          data: application
        });
        return $http(req);
      };

      /**
      * Get the logged in user with their application
      */
      this.get = function () {
        var req = user.authorize({
          method: 'GET',
          url: config.api + '/users/me/application'
        });
        return $http(req);
      };

      /**
      * Get a user by ID with their application
      * @param id The user's id
      */
      this.getById = function (id) {
        var req = user.authorize({
          method: 'GET',
          url: config.api + '/users/' + id + '/application'
        });
        return $http(req);
      };

      /**
      * Get a list of users with their applications
      */
      this.list = function () {
        var req = user.authorize({
          method: 'GET',
          url: config.api + '/users/application'
        });
        return $http(req);
      };

      /**
      * Update an application
      * @param application An application object
      * @return An $http promise
      */
      this.update = function (application) {
        var req = user.authorize({
          method: 'PATCH',
          url: config.api + '/users/me/application',
          data: application
        });
        return $http(req);
      };

      /**
      * Update a user's application by ID
      * @param id The user's id
      * @param application An application object
      */
      this.updateById = function (id, application) {
        var req = user.authorize({
          method: 'PATCH',
          url: config.api + '/users/' + id + '/application',
          data: application
        });
        return $http(req);
      };

      /**
      * Delete the logged in user's application
      */
      this.delete = function () {
        var req = user.authorize({
          method: 'DELETE',
          url: config.api + '/users/me/application'
        });
        return $http(req);
      };

      /**
      * Delete a user's application by ID
      */
      this.deleteById = function (id) {
        var req = user.authorize({
          method: 'DELETE',
          url: config.api + '/users/' + id + '/application'
        });
        return $http(req);
      };

    };

    return Application;

  }]);