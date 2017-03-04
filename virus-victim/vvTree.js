(function(){

'use strict';

angular.module('vvAnalogy')

.controller('vvBuildTree',function ($scope) {

  var ttNode {
    var ttSymbol;
    var ttFreq;
    var ttLeft;
    var ttRight;
    var ttParent;
    var ttCodeword;
    var ttVictims;
    var rank;
  };

  //methods
  var ttBuildHuffmanTree = function() {
    //This method uses Heap functions and builds Huffman Tree and returns Root Node.
  };

  var ttGetOverallRank = function(ttRootNode) {
    //This method calculates and returns overall rank of a tree.
  };

  var ttGetAvgCodeLength = function(ttRootNode) {
    //This method calculates and returns average codeword length based on the freq and length of the codeword
  };

  var ttTraverseTree = function(ttRootNode) {
    //This method traverses the given tree & prints the nodes
  };

  var ttGetRootNode = function(ttNode) {
    //This method returns Root Node from any given node of a tree
  };

  var ttPadingInsertion = function(ttNode) {
    //This method performs padding insertion at the given node.
  };

  }); // end of controller - vvBuildTree
})(); // end of IIFE
