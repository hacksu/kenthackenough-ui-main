/**
* User model
* Connects to the /users part of the API
* Also stores user locally via cookies
*/
angular
  .module('khe')
  .factory('User', ['$http', '$cookieStore', '$filter', 'socketFactory', '$location', function ($http, $cookies, $filter, socket, $location) {

    var User = function () {

      /**
      * A socket connected to /users
      */
      var connection;
      this.socket = function () {
        if (!connection) {
          var me = this.getMe();
          var encoded = $filter('base64Encode')(me.key + ':' + me.token);
          var s = io.connect(config.api + '/users', {
            query: 'authorization=' + encoded
          });
          connection = socket({ioSocket: s});
        }
        return connection;
      };

      /**
      * Store the user locally
      * @param me An object representing the logged-in user
      *           {key: String, token: String, role: String, refresh: String, expires: Date}
      */
      this.setMe = function (me) {
        if (Modernizr.localstorage) {
          localStorage.setItem('me', angular.toJson(me));
        } else {
          $cookies.put('me', me);
        }
      };

      /**
      * Retrieve the logged in user from local storage
      * @return {key: String, token: String, role: String, refresh: String, expires: Date}
      */
      this.getMe = function () {
        if (Modernizr.localstorage) {
          return angular.fromJson(localStorage.getItem('me'));
        } else {
          return $cookies.get('me');
        }
      };

      /**
      * Delete the stored user
      */
      this.removeMe = function () {
        var req = this.authorize({
          method: 'DELETE',
          url: config.api + '/users/token',
          data: {
            client: config.client
          }
        });
        $http(req).
        success(function () {}).
        error(function () {});
        if (Modernizr.localstorage) {
          localStorage.removeItem('me');
        } else {
          $cookies.remove('me');
        }
      };

      /**
      * Refresh the user's token if necessary.
      * If the user's token doesn't need refreshed, the callback is called
      * immediately.
      * @param callback (Optional) called when finished
      */
      var self = this;
      function refreshToken(callback) {
        var me = self.getMe();
        if (!me || !me.key || !me.expires || !me.refresh) {
          $location.path('/');
          return;
        }
        var time = new Date(me.expires).getTime() - (1000 * 60 * 60 * 24);
        if (Date.now() > time) {
          var req = {
            method: 'POST',
            url: config.api + '/users/token/refresh',
            data: {
              key: me.key,
              client: config.client,
              refresh: me.refresh
            }
          };
          $http(req).
          success(function (data) {
            me.key = data.key;
            me.token = data.token;
            me.refresh = data.refresh;
            me.expires = data.expires;
            self.setMe(me);
            return callback && callback();
          }).
          error(function (data) {
            // make them log in again
            self.removeMe();
            $location.path('/');
          });
        } else {
          return callback && callback();
        }
      }

      /**
      * Adds authorization headers to a request object
      * @param req A request object to authorize
      * @return The request object with auth headers attached
      */
      this.authorize = function (req) {
        refreshToken();
        var me = this.getMe();
        if (me) {
          var encoded = $filter('base64Encode')(me.key + ':' + me.token);
          var ext = {
            headers: {
              'Authorization': 'Basic ' + encoded
            }
          };
          angular.extend(req, ext);
        }
        return req;
      };

      /**
      * Register a user
      * @param user {email: String, password: String}
      * @return An $http promise
      */
      this.register = function (user) {
        var req = {
          method: 'POST',
          url: config.api + '/users',
          data: {
            client: config.client,
            email: user.email,
            password: user.password
          }
        };
        return $http(req);
      };

      /**
      * Quickly create a new user
      * @param user {name: String, email: String, phone: String}
      * @return An $http promise
      */
      this.quick = function (user) {
        var req = this.authorize({
          method: 'POST',
          url: config.api + '/users/quick',
          data: {
            name: user.name,
            email: user.email,
            phone: user.phone
          }
        });
        return $http(req);
      };

      /**
      * Login a user
      * @param user {email: String, password: String}
      * @return An $http promise
      */
      this.login = function (user) {
        var req = {
          method: 'POST',
          url: config.api + '/users/token',
          data: {
            email: user.email,
            password: user.password,
            client: config.client
          }
        };
        return $http(req);
      };

      /**
      * Return a list of all users (staff and admins only)
      * @return An $http promise
      */
      this.list = function () {
        var req = this.authorize({
          method: 'GET',
          url: config.api + '/users'
        });
        return $http(req);
      };

      /**
      * Get a user by ID
      * @param id The user's id
      */
      this.get = function (id) {
        var req = this.authorize({
          method: 'GET',
          url: config.api + '/users/' + id
        });
        return $http(req);
      };

      /**
      * Update the logged in user
      * @param user {email: String, password: String}
      */
      this.update = function (user) {
        var req = this.authorize({
          method: 'PATCH',
          url: config.api + '/users',
          data: user
        });
        return $http(req);
      };

      /**
      * Partially update a user
      * @param id The user's id
      * @param update The object to use for updating
      */
      this.updateById = function (id, update) {
        var req = this.authorize({
          method: 'PATCH',
          url: config.api + '/users/' + id,
          data: update
        });
        return $http(req);
      };


      /**
      * Completely delete a user
      * @param userId The ID of the user to delete
      * @return An $http promise
      */
      this.delete = function (userId) {
        var req = this.authorize({
          method: 'DELETE',
          url: config.api + '/users/' + userId
        });
        return $http(req);
      };

      /**
      * Recover a password
      * @param email An email address
      */
      this.recover = function (email) {
        var req = {
          method: 'POST',
          url: config.api + '/users/reset',
          data: {
            email: email
          }
        };
        return $http(req);
      };

    };

    return User;

  }]);