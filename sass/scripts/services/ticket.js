angular
  .module('khe')
  .factory('Ticket', ['$http', function ($http) {

    var Ticket = function () {

      /**
      * Create a new ticket
      * @param ticket {subject: String, body: String, replyTo: String, name: String}
      */
      this.create = function (ticket) {
        var req = {
          method: 'POST',
          url: config.api + '/tickets',
          data: ticket
        };
        return $http(req);
      };

    };

    return Ticket;

  }]);