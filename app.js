(function () {

  'use strict';

  angular.module('myFirstApp', [])

  .controller('MyFirstController',function ($scope) {
    $scope.data = "ritesh";

    $scope.sayHello = function() {
      return $scope.data.toUpperCase();
    };

    $scope.totalCount = function() {
      return $scope.data.toUpperCase().length;
    };

    //Get a list of the unique characters in the given data
    $scope.dict = function() {
      var result = "";
      var i, j, count;
      var len = $scope.totalCount();
      for(i = 0; i < len ; i++) {
        count = 0;
        for(j = 0; j < result.length; j++) {
          if(result.charAt(j) == $scope.data.charAt(i))
            count++;
        }
        if(count == 0)
          result = result + $scope.data.charAt(i);
      }
      return result;
    }

    // Get frequency of every repeated word
    $scope.freq = function() {
      var dict = $scope.dict();
      var dict_len = dict.length;
      var i, j, len;
      var freq = [];
      for(j = 0; j < dict_len ; j++)
        freq[j] = 0;

      len = $scope.totalCount();
      for(i = 0; i<len; i++) {
        for(j = 0; j < dict_len ; j++) {
          if(dict.charAt(j) == $scope.data.charAt(i))
            freq[j] = freq[j] + 1;
        }
      }
      return freq;
    }

  });



}
)();
