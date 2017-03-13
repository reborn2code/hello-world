(function(){

'use strict';

angular.module('vvAnalogy', [])

.controller('vvBuildHeap',function ($scope, vvDataInput, vvHeapOps, vvTree) {

  //This method generates dictionary from the given input string.
  //It uses vvDataInput service to prepare this dictionary
  $scope.vvGenerateDict = function () {
    $scope.vvDictWithFreq = vvDataInput.iiGetFrequency($scope.vvInputString);
  }; //end of vvGenerateDict()

  //This method builds Min-Heap using the input Array
  //It uses vvHeapOps for Heap operations and vvDataInput for generating dictionary
  $scope.vvInput2Heap = function () {
    var hhHeapIn = vvDataInput.iiGetFrequency($scope.vvInputString);
    var hhHeapOut = vvHeapOps.hhBuildMinHeap(hhHeapIn);
    $scope.vvHeapArray = hhHeapOut;
    return hhHeapOut;
  };

  //This method generates Huffman Tree
  //It uses vvTree for Tree operations, vvHeapOps for Heap operations and vvDataInput for generating dictionary
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

  //This method performs padding insertion on the given Huffman Tree
  //It assumes that the tree has already been generated.
  //The padding insertion operation is done only on Virus nodes.
  //There are other ways to perform padding insertion, i.e. padding insertion on victim nodes, which are not covered in this project
  $scope.vvPaddingInsertion = function () {
    var huffmanTree = $scope.vvHuffmanTree;
    var i;
    for (i = 0; i < huffmanTree.length ; i++) {
      huffmanTree = vvTree.ttPadingInsertion(huffmanTree, i);
    }
    $scope.vvAvgCodeLength = vvTree.ttGetAvgCodeLength(huffmanTree);
    $scope.vvOverallRank = vvTree.ttGetOverallRank(huffmanTree);
  };

}); // end of controller - vvBuildHeap

})(); // end of IIFE
