/**
 * Created by yoerid on 28/01/14.
 */
describe('Focus-on directive', function () {
  'use strict';
  var scope;
  var $rootScope, $controller, $location, $timeout, $compile, $browser;

  beforeEach(function () {
    module('html5SlideShowApp.directives');
    inject(function (_$rootScope_, _$controller_, _$location_, _$timeout_, _$compile_, _$browser_) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      $location = _$location_;
      $timeout = _$timeout_;
      $compile = _$compile_;
      $browser = _$browser_;
      scope = $rootScope.$new();
    });
  });

  it('should place the focus on an input field when a property is true', function () {
    // Arrange
    scope.myprop = true;
    var element = $compile('<input type="text" focus-on="myprop" />')(scope);
    spyOn(element[0], 'focus');

    // Act
    scope.$digest();
    $timeout.flush();

    // Assert
    expect(element[0].focus).toHaveBeenCalled();
  });

  it('should not place the focus on an input field when a property is false', function () {
    // Arrange
    scope.myprop = false;
    var element = $compile('<input type="text" focus-on="myprop" />')(scope);
    spyOn(element[0], 'focus');

    // Act
    scope.$digest();

    // Assert
    expect($browser.deferredFns.length).toBe(0); // Detect that $timeout has not been called
    expect(element[0].focus).not.toHaveBeenCalled();
  });
});