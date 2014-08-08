'use strict';

describe('Controller: FlujoappCtrl', function () {

  // load the controller's module
  beforeEach(module('fullstack012App'));

  var FlujoappCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FlujoappCtrl = $controller('FlujoappCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
