'use strict';

describe('Controller: FloraCtrl', function () {

  // load the controller's module
  beforeEach(module('fullstack012App'));

  var FloraCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FloraCtrl = $controller('FloraCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
