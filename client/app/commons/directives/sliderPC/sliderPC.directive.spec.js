'use strict';

describe('Directive: sliderPC', function () {

  // load the directive's module and view
  beforeEach(module('fullstack012App'));
  beforeEach(module('app/commons/directives/sliderPC/sliderPC.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<slider-p-c></slider-p-c>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the sliderPC directive');
  }));
});