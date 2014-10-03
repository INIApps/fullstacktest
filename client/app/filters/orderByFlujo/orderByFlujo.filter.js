'use strict';

angular.module('fullstack012App')
  .filter('orderByFlujo', function () {
	  return function(items, reverse) {
	    var filtered = [];
	    
	    angular.forEach(items, function(item) {
	      filtered.push(item);
	    });

	    filtered.sort(function (a, b) {
	      return (a.flujoGenico() > b.flujoGenico() ? 1 : -1);
	    });
	    if(!reverse){
	    	filtered.reverse();
	    }
	    return filtered;
	  };
  });