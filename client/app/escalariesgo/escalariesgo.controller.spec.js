'use strict';

describe('Controller: EscalariesgoCtrl', function () {

  // load the controller's module
  beforeEach(module('fullstack012App'));

  var EscalariesgoCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EscalariesgoCtrl = $controller('EscalariesgoCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
