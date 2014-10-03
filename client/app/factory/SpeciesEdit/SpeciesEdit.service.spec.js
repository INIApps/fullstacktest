'use strict';

describe('Service: SpeciesEdit', function () {

  // load the service's module
  beforeEach(module('fullstack012App'));

  // instantiate service
  var SpeciesEdit;
  beforeEach(inject(function (_SpeciesEdit_) {
    SpeciesEdit = _SpeciesEdit_;
  }));

  it('should do something', function () {
    expect(!!SpeciesEdit).toBe(true);
  });

});
