'use strict';

angular.module('html5SlideShowApp')
  .controller('MainCtrl', function ($scope, $q, presentatieService) {
    $scope.aantalSlides = presentatieService.aantalSlides;
    $scope.aantalGeladen = 0;
    $scope.klaarMetLaden = false;
    presentatieService.clear();
    presentatieService.getSlides()
      .then(
      function klaar() {
        $scope.klaarMetLaden = true;
      },
      null,
      function update(progress) {
        $scope.aantalGeladen = progress;
      });
  });
