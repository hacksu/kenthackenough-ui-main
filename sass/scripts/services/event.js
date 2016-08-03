angular
  .module('khe')
  .factory('Event', ['$http', 'socketFactory', function ($http, socket) {

    var Event = function () {

      var self = this;

      /**
      * A socket connected to /events
      */
      var connection;
      this.socket = function () {
        if (!connection) {
          var s = io.connect(config.api + '/events');
          connection = socket({ioSocket: s});
        }
        return connection;
      };

      /**
      * Get a list of events
      * @return An $http promise
      */
      self.list = function () {
        var req = {
          method: 'GET',
          url: config.api + '/events'
        };
        return $http(req);
      };

      /**
      * Get an event by id
      * @param id The event id
      * @return An $http promise
      */
      self.get = function (id) {
        var req = {
          method: 'GET',
          url: config.api + '/events/' + id
        };
        return $http(req);
      };

    };

    return Event;

  }]);