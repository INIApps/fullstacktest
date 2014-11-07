'use strict';

describe('Directive: appearing', function () {

  // load the directive's module
  beforeEach(module('fullstack012App'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<appearing></appearing>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the appearing directive');
  }));
});