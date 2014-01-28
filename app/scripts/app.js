'use strict';

angular.module('html5SlideShowApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ngAnimate',
    'html5SlideShowApp.services',
    'html5SlideShowApp.directives'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).when('/slides', {
        templateUrl: 'views/slides-list.html',
        controller: 'SlidesCtrl'
      }).when('/slides/:slideId', {
        templateUrl: 'views/slide.html',
        controller: 'SlideCtrl'
      }).otherwise({
        redirectTo: '/slides'
      });
  });

angular.module('html5SlideShowApp.services', []);
angular.module('html5SlideShowApp.directives', []);