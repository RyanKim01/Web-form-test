app.service('debounce', ['$timeout', function ($timeout) {
    return function (func, wait, immediate, invokeApply) {
      var timeout, args, context, result;
      function debounce() {
        /* jshint validthis:true */
        context = this;
        args = arguments;
        var later = function () {
          timeout = null;
          if (!immediate) {
            result = func.apply(context, args);
          }
        };
        var callNow = immediate && !timeout;
        if (timeout) {
          $timeout.cancel(timeout);
        }
        timeout = $timeout(later, wait, invokeApply);
        if (callNow) {
          result = func.apply(context, args);
        }
        return result;
      }
      debounce.cancel = function () {
        $timeout.cancel(timeout);
        timeout = null;
      };
      return debounce;
    };
  }])

app.factory('FormDataService', [function () {

  var key = 'FormDataService.formData';
  var hasLocalStorage = Modernizr.localstorage;

  var FormDataService = {
    hasLocalStorage: hasLocalStorage
  };

  /**
   * Expands all properties with keys that contain the string 'date' to a real date
   * @param {object} obj
   * @return {object} formData with dates as real Date objects
   */
  function expandDates (obj) {
    for (var key in obj) {
      if (key.toLowerCase().indexOf('date') > -1) {
        obj[key] = new Date(obj[key]);
      }

      // if (key === 'oldKey') {
      //   obj['newKey'] = obj[key];
      //   delete obj[key];
      // }
    }
    return obj;
  };

  /**
   * Gets the formDate from localStorage
   * @private
   * @return {string|null} formData
   */
  function get () {
    if (hasLocalStorage) {
      return localStorage.getItem(key);
    }
    return null;
  }

  /**
   * Gets the formDate from localStorage
   * @private
   * @param {string} data
   */
  function set (data) {
    if (hasLocalStorage) {
      localStorage.setItem(key, data);
    }
  }

  /**
   * Gets the formDate from localStorage
   * @return {object} formData
   */
  FormDataService.get = function () {
    return expandDates(JSON.parse(get()) || {});
  };

  /**
   * Only saves if the data is different from the previous data
   * @param {object} formData
   * @return {Bool} if the data is different or not (and is thus saved)
   */
  FormDataService.save = function (formData) {
    var previousFormData = get();
    var currentFormData = JSON.stringify(formData);

    if (previousFormData !== currentFormData) {
      set(currentFormData);
      return true;
    }

    return false;
  };

  return FormDataService;
}]);

app.controller('MainController', ['$scope', '$http', 'debounce', 'FormDataService',
  function ($scope, $http, debounce, FormDataService) {
      $scope.step = 1;

      // $scope.livesInEgypt;
      $scope.formData = FormDataService.get();

      $http.get('progress-endpoint/:userid', function (formData) {
          $scope.formData = formData;
      });

      // $scope.onSave = function () {
      //     $http.post('progress-endpoint', { user: $scope.user, formData: $scope.formData }, function (response) {
      //       $scope.isSaved = true;
      //       console.log(response);
      //       if (response.success) {
      //         // show message to user
      //       }
      //     });
      // }

      // $scope.nextStep = function () {
      //   if ($scope.form.$valid) {
      //     console.log('next button clicked');
      //     $scope.step++;
      //   }
      // };
			//
      // $scope.previousStep = function () {
      //     if ($scope.form.$valid) {
      //       console.log('previous button clicked');
      //       if ($scope.step > 1) {
      //       $scope.step--;
      //     }
      //   }
      // };

      $scope.saveProgress = debounce(function () {
        console.log('saveProgress');
        FormDataService.save($scope.formData);
      }, 250);

      $scope.$watch('formData', function () {
        console.log('formData change');
        $scope.saveProgress();
      }, true);


    }]);
