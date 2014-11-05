'use strict';

describe('Service: FloraeObj', function () {

  // load the service's module
  beforeEach(module('fullstack012App'));

  // instantiate service
  var FloraeObj;
  beforeEach(inject(function (_FloraeObj_) {
    FloraeObj = _FloraeObj_;
  }));

  it('should do something', function () {
    expect(!!FloraeObj).toBe(true);
  });

});
