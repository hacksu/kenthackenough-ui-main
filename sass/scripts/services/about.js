angular
  .module('khe')
  .factory('About', ['$http', 'socketFactory', function ($http, socket) {

    var About = function () {

      var self = this;

      /**
      * A socket connected to /about
      */
      var connection;
      this.socket = function () {
        if (!connection) {
          var s = io.connect(config.api + '/about');
          connection = socket({ioSocket: s});
        }
        return connection;
      };

      /**
      * Retreive the about page
      * @return An $http promise
      */
      self.get = function () {
        var req = {
          method: 'GET',
          url: config.api + '/about'
        };
        return $http(req);
      };

    };

    return About;

  }]);