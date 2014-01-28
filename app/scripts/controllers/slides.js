angular.module('html5SlideShowApp').controller('SlidesCtrl', function ($scope, $location, presentatieService) {
  'use strict';
  presentatieService.getSlides().then(function (data) {
    $scope.slides = data;
  });
  $scope.openSlide = function (index) {
    $location.path('/slides/' + (index + 1));
  };

});