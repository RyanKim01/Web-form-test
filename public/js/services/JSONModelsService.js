app.factory('JSONModelsService', ['$http', function ($http) {
	var JSONModelsService = {};

	JSONModelsService.get = function (pathArr) {
		var path = _.map(pathArr, function (pathPart, index) {
			pathPart = encodeURIComponent(pathPart);
			if (index === (pathArr.length - 1)) {
				return pathPart + '.json';
			} else {
				return pathPart + '/';
			}
		}).join('');
		return $http.get('/JSONModels/' + path);
	};

	return JSONModelsService;
}]);
