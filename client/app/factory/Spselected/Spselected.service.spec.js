'use strict';

describe('Service: Spselected', function () {

  // load the service's module
  beforeEach(module('fullstack012App'));

  // instantiate service
  var Spselected;
  beforeEach(inject(function (_Spselected_) {
    Spselected = _Spselected_;
  }));

  it('should do something', function () {
    expect(!!Spselected).toBe(true);
  });

});
