'use strict';

describe('Filter: orderByFlujo', function () {

  // load the filter's module
  beforeEach(module('fullstack012App'));

  // initialize a new instance of the filter before each test
  var orderByFlujo;
  beforeEach(inject(function ($filter) {
    orderByFlujo = $filter('orderByFlujo');
  }));

  it('should return the input prefixed with "orderByFlujo filter:"', function () {
    var text = 'angularjs';
    expect(orderByFlujo(text)).toBe('orderByFlujo filter: ' + text);
  });

});
