app.controller('I129Ctrl', ['$scope', '$http', 'JSONModelsService', '$routeParams', '$location',
	function ($scope, $http, JSONModelsService, $routeParams, $location) {

		var formData = {};
		var baseUrl = '/i-129/';

		$scope.group = [];
		$scope.groups = [];
		$scope.sections = [];
		$scope.fields = [];


		console.log($location)

		$scope.respone = [];

		function updateUI() {
			$scope.group = $scope.response.data.groups[$routeParams.section - 1];
		}

		//below is basically equivalent to routing
		JSONModelsService.get(['test', 'Valid Passport'])
		.then(function (response) {
			$scope.response = response;
			updateUI();
		});

		$scope.nextStep = function () {
			if ($scope.form.$valid) {
				console.log('next button clicked');
				$location.path(baseUrl + ($routeParams.section + 1));
			}
		};

		console.log($scope.group);

	}]);
