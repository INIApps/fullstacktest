'use strict';

describe('Service: FloraAPI', function () {

  // load the service's module
  beforeEach(module('fullstack012App'));

  // instantiate service
  var FloraAPI;
  beforeEach(inject(function (_FloraAPI_) {
    FloraAPI = _FloraAPI_;
  }));

  it('should do something', function () {
    expect(!!FloraAPI).toBe(true);
  });

});
