'use strict';

describe('Controller: ClasriesgoCtrl', function () {

  // load the controller's module
  beforeEach(module('fullstack012App'));

  var ClasriesgoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClasriesgoCtrl = $controller('ClasriesgoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
