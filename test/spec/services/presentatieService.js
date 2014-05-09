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

  it('should be able to get all the slides', function () {
    //arrange
    expect(presentatieService.getAantalGeladenSlides()).toBe(0);
    var slides = presentatieService.aantalSlides;
    var result = null;
    var promise = null;
    var resolved = false;
    var imgEvent = new FakeImageEvent();
    imgEvent.target.src = '/images/fakeImage';
    var imageStub = jasmine.createSpy('imageStub');
    spyOn(window, 'Image').andReturn(imageStub);

    //act
    runs(function () {
      promise = presentatieService.getSlides();
      //manually trigger the onload event since we won't fetch the actual image
      for (var i = 0; i < slides; i++) {
        imageStub.onload(imgEvent);
      }
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

  it('should return the same url if it already exists', function () {
    //arrange
    var slideNumber = 10;
    var slideUrlOnce = null;
    var slideUrlTwice = null;
    var expectedSlideUrl = 'images/slides/Dia10.JPG';
    //act
    //call once
    slideUrlOnce = presentatieService.getSlideUrl(slideNumber);
    //call twice
    slideUrlTwice = presentatieService.getSlideUrl(slideNumber);
    //assert
    expect(slideUrlOnce.indexOf(slideNumber)).toBeGreaterThan(0);
    expect(slideUrlOnce).toEqual(expectedSlideUrl);
    expect(slideUrlOnce).toBe(slideUrlTwice);
  });

  it('should be able to clear its list', function () {
    //arrange
    expect(presentatieService.getAantalGeladenSlides()).toBe(0);
    var numberOfSlidesAfterFirstLoad = null;
    var numberOfSlidesAfterClear = null;
    var slides = presentatieService.aantalSlides;
    var imgEvent = new FakeImageEvent();
    var imageStub = jasmine.createSpy('imageStub');
    imgEvent.target.src = '/images/fakeImage';
    spyOn(window, 'Image').andReturn(imageStub);

    //act
    runs(function () {
      var firstPromise = presentatieService.getSlides();
      //manually trigger the onload event since we won't fetch the actual image
      for (var i = 0; i < slides; i++) {
        imageStub.onload(imgEvent);
      }
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
})
;