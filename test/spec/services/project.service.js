'use strict';

describe('Service: project.service', function () {

  // load the service's module
  beforeEach(module('thapeloAssignmentApp'));

  // instantiate service
  var project.service;
  beforeEach(inject(function (_project.service_) {
    project.service = _project.service_;
  }));

  it('should do something', function () {
    expect(!!project.service).toBe(true);
  });

});
