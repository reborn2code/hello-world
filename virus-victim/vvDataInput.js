(function(){

'use strict';

var vvDataInput = function () {

  //convert to UPPER case
  var iiConvertToUpperCase = function(data) {
    return data.toUpperCase();
  }; //end of iiConvertToUpperCase()

  //function to get Total Length of the input data
  var iiGetTotalCount = function(data) {
    return data.toUpperCase().length;
  }; //end of iiGetTotalCount()

  //Get a list of the unique characters in the given data
  var iiGenerateDict = function(data) {
    var result = "";
    var i, j, count;
    var dataUPPER = iiConvertToUpperCase(data);
    var len = iiGetTotalCount(data);

    for(i = 0; i < len ; i++) {
      count = 0;
      for(j = 0; j < result.length; j++) {
        if(result.charAt(j) == dataUPPER.charAt(i))
          count++;
      }
      if(count == 0)
        result = result + dataUPPER.charAt(i);
    }
    return result;
  }; //end of iiGenerateDict()

  // Get frequency of every repeated word
  var iiGetFrequency = function(data) {
    var iiListNode = [];

    var dict = iiGenerateDict(data);
    var dataUPPER = iiConvertToUpperCase(data);

    var dict_len = dict.length;
    var i, j, len;
    var freq = [];

    for(j = 0; j < dict_len ; j++)
    {
      freq[j] = 0;
      iiListNode[j] = {
        iiSymbol: dict[j],
        iiFrequency: 0
      };
    }

    len = iiGetTotalCount(data);

    for(i = 0; i<len; i++) {
      for(j = 0; j < dict_len ; j++) {
        if(dict.charAt(j) == dataUPPER.charAt(i)) {
          freq[j] = freq[j] + 1;
          iiListNode[j].iiFrequency++;
        }
      }
    }

    //Dividing each frequency by total length to get fraction
    for(j = 0; j < dict_len ; j++)
    {
      iiListNode[j].iiFrequency = (iiListNode[j].iiFrequency/len).toFixed(3);
    }


    return iiListNode;
  }; //end of iiGetFrequency

  return {
    iiGetFrequency: iiGetFrequency
  };

}; //end of vvDataInput()


var module = angular.module('vvAnalogy');
module.factory("vvDataInput", vvDataInput);

})(); // end of IIFE
