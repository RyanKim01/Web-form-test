app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      }).when('/i-129', {
				// '/i-129/:section'
        templateUrl: 'views/i-129.html',
        controller: 'I129Ctrl'
      }).when('/awards', {
        templateUrl: 'views/awards.html',
        controller: 'AwardsCtrl'
      }).when('/membership', {
        templateUrl: 'views/membership.html',
        controller: 'MembershipCtrl'
      }).when('/critical-employment', {
        templateUrl: 'views/critical-employment.html',
        controller: 'CriticalEmploymentCtrl'
      }).when('/authorship', {
        templateUrl: 'views/authorship.html',
        controller: 'AuthorshipCtrl'
      }).when('/press', {
        templateUrl: 'views/press.html',
        controller: 'PressCtrl'
      }).when('/judging-or-panel', {
        templateUrl: 'views/judging-or-panel.html',
        controller: 'JudgingOrPanelCtrl'
      }).when('/original-contribution', {
        templateUrl: 'views/original-contribution.html',
        controller: 'OriginalContributionCtrl'
      }).when('/prescreening-service', {
        templateUrl: 'views/prescreening-service.html',
        controller: 'PrescreeningServiceCtrl'
      }).when('/review', {
        templateUrl: 'views/review.html',
        controller: 'ReviewCtrl'
      }).when('/export-pdf', {
        templateUrl: 'views/export-pdf.html',
        controller: 'ExportPDFCtrl'
      }).when('/end-review-service', {
        templateUrl: 'views/end-review-service.html',
        controller: 'EndReviewServiceCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
