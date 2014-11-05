'use strict';

describe('Controller: LandingpageCtrl', function () {

  // load the controller's module
  beforeEach(module('fullstack012App'));

  var LandingpageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LandingpageCtrl = $controller('LandingpageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
