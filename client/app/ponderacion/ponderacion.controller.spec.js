'use strict';

describe('Controller: PonderacionCtrl', function () {

  // load the controller's module
  beforeEach(module('fullstack012App'));

  var PonderacionCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PonderacionCtrl = $controller('PonderacionCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
