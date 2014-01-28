/**
 * Created by yoerid on 27/01/14.
 */
describe('presentatieService', function () {
  'use strict';
  var presentatieService, $q, $rootScope;

  beforeEach(function () {
    module('html5SlideShowApp.services');
    inject(function (_presentatieService_, _$q_, _$rootScope_) {
      presentatieService = _presentatieService_;
      $q = _$q_;
      $rootScope = _$rootScope_;
    });
  });

  afterEach(inject(function () {
    $rootScope.$digest();
    $rootScope.$apply();
  }));

  it('should know the number of slides', function () {
    expect(presentatieService.aantalSlides).toBe(52);
  });

  it('should know the location of the slides', function () {
    expect(presentatieService.slidesLocatie).toBe('images/slides/');
  });

  it('should be able to give the location of a slide by number', function () {
    var slideNumber = 10;
    var location = presentatieService.getSlideUrl(slideNumber);
    var expectedResult = 'images/slides/Dia10.JPG';
    expect(location).toBe(expectedResult);
  });
  /**
   * for these tests to work, you should enable proxies in the karma config to redirect to the real images:
   proxies: {
      '/images': 'http://localhost:9000/images'
    },
   */
  it('should be able to get all the slides', function () {
    //arrange
    expect(presentatieService.getAantalGeladenSlides()).toBe(0);
    var slides = presentatieService.aantalSlides;
    var result = null;
    var promise = null;
    var resolved = false;
    //act
    runs(function () {
      promise = presentatieService.getSlides();
      promise.then(function () {
        resolved = true;
        result = presentatieService.getAantalGeladenSlides();
      });
    });
    waitsFor(function () {
      $rootScope.$digest();
      $rootScope.$apply();
      return resolved;
    }, 'the promise to be resolved', 3000);
    runs(function () {
      //assert
      expect(result).toBe(slides);
    });
  });

  it('should return the url if it already exists', function () {
    //arrange
    var slideNumber = 10;
    var slideUrl = null;
    var expectedSlideUrl = 'images/slides/Dia10.JPG';
    var resolved = false;
    //act
    runs(function () {
      var promise = presentatieService.getSlides();
      promise.then(function () {
        resolved = true;
      });
    });
    waitsFor(function () {
      $rootScope.$digest();
      $rootScope.$apply();
      return resolved;
    }, 'the promise to be resolved', 3000);
    runs(function () {
      //assert
      slideUrl = presentatieService.getSlideUrl(slideNumber);
      expect(slideUrl.indexOf(expectedSlideUrl)).toBeGreaterThan(0);
    });
  });

  it('should be able to clear its list', function () {
    //arrange
    expect(presentatieService.getAantalGeladenSlides()).toBe(0);
    var numberOfSlidesAfterFirstLoad = null;
    var numberOfSlidesAfterClear = null;
    //act
    runs(function () {
      var firstPromise = presentatieService.getSlides();
      firstPromise.then(function () {
        numberOfSlidesAfterFirstLoad = presentatieService.getAantalGeladenSlides();
        presentatieService.clear();
        numberOfSlidesAfterClear = presentatieService.getAantalGeladenSlides();
      });
    });
    waitsFor(function () {
      $rootScope.$digest();
      $rootScope.$apply();
      return numberOfSlidesAfterFirstLoad;
    }, 'the promise to be resolved', 3000);

    //assert
    runs(function () {
      expect(numberOfSlidesAfterFirstLoad).toBe(presentatieService.aantalSlides);
      expect(numberOfSlidesAfterClear).toBe(0);
    });
  });
});