angular
  .module('khe')
  .factory('Message', ['$http', 'socketFactory', function ($http, socket) {

    var Message = function () {

      var self = this;

      /**
      * A socket connected to /messages
      */
      var connection;
      this.socket = function () {
        if (!connection) {
          var s = io.connect(config.api + '/messages');
          connection = socket({ioSocket: s});
        }
        return connection;
      };

      /**
      * Get a list of messages
      * @return An $http promise
      */
      self.list = function () {
        var req = {
          method: 'GET',
          url: config.api + '/messages'
        };
        return $http(req);
      };

      /**
      * Get a message by id
      * @param id The message id
      * @return An $http promise
      */
      self.get = function (id) {
        var req = {
          method: 'GET',
          url: config.api + '/messages/' + id
        };
        return $http(req);
      };

    };

    return Message;

  }]);