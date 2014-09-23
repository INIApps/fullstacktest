'use strict';

describe('Service: relationship', function () {

  // load the service's module
  beforeEach(module('fullstack012App'));

  // instantiate service
  var relationship;
  beforeEach(inject(function (_relationship_) {
    relationship = _relationship_;
  }));

  it('should do something', function () {
    expect(!!relationship).toBe(true);
  });

});
