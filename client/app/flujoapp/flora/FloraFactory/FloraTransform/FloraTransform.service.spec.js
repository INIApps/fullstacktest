'use strict';

describe('Service: FloraTransform', function () {

  // load the service's module
  beforeEach(module('fullstack012App'));

  // instantiate service
  var FloraTransform;
  beforeEach(inject(function (_FloraTransform_) {
    FloraTransform = _FloraTransform_;
  }));

  it('should do something', function () {
    expect(!!FloraTransform).toBe(true);
  });

});
