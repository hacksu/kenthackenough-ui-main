angular
  .module('khe')
  .config(['$stateProvider', function ($state) {
    $state
      .state('schedule', {
        url: '/schedule',
        templateUrl: '/views/schedule.html',
        controller: 'ScheduleCtrl as schedule'
      });
  }])
  .controller('ScheduleCtrl', ['Event', function (Event) {

    var view = this;

    var Models = {
      event: new Event()
    };

    view.events = {

      all: [],
      days: {},

      /**
      * Retreive a list of all events
      */
      get: function () {
        var self = this;
        Models.event.list().
        success(function (data) {
          self.all = data.events;
          self.refresh();
        }).
        error(function (data) {
          view.errors = data.errors;
        });
      },

      /**
      * Connect to sockets and listen for changes to the schedule
      */
      listen: function () {
        var self = this;
        // Event created
        Models.event.socket().on('create', function (event) {
          self.all.push(event);
          self.refresh();
        });

        // Event updated
        Models.event.socket().on('update', function (event) {
          self.all = self.all.map(function (e) {
            if (e._id == event._id) e = event;
            return e;
          });
          self.refresh();
        });

        // Event deleted
        Models.event.socket().on('delete', function (event) {
          self.all = self.all.filter(function (e) {
            return e._id != event._id;
          });
          self.refresh();
        });
      },

      /**
      * Reload the lists
      */
      refresh: function () {
        var self = this;
        // sort events
        self.all = self.all.sort(function (a, b) {
          if (a.start > b.start) return 1;
          if (a.start < b.start) return -1;
          return 0;
        });
        // split out by day
        var days = [
          'Sunday', 'Monday',
          'Tuesday', 'Wednesday',
          'Thursday', 'Friday',
          'Saturday'
        ];
        for (var i = 0; i < self.all.length; i++) {
          var day = new Date(self.all[i].start).getDay();
          if (self.all[i].start == self.all[i].end) {
            self.all[i].singleTime = true; // only display the start time
          }
          if (self.days[days[day]]) {
            self.days[days[day]].push(self.all[i]);
          } else {
            self.days[days[day]] = [self.all[i]];
          }
        }
      }

    };

    // Initialize the controller
    view.events.get();
    view.events.listen();

  }]);
