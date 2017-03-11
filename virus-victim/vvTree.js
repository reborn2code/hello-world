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

  var ttPerformPaddingWith = function(ttTreeArray, ttIndex, ttPad) {
    var codeword, tmpCodeword, newRank, currentRank;
    ttTreeArray = ttCheckForVirusVictim(ttTreeArray); //March 11: Removing var from the beginning. No need for a new varaible.
    currentRank = ttGetOverallRank(ttTreeArray);

    //March 11 : swapping the order of operation. Creating tmpCodeword before concat() operation.
    //           as per concat() shouldn't modify the original string, but it is a good practice to keep this operation first.
    tmpCodeword = ttTreeArray[ttIndex].ttCodeword;
    codeword = ttTreeArray[ttIndex].ttCodeword.concat(ttPad);
    ttTreeArray[ttIndex].ttCodeword = codeword;
    //console.log("codeword: " + codeword);
    if(ttIsItValidPrefixCode(ttTreeArray, codeword, ttIndex)) {
      //console.log("codeword: " + codeword + " Tree Code: " + tmpCodeword);
      ttTreeArray = ttCheckForVirusVictim(ttTreeArray);
      newRank = ttGetOverallRank(ttTreeArray);
      //console.log("newRank: " + newRank + " currentRank: " + currentRank);
    }

    if(newRank > currentRank) {
      ttTreeArray[ttIndex].codeword = tmpCodeword;
    }

    return newRank;

  }; // end of ttPerformPaddingWith()

  var ttPadingInsertion = function(ttTreeArray, ttIndex) {
    //This method performs padding insertion at the given index and returns modified tree.
    if(ttIndex < 0 || ttIndex > ttTreeArray.length) {
      console.error("Not a Valid Tree");
      return ttTreeArray;
    }
    var i, len, currentRank, newRank, codeword;
    len = ttTreeArray.length;
    currentRank = ttGetOverallRank(ttTreeArray);
    newRank = currentRank;

    //Pading insertion is performed only on a leaf node
    if(ttIsItLeafNode(ttTreeArray, ttIndex) == false) {
      //console.warn("Not a Valid Leaf");
      //console.log(ttTreeArray[ttIndex].ttSymbol);
      return ttTreeArray;
    }

    // Check for current Rank. If current rank is 0 or the given node's rank is zero than no need of padding insertion.
    if(currentRank == 0 || ttTreeArray[ttIndex].ttRank == 0) {
      //console.log("No Need to perform Padding insertion");
      //console.log(ttTreeArray[ttIndex].ttSymbol);
      return ttTreeArray;
    }

    //perform padding insertion till there is a reduction in the rank
      newRank = ttPerformPaddingWith(ttTreeArray, ttIndex, "0");
      if(newRank < currentRank) {
        return ttTreeArray;
      }
      newRank = ttPerformPaddingWith(ttTreeArray, ttIndex, "1");
    return ttTreeArray;

  };

  var ttIsItLeafNode = function(ttTreeArray, ttIndex) {
    //This method returns true if the given index is a leaf node
    if (ttIndex < 0 || ttIndex >= ttTreeArray.length) {
      console.error("Not a Valid Node");
      return false;
    }
    if( ttTreeArray[ttIndex].ttLeft == -1 && ttTreeArray[ttIndex].ttRight == -1) {
      return true;
    }
    else {
      return false;
    }
  }; //end of ttIsItLeafNode()

  var ttIsItValidPrefixCode = function (ttTreeArray, codeword, ttIndex) {
    //This method returns falst if this is not a valid Prefix codeword
    //Properties of a prefic code. This codeword
    //    : is not prefix of any other codeword
    //    : any other codeword is not prefix of this codeword
    // Note: incase of a prefix code, codeword1.search(codeword2) will return 0, i.e. matching string found at the beginning.
    var i, len;
    len = ttTreeArray.length;
    for (i = 0 ; i < len ; i++ ) {
      if( i == ttIndex || ttIsItLeafNode(ttTreeArray, i) == false ) {
        continue;
      }
      if(ttTreeArray[i].ttCodeword.search(codeword) == 0 ) {
        //console.warn("codeword is prefix of given codeword" + codeword + " " + ttTreeArray[i].ttCodeword);
        return false;
      }
      if(codeword.search(ttTreeArray[i].ttCodeword) == 0 ) {
        //console.warn("given codeword is prefix of codeword" + codeword + " " + ttTreeArray[i].ttCodeword);
        return false;
      }
    }
    return true; //incase none of the above condition is met, this is a valid code.
  }; //End of ttIsItValidPrefixCode()

  var ttCheckForVirusVictim = function(ttTreeArray) {
    //This method checks for virus and victim on all the nodes.
    //These are caluldated only for children nodes.
    var i, j, len, tmpVirus, tmpVictim, searchId;
    len = ttTreeArray.length;
    //reset all virus, victim nodes
    for (i = 0; i < len; i++) {
      for (j = 0; j < ttTreeArray[i].ttRank; j++) {
        ttTreeArray[j].ttVictims.pop();
      }
      ttTreeArray[i].ttRank = 0;
    }

    for ( i = 0; i < len; i++ ) {
      if (ttIsItLeafNode(ttTreeArray, i)) {
        for ( j = 0; j < len; j++ ) {
          if(ttIsItLeafNode(ttTreeArray, j)) {
            // Virus is smaller in Size than victim.
            // In case ttTreeArray[i] is Virus to ttTreeArray[j],
            //    : ttTreeArray[i]'s rank will increase by one
            //    : ttTreeArray[i]'s victim list will have id of ttTreeArray[j]
            // March 11, 2017: search method created two bugs since it returns the location of the first match.
            // Changing the method from search() to endsWith()
            searchId = ttTreeArray[j].ttCodeword.endsWith(ttTreeArray[i].ttCodeword);
            //endsWith() returns 'True' if ttTreeArray[i].ttCodeword is virus of ttTreeArray[j].ttCodeword,
            //                      i.e. ttTreeArray[j].ttCodeword ends with ttTreeArray[j].ttCodeword
            if( searchId && (ttTreeArray[j].ttCodeword != ttTreeArray[i].ttCodeword) ) {
              // console.log("i: " + i + " code at i: " + ttTreeArray[i].ttCodeword);
              // console.log("j: " + j + " code at j: " + ttTreeArray[j].ttCodeword);
              // March 6: Adding additional code to fix Bug related to counting intermediate matching as a victim
              // This will be fixed by adding the searchId with the length of the virus node. This sum should be equal to the length of the virus
              // March 11, 2017: Removing the additional logic for search() method
                ttTreeArray[i].ttRank++;
                ttTreeArray[i].ttVictims.push(j);
            } //end of if to check virus - victim
          }
        } // End of internal for loop
      }
    } //End of external for loop

    return ttTreeArray;
  }

  return {
    ttBuildHuffmanTree: ttBuildHuffmanTree,
    ttGetAvgCodeLength: ttGetAvgCodeLength,
    ttGetOverallRank: ttGetOverallRank,
    ttAssignCode: ttAssignCode,
    ttCheckForVirusVictim: ttCheckForVirusVictim,
    ttPadingInsertion: ttPadingInsertion
  };

}; // end of vvTree()

var module = angular.module('vvAnalogy');
module.factory("vvTree", vvTree);

})(); // end of IIFE
