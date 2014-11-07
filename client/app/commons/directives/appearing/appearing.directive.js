'use strict';

angular.module('fullstack012App')
  .directive("appearing", function ($window) {
    return {
      restrict:"A",
      //scope:{
      //  //seeing:'='
      //},
      link:function (scope, element, attrs) {
        var offsety = attrs.appearingOffset || 50;
        function getScrollOffsets(w) {

          // Use the specified window or the current window if no argument
          w = w || window;

          // This works for all browsers except IE versions 8 and before
          if (w.pageXOffset != null) return {
            x: w.pageXOffset,
            y: w.pageYOffset
          };

          // For IE (or any browser) in Standards mode
          var d = w.document;
          if (document.compatMode == "CSS1Compat") {
            return {
              x: d.documentElement.scrollLeft,
              y: d.documentElement.scrollTop
            };
          }

          // For browsers in Quirks mode
          return {
            x: d.body.scrollLeft,
            y: d.body.scrollTop
          };
        }

        angular.element($window).bind("scroll", function () {
          var offset = getScrollOffsets($window);
          if (offset.y >= offsety) {
            scope.boolChangeClass = true;
          } else {
            scope.boolChangeClass = false;
          }
          scope.seeing = angular.copy(scope.boolChangeClass);
          //console.log(scope.boolChangeClass);
          scope.$apply();
        });
      }
    };
  });
