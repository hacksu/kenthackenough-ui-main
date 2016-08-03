angular
  .module('khe')
  .directive('instagram', ['$compile', function ($compile) {

    return {

      restrict: 'E',
      template: '<div id="instagram"></div>',

      link: function (scope, element, attrs) {
        $compile(element.contents())(scope);

        var feed = new Instafeed({
          accessToken: '1523643469.467ede5.ac5cf096b0bf4745a96f0c05f842dfe8',
          get: 'user',
          userId: 1523643469,
          template: '<div class="row post"><div class="small-12 columns"><div class="row"><div class="small-4 columns image"><a href="{{link}}" target="_blank"><img src="{{image}}" alt="{{caption}}"></a></div><div class="small-8 columns meta"><span class="bold">Kent Hack Enough</span><br><a href="https://instagram.com/kenthackenough" target="_blank">@{{model.user.username}}</a><br><br><i class="fa fa-thumbs-up"></i> {{likes}} likes<br><i class="fa fa-comment"></i> {{comments}} comments</div></div><div class="row"><div class="small-12 columns caption">{{caption}}</div></div></div></div><hr>',
          target: 'instagram',
          sortBy: 'most-recent',
          links: true,
          limit: 3,
          resolution: 'thumbnail'
        });
        feed.run();
        setInterval(function () {
          $('#instagram').empty();
          feed.run();
        }, 1000*60*20);
      }

    };

  }]);