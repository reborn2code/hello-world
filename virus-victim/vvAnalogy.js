(function(){

'use strict';

angular.module('vvAnalogy', [])

.controller('vvBuildHeap',function ($scope, vvDataInput, vvHeapOps, vvTree) {

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
    return hhHeapOut;
  };

  $scope.vvGenerateHuffmanTree = function () {
    var hhHeapIn = vvDataInput.iiGetFrequency($scope.vvInputString);
    var hhHeapOut = vvHeapOps.hhBuildMinHeap(hhHeapIn);
    var huffmanTree = vvTree.ttBuildHuffmanTree(hhHeapOut);
    huffmanTree = vvTree.ttAssignCode(huffmanTree);
    huffmanTree = vvTree.ttCheckForVirusVictim(huffmanTree);
    $scope.vvHuffmanTree = huffmanTree;
    $scope.vvAvgCodeLength = vvTree.ttGetAvgCodeLength(huffmanTree);
    $scope.vvOverallRank = vvTree.ttGetOverallRank(huffmanTree);
  };

  $scope.vvPaddingInsertion = function () {
    var huffmanTree = $scope.vvHuffmanTree;
    var i;
    for (i = 0; i < huffmanTree.length ; i++) {
      huffmanTree = vvTree.ttPadingInsertion(huffmanTree, i);
      console.log("Avg Codelen: " + vvTree.ttGetAvgCodeLength(huffmanTree));
      $scope.vvAvgCodeLength = vvTree.ttGetAvgCodeLength(huffmanTree);
      $scope.vvOverallRank = vvTree.ttGetOverallRank(huffmanTree);
    }
  };

  //test function to check whether string.js is working or not
   $scope.vvGetLength = function() {
     return $scope.vvInputString.toUpperCase().length;
   };

// end of controller - vvBuildHeap
});

// end of IIFE
})();
