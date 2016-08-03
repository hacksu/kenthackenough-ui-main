angular
  .module('khe')
  .filter('application', function () {

    var self = this;

    self.name = function (name) {
      if (name) return name;
      return '[name]';
    };

    self.gender = function (gender) {
      if (gender) return gender;
      return '[gender]';
    };

    self.school = function (school) {
      if (school) return school;
      return '[school]';
    };

    self.major = function (major) {
      if (major) return major;
      return '[major]';
    };

    self.phone = function (number) {
      if (number) return number;
      return '[phone]';
    };

    self.shirt = function (abbr) {
      switch (abbr) {
        case 'S':
          return 'small';
        case 'M':
          return 'medium';
        case 'L':
          return 'large';
        case 'XL':
          return 'extra large';
        default:
          return '[size]';
      }
    };

    self.age = function (age) {
      if (age) return age;
      return '[age]';
    };

    self.year = function (year) {
      if (year) return year;
      return '[class]';
    };

    self.first = function (first) {
      if (first === true || first == 'true') return 'is';
      if (first === false || first == 'false') return 'is not';
      return '[is/is not]';
    };

    self.firstv2 = function (first) {
      if (first === true || first == 'true') return 'Yes';
      if (first === false || first == 'false') return 'No';
      return '[yes/no]';
    };

    self.dietary = function (restrictions) {
      if (restrictions && restrictions.length) {
        var diet = restrictions[0];
        for (var i = 1; i < restrictions.length; i++) {
          diet = diet + ', ' + restrictions[i];
        }
        return diet;
      }
      return 'None';
    };

    self.link = function (link) {
      if (link) return link;
      return '[link]';
    };

    self.travel = function (travel) {
      if (travel === true || travel == 'true') return 'Yes';
      return 'No';
    };

    self.going = function (going) {
      if (going === true) {
        return 'Going';
      } else {
        return 'Not Going';
      }
    };

    return function (input, fn) {
      return self[fn](input);
    };

  });