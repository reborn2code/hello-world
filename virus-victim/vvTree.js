(function(){

'use strict';

var vvTree = function(vvHeapOps) {

  //methods
  var ttBuildHuffmanTree = function(hhHeapIn) {
    //This method uses Heap functions and builds Huffman Tree and returns Root Node.
    var ttTreeArray = []; //This will be used for doing Heap Operation for generating Leaf Nodes
    var ttTreeArrayTemp = []; //This will be used for saving additional nodes in the array and will be HeapMinified later
    var len = hhHeapIn.length;

    var i, leftNode, rightNode, newNode, j;

    //first generating tree leaf nodes using the input Heap
    for ( i = 0; i < len; i++) {
      ttTreeArray[i] = {
        ttSymbol: hhHeapIn[i].iiSymbol,
        iiFrequency: Number(hhHeapIn[i].iiFrequency).toFixed(3),
        ttLeft: -1,
        ttRight: -1,
        ttParent: -1,
        ttCodeword: "",
        ttVictims: [-1],
        ttRank: 0,
        ttID: i
      };
      ttTreeArrayTemp.push(ttTreeArray[i]) ;
    } //end of Loop initializing nodes

    vvHeapOps.hhHeapSize = ttTreeArray.length;
    var ttTreeArrayIn = vvHeapOps.hhBuildMinHeap(ttTreeArray);

    for ( i = len; i < 2*len - 1; i++) {
      leftNode = vvHeapOps.hhGetHeapMinimum(ttTreeArrayIn);
      ttTreeArrayIn = vvHeapOps.hhExtractHeapMinimum(ttTreeArrayIn);
      rightNode = vvHeapOps.hhGetHeapMinimum(ttTreeArrayIn);
      ttTreeArrayIn = vvHeapOps.hhExtractHeapMinimum(ttTreeArrayIn);

      //Now Merging Operation to create a new node
      newNode = {
        ttSymbol: leftNode.ttSymbol + "," + rightNode.ttSymbol,
        iiFrequency: (Number(leftNode.iiFrequency) + Number(rightNode.iiFrequency)).toFixed(3),
        ttLeft: leftNode.ttID,
        ttRight: rightNode.ttID,
        ttParent: -1,
        ttCodeword: "",
        ttVictims: [-1],
        ttRank: 0,
        ttID: i
      };

      ttTreeArrayTemp.push(newNode); //Adding this new node in the buffer Array
      // updating left and right children information of the buffer Array
      ttTreeArrayTemp[leftNode.ttID].ttParent = i;
      ttTreeArrayTemp[rightNode.ttID].ttParent = i;
      ttTreeArrayIn = vvHeapOps.hhInsertHeap(ttTreeArrayIn, newNode);
    } // End of for Loop building tree


    //Now performing Heap Operation on the Buffer Array
    // vvHeapOps.hhHeapSize = 2*len - 1;
    // var ttTreeArrayOut = vvHeapOps.hhBuildMinHeap(ttTreeArrayTemp);

    // return the Root Tree ID and the Tree
    return ttTreeArrayTemp;
  }; //end of ttBuildHuffmanTree()

  var ttGetOverallRank = function(ttTreeArray) {
    //This method calculates and returns overall rank of a tree.
    var i, len, overallRank; //Add all ranks in the array and return the overall rank
    len = ttTreeArray.length;
    overallRank = 0;
    for (i = 0; i < len ; i++) {
      //console.log("Index: " + i + " Rank : " + ttTreeArray[i].ttRank);
      overallRank += ttTreeArray[i].ttRank;
    }
    return overallRank;
  };

  var ttGetAvgCodeLength = function(ttTreeArray) {
    //This method calculates and returns average codeword length based on the freq and length of the codeword
    //Code length is calculated only for child nodes
    //childNodes have both left & right children as -1
    var i, len, avgCodeLen;
    len = ttTreeArray.length;
    avgCodeLen = 0;
    for( i = 0 ; i < len ; i++ ){
      //Check for child node
      if( ttTreeArray[i].ttLeft == -1 & ttTreeArray[i].ttRight == -1 ) {
            //console.log("codeword " + ttTreeArray[i].ttCodeword + " codeword Length " + ttTreeArray[i].ttCodeword.length);
            avgCodeLen += (ttTreeArray[i].iiFrequency * ttTreeArray[i].ttCodeword.length);
      }
    }
    return avgCodeLen;
  };

  var ttAssignCode = function(ttTreeArray) {
    //This method traverses the given tree & assigns codeword
    var i, rootID, len;
    len = ttTreeArray.length;
    rootID = ttGetRootNode(ttTreeArray);
    if (rootID < 0) {
      console.error("Root ID not found in the given tree");
    }
    return ttInorderAppend(ttTreeArray, rootID, "", "");
  }; //end of ttAssignCode()

  var ttInorderAppend = function(ttTreeArray, ttIndex, ttLeftOrRight, ttIndexCode) {
    // ttLeftOrRight == "0" is for Left and ttLeftOrRight == "1" for right
    if (ttIndex >=0 && ttIndex < ttTreeArray.length ) {
        ttTreeArray[ttIndex].ttCodeword = ttIndexCode.concat(ttLeftOrRight);
      ttInorderAppend(ttTreeArray, ttTreeArray[ttIndex].ttLeft, "0", ttTreeArray[ttIndex].ttCodeword);
        //console.log("Found Child Node at ID: " + ttIndex + " codeword: " + ttTreeArray[ttIndex].ttCodeword);
      ttInorderAppend(ttTreeArray, ttTreeArray[ttIndex].ttRight, "1", ttTreeArray[ttIndex].ttCodeword);
    }
    return ttTreeArray
  }; //end of ttInorderAppend()

  var ttGetRootNode = function(ttTreeArray) {
    //This method returns ID of Root Node from any given node of a tree
    var i, len;
    len = ttTreeArray.length;
    for(i = 0; i < len ; i++) {
      if(ttTreeArray[i].ttParent == -1) {
        return i; //returns index which has parent as -1. It is the root node
      }
    }
    return -1; //This condition shouldn't be executed in a normal tree.
  }; //end of ttGetRootNode()

  // var ttPadingInsertion = function(ttNode) {
  //   //This method performs padding insertion at the given node.
  // };

  return {
    ttBuildHuffmanTree: ttBuildHuffmanTree,
    ttGetAvgCodeLength: ttGetAvgCodeLength,
    ttGetOverallRank: ttGetOverallRank,
    ttAssignCode: ttAssignCode
  };

}; // end of vvTree()

var module = angular.module('vvAnalogy');
module.factory("vvTree", vvTree);

})(); // end of IIFE
