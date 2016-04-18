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

		var parameter = {
		  "document": {
		    "title": getDocumentTitle(),
		    "data": JSON.stringify($scope.formData),
		    "user_id": $scope.user
		  }
		}

		function updateUI() {
			$scope.group = $scope.response.data.groups[$routeParams.section - 1];
		}

		function getDocumentTitle() {
		 var documentTitle = window.location.hash.match(/\/([a-zA-Z\d\-]*)/)[1]
		 return documentTitle
		}

		//below is basically equivalent to routing
		JSONModelsService.get(['test', 'Valid Passport'])
		.then(function (response) {
			$scope.response = response;
			updateUI();
		});

		$scope.onSave = function () {
			console.log($scope.formData);

		$http.post('http://localhost:3000/documents', parameter) // PASS THE DATA AS THE SECOND PARAMETER
			.success(
					function(success){
							console.log("success")
					})
			.error(
					function(error){
							console.log("error has occurred")
		});


				// $http.post('http://localhost:3000/documents', { user: $scope.user, formData: formData }, function (response) {
				// 	$scope.isSaved = true;
				// 	console.log(response);
				// 	if (response.success) {
				// 		console.log("It has been successfully saved!")
				// 	}
				// });
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
