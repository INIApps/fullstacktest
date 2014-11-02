'use strict';

describe('Controller: ModeladorCtrl', function () {

  // load the controller's module
  beforeEach(module('fullstack012App'));

  var ModeladorCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModeladorCtrl = $controller('ModeladorCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
