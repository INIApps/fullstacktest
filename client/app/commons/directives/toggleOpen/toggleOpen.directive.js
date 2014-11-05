'use strict';

angular.module('fullstack012App')
  .directive('toggleOpen', function () {
    var directive = {};
    directive.restrict = 'A';
    directive.link = function(scope,element){
      element.on('click',function($event){
        if(element.hasClass('dropdown') && !element.hasClass('open')){
          $event.preventDefault();
          element.toggleClass('open');
        }
      });
      element.on('mouseleave',function(){
        if(element.hasClass('dropdown')&& element.hasClass('open')){
          element.toggleClass('open');
        }
      });
    };
    return directive;
  });
