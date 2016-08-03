angular
  .module('khe')
  .factory('News', ['$http', 'User', function ($http, User) {

    var News = function () {

      var self = this;
      var user = new User();

      /**
      * Add an email to the list
      * @param email An email address
      */
      this.create = function (email) {
        var req = {
          method: 'POST',
          url: config.api + '/news',
          data: {
            email: email
          }
        };
        return $http(req);
      };

      /**
      * Get an email by id
      * @param id
      */
      this.get = function (id) {
        var req = user.authorize({
          method: 'GET',
          url: config.api + '/news/' + id
        });
        return $http(req);
      };

      /**
      * Get a list of emails
      */
      this.list = function () {
        var req = user.authorize({
          method: 'GET',
          url: config.api + '/news'
        });
        return $http(req);
      };

      /**
      * Delete an email from the list
      * @param id
      */
      this.delete = function (id) {
        var req = user.authorize({
          method: 'DELETE',
          url: config.api + '/news/' + id
        });
        return $http(req);
      };

    };

    return News;

  }]);