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

		$scope.onSave = function () {
			// $.ajax({
			// 	type:"POST",
			// 	beforeSend: function (request){
			// 		//your token is here
			// 		request.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr("content"));
			// 	},
			// 	url: "http://localhost:3000/documents",
			// 	dataType : 'json',
			// 	success : function(response) {
			// 		console.log(response)
			// 	}
			// });


				$http.post('http://localhost:3000/documents', { user: $scope.user, formData: $scope.formData }, function (response) {
					$scope.isSaved = true;
					console.log(response);
					if (response.success) {
						console.log("It has been successfully saved!")
					}
				});
		}

		$scope.nextStep = function () {
			if ($scope.form.$valid) {
				console.log('next button clicked');
				$routeParams.section++;
				$location.path(baseUrl + ($routeParams.section));
			}
		};

		$scope.previousStep = function () {
		    if ($scope.form.$valid) {
		      console.log('previous button clicked');
		      if ($routeParams.section > 1) {
						$routeParams.section--;
						$location.path(baseUrl + ($routeParams.section));
		    }
		  }
		};

		console.log($scope.group);

	}]);
