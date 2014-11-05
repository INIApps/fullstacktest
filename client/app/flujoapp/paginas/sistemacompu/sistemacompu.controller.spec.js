'use strict';

describe('Controller: SistemacompuCtrl', function () {

  // load the controller's module
  beforeEach(module('fullstack012App'));

  var SistemacompuCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SistemacompuCtrl = $controller('SistemacompuCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
