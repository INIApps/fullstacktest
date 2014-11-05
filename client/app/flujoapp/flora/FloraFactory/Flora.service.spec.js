'use strict';

describe('Service: Flora', function () {

  // load the service's module
  beforeEach(module('fullstack012App'));

  // instantiate service
  var Flora;
  beforeEach(inject(function (_Flora_) {
    Flora = _Flora_;
  }));

  it('should do something', function () {
    expect(!!Flora).toBe(true);
  });

});
