/**
 * Created by yoerid on 27/01/14.
 */
angular.module('html5SlideShowApp.services').factory('presentatieService', function ($q) {
  'use strict';

  var aantalSlides = 52;
  var slidesLocatie = 'images/slides/';
  var slideName = 'Dia';
  var extension = '.JPG';
  var slides = [];

  function buildSlideUrl(slideNumber) {
    return slidesLocatie + slideName + slideNumber + extension;
  }

  function getSlideUrl(slideNumber) {
    return slides[slideNumber - 1] ? slides[slideNumber - 1] : buildSlideUrl(slideNumber);
  }

  function getSlides() {
    var deferred = $q.defer();

    function updateLoadProgress(e) {
      slides.push(e.target.src);
      deferred.notify(slides.length);
      /**
       * als alle slides klaar zijn, de belofte vervullen
       */
      if (slides.length === aantalSlides) {
        deferred.resolve(angular.copy(slides));
      }
    }

    if (slides.length === 0) {
      for (var i = 1; i <= aantalSlides; i++) {
        var url = buildSlideUrl(i);
        var img = new Image();
        img.onload = updateLoadProgress;
        img.src = url;
      }
    } else {
      deferred.resolve(angular.copy(slides));
    }
    return deferred.promise;
  }

  function clear() {
    slides.length = 0;
  }

  function getAantalGeladenSlides() {
    return angular.copy(slides.length);
  }

  return {
    aantalSlides: aantalSlides,
    getAantalGeladenSlides: getAantalGeladenSlides,
    slidesLocatie: slidesLocatie,
    getSlideUrl: getSlideUrl,
    getSlides: getSlides,
    clear: clear
  };
});