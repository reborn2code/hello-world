(function(){

'use strict';


var vvHeapOps = function () {
// Heap Properties
var hhHeapSize;

var hhGetParent = function( hhIndex ) {
  //console.log("Input Index " + hhIndex);
  //console.log("Parent Index " + hhIndex/2);
  if( hhIndex == 0) {
    console.warn("Index is at Parent node already. Passed Index is ZERO");
  }
  return Math.floor(hhIndex/2) ; //Fix typecasting, get integer and not float
};

//Theoretical definition is 2*hhIndex assuming array indexing starts from 1
//Practically array index starts from 0, so changing this function accordingly
//When array starts from zero, then left = 2*index + 1
var hhGetLeft = function( hhIndex ) {
  //console.log("Input Index " + hhIndex);
  //console.log("Left Index " + 2*hhIndex);
  return (2*hhIndex + 1);
};

//Theoretical definition is 2*hhIndex assuming array indexing starts from 1
//Practically array index starts from 0, so changing this function accordingly
//When array starts from zero, then right = 2*index + 2
var hhGetRight = function( hhIndex ) {
  //console.log("Input Index " + hhIndex);
  //console.log("Right Index " + 2*hhIndex + 1);
  return (2*hhIndex + 2);
};

var hhGetHeapSize = function ( hhHeap ) {
  return hhHeapSize;
};

//Assumption is that hhI & hhJ are within boundaries of hhHeap
var hhIsIsmallerThanJ = function (hhHeapIn, hhI, hhJ){
  var i;

  var ii = Number(hhHeapIn[hhI]);
  var jj = Number(hhHeapIn[hhJ]);

  if(ii < jj) {
    i = 1;
  }
  else {
    i = 0;
  }
  return i; //returns True if hhI index is smaller than hhJ, otherwise false
};

var hhMinHeapify = function (hhHeap, hhIndex) {
  var l = hhGetLeft(hhIndex);
  var r = hhGetRight(hhIndex);
  var minimum;

  if( l < hhGetHeapSize(hhHeap) && hhIsIsmallerThanJ(hhHeap, l, hhIndex)){
      minimum = l;
  }
  else {
      minimum = hhIndex;
  }

  if( r < hhGetHeapSize(hhHeap) && hhIsIsmallerThanJ(hhHeap, r, minimum) ) {
    minimum = r;
  }

  if( minimum != hhIndex) {
    var temp = hhHeap[minimum];
    hhHeap[minimum] = hhHeap[hhIndex];
    hhHeap[hhIndex] = temp;
    hhHeap = hhMinHeapify(hhHeap, minimum);
  }
  return hhHeap;
}; //end of hhMinHeapify

  var hhPrintHeap = function(hhHeap) {
    //This is a debugging function. It prints hhHeap in console
    var i, len;
    len = hhGetHeapSize(hhHeap);
    console.log("Printing the given hhHeap");
    for(i = 0; i < len; i++) {
      console.log("At " + i + "th index. The value is: " + hhHeap[i]);
    }
  }; //end of hhPrintHeap

  var hhBuildMinHeap = function (hhHeap) {
    var i;
    hhHeapSize = hhHeap.length;

    for ( i = Math.floor(hhHeapSize/2) ; i >= 0; i--) {
      hhHeap = hhMinHeapify(hhHeap, i);
    }
    return hhHeap;
  }; //end of hhBuildMinHeap

  var hhGetHeapMinimum = function (hhHeap) {
    return hhHeap[0];
  };

  var hhExtractHeapMinimum = function (hhHeap) {
    if (hhHeapSize > 1) {
      var min = hhHeap[0];
      hhHeap[0] = hhHeap[hhGetHeapSize(hhHeap) - 1];
      hhHeapSize = hhHeapSize - 1;
      hhHeap = hhMinHeapify(hhHeap, 0);
    }
    return hhHeap;
  }; //end of hhExtractHeapMinimum

  var hhHeapDecreaseKey = function (hhHeap, hhIndex, hhKey) {
    //if new Key is bigger than the current value, then there is no decrease
    // NOTE to self - this comparison will change when I implement for tree node
    if ( Number(hhHeap[hhIndex]) > Number(hhKey) ) {
      hhHeap[hhIndex] = hhKey ;
      while( hhIndex > 0 && Number(hhHeap[hhGetParent(hhIndex)]) > Number(hhHeap[hhIndex])) {
        var temp = hhHeap[hhIndex];
        hhHeap[hhIndex] = hhHeap[hhGetParent(hhIndex)];
        hhHeap[hhGetParent(hhIndex)] = temp;
        hhIndex = hhGetParent(hhIndex);
      }
    }
    return hhHeap;
  }; //end of hhHeapDecreaseKey

  //Assumption is that 1000 is the maximum
  var hhInsertHeap = function(hhHeap, hhKey) {
    hhHeapSize = hhHeapSize + 1;
    hhHeap[hhHeapSize - 1] = 1000;
    var hhHeapOut = hhHeapDecreaseKey(hhHeap, hhHeapSize - 1, hhKey);
    return hhHeapOut;
  }; // end of hhInsertHeap

  return {
    hhInsertHeap: hhInsertHeap,
    hhExtractHeapMinimum: hhExtractHeapMinimum,
    hhGetHeapMinimum: hhGetHeapMinimum,
    hhBuildMinHeap: hhBuildMinHeap,
    hhMinHeapify: hhMinHeapify,
    hhGetParent: hhGetParent,
    hhGetLeft: hhGetLeft,
    hhGetRight: hhGetRight,
    hhHeapSize: hhHeapSize
  };

}; //end of vvHeapOps

var module = angular.module('vvAnalogy');
module.factory("vvHeapOps", vvHeapOps);

// end of IIFE
})();
