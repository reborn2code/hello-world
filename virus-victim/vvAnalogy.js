(function(){

'use strict';

angular.module('vvAnalogy', [])

.controller('vvBuildHeap',function ($scope, vvDataInput, vvHeapOps) {

  //Converting the input string into an Array
  $scope.vvInputArray = function() {
    return $scope.vvInputString.split(",");
  };

  $scope.vvGenerateDict = function () {
    $scope.vvDictWithFreq = vvDataInput.iiGetFrequency($scope.vvInputString);

  }; //end of vvGenerateDict()

  //Building Min-Heap using the input Array
  $scope.vvInput2Heap = function () {
    //var hhHeapIn = $scope.vvInputString.split(",");
    var hhHeapIn = vvDataInput.iiGetFrequency($scope.vvInputString);
    var hhHeapOut = vvHeapOps.hhBuildMinHeap(hhHeapIn);
    $scope.vvHeapArray = hhHeapOut;


    //$scope.vvHeapMin = hhGetHeapMinimum(hhHeapOut);
    //var hhHeapExtracted = hhExtractHeapMinimum(hhHeapOut);

    //hhPrintHeap(hhHeapExtracted);

    //inserting new node in Heap.
    //var hhHeapWithInsertion = hhInsertHeap(hhHeapExtracted, $scope.vvInputNode);

    //hhPrintHeap(hhHeapWithInsertion);

    return hhHeapOut;
  };



  //test function to check whether string.js is working or not
   $scope.vvGetLength = function() {
     return $scope.vvInputString.toUpperCase().length;
   };

// end of controller - vvBuildHeap
});

// end of IIFE
})();
