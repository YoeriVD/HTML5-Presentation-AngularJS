/**
 * Created by yoerid on 28/01/14.
 */
describe('SlidesCtrl', function () {
  'use strict';
  // load the controller's module
  beforeEach(module('html5SlideShowApp'));

  var $controller,
    scope, $q, $rootScope, $location,
    presentatieService;

  var deferredGetSlides;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, _$rootScope_, _presentatieService_, _$q_, _$location_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $location = _$location_;
    presentatieService = _presentatieService_;
    $q = _$q_;

    //controller calls this method upon init, call a fake one to not really load all the image
    spyOn(presentatieService, 'getSlides').andCallFake(function () {
      deferredGetSlides = $q.defer();
      return deferredGetSlides.promise;
    });
  }));


  it('should have a copy of the slides', function () {
    //arrange
    var fakeSlides = ['', '', ''];
    //act
    $controller('SlidesCtrl', {
      $scope: scope,
      presentatieService: presentatieService
    });
    deferredGetSlides.resolve(fakeSlides);
    scope.$root.$digest();
    //assert
    expect(scope.slides[0]).toBe(fakeSlides[0]);
  });

  it('should be able to open a full slide', function () {
    //arrange
    var result;
    var slideNumber = 5;
    var slideIndex = slideNumber - 1;
    var expectedResult = '/slides/' + slideNumber;
    spyOn($location, 'path').andCallFake(function (path) {
      result = path;
    });
    $controller('SlidesCtrl', {
      $scope: scope,
      presentatieService: presentatieService,
      $location: $location
    });
    //act
    scope.openSlide(slideIndex);
    //assert
    expect(result).toBe(expectedResult);
  });


});