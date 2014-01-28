angular.module('html5SlideShowApp').controller('SlideCtrl', function ($scope, $location, $routeParams, presentatieService) {
  'use strict';
  var id = parseInt($routeParams.slideId);
  var aantalSlides = presentatieService.aantalSlides;
  $scope.slide = presentatieService.getSlideUrl(id);

  $scope.vorigeSlide = function () {
    var vorige = (id <= 1) ? 1 : (id - 1);
    $location.path('/slides/' + vorige);
  };

  $scope.volgendeSlide = function () {
    var volgende = (parseInt(id) + 1) > aantalSlides ? aantalSlides : (parseInt(id) + 1);
    $location.path('/slides/' + volgende);
  };

  $scope.terugNaarOverzicht = function () {
    $location.path('/slides/');
  };

  $scope.navigeer = function (evt) {
    switch (evt.keyCode) {
      case 37:
        $scope.vorigeSlide();
        break;
      case 38:
        $scope.terugNaarOverzicht();
        break;
      case 39:
        $scope.volgendeSlide();
        break;
    }
  };
});