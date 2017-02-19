'use strict';

describe('Directive: requestPending', function () {

  // load the directive's module
  beforeEach(module('thapeloAssignmentApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<request-pending></request-pending>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the requestPending directive');
  }));
});
