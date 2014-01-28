/**
 * Created by yoerid on 28/01/14.
 */
describe('SlideCtrl', function () {
  'use strict';
  // load the controller's module
  beforeEach(module('html5SlideShowApp'));

  var $controller,
    scope, $location, $routeParams,
    presentatieService, defaultSlideId;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, _presentatieService_, _$location_, $rootScope, _$routeParams_) {
    $controller = _$controller_;
    scope = $rootScope.$new();
    $location = _$location_;
    $routeParams = _$routeParams_;
    presentatieService = _presentatieService_;
    //default
    defaultSlideId = 10;
    $routeParams.slideId = defaultSlideId;
  }));

  it('should get the url of the current slide from the route', function () {
    //arrange
    spyOn(presentatieService, 'getSlideUrl').andReturn();
    //act
    $controller('SlideCtrl', {
      $scope: scope,
      $routeParams: $routeParams,
      $location: $location,
      presentatieService: presentatieService
    });
    //assert
    expect(presentatieService.getSlideUrl).toHaveBeenCalledWith(defaultSlideId);
  });

  it('should be able to navigate to the previous slide', function () {
    var expectedResult = '/slides/9';
    expectPathChange(defaultSlideId, expectedResult, 'vorigeSlide()');
  });
  it('should not change the path if the current slide is the first slide', function () {
    var expectedResult = '/slides/1';
    expectPathChange(1, expectedResult, 'vorigeSlide()');
  });

  it('should not change the path if the current slide is the last slide', function () {
    var aantalSlides = presentatieService.aantalSlides;
    var expectedResult = '/slides/' + aantalSlides;
    expectPathChange(aantalSlides, expectedResult, 'volgendeSlide()');
  });
  it('should be able to navigate to the next slide', function () {
    var expectedResult = '/slides/11';
    expectPathChange(defaultSlideId, expectedResult, 'volgendeSlide()');
  });
  it('should be able to navigate to the slides', function () {
    var expectedResult = '/slides/';
    expectPathChange(defaultSlideId, expectedResult, 'terugNaarOverzicht()');
  });

  it('should navigate to the previous slide with the left arrow key', function () {
    //arrange
    var leftArrowKeyCode = 37;
    var fakeEvent = new FakeEvent(leftArrowKeyCode);
    //act
    $controller('SlideCtrl', {
      $scope: scope,
      $routeParams: $routeParams,
      $location: $location,
      presentatieService: presentatieService
    });
    spyOn(scope, 'vorigeSlide');
    scope.navigeer(fakeEvent);
    //assert
    expect(scope.vorigeSlide).toHaveBeenCalled();
  });

  it('should navigate to the next slide with the right arrow key', function () {
    //arrange
    var rightArrowKeyCode = 39;
    var fakeEvent = new FakeEvent(rightArrowKeyCode);
    //act
    $controller('SlideCtrl', {
      $scope: scope,
      $routeParams: $routeParams,
      $location: $location,
      presentatieService: presentatieService
    });
    spyOn(scope, 'volgendeSlide');
    scope.navigeer(fakeEvent);
    //assert
    expect(scope.volgendeSlide).toHaveBeenCalled();
  });
  it('should navigate to all the slide with the up arrow key', function () {
    //arrange
    var upArrowKeyCode = 38;
    var fakeEvent = new FakeEvent(upArrowKeyCode);
    //act
    $controller('SlideCtrl', {
      $scope: scope,
      $routeParams: $routeParams,
      $location: $location,
      presentatieService: presentatieService
    });
    spyOn(scope, 'terugNaarOverzicht');
    scope.navigeer(fakeEvent);
    //assert
    expect(scope.terugNaarOverzicht).toHaveBeenCalled();
  });

  function expectPathChange(slideId, expectedResult, methodToCall) {
    //arrange
    var resultPath = null;
    $routeParams.slideId = slideId;
    spyOn($location, 'path').andCallFake(function (path) {
      resultPath = path;
    });
    //act
    $controller('SlideCtrl', {
      $scope: scope,
      $routeParams: $routeParams,
      $location: $location,
      presentatieService: presentatieService
    });
    scope.$eval(methodToCall);
    //assert
    expect(resultPath).toBe(expectedResult);
  }


});