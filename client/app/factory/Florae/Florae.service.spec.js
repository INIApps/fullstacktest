'use strict';

describe('Service: Florae', function () {

  // load the service's module
  beforeEach(module('fullstack012App'));

  // instantiate service
  var Florae;
  beforeEach(inject(function (_Florae_) {
    Florae = _Florae_;
  }));

  it('should do something', function () {
    expect(!!Florae).toBe(true);
  });

});
