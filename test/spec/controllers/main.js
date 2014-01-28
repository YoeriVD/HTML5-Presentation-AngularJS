'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('html5SlideShowApp'));

  var $controller,
    scope, $q, $rootScope,
    presentatieService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, _$rootScope_, _presentatieService_, _$q_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    presentatieService = _presentatieService_;
    $q = _$q_;
  }));

  it('should clear the presentatieService', function(){
    //arrange
    spyOn(presentatieService, 'clear');
    //act
    $controller('MainCtrl', {
      $scope: scope,
      presentatieService: presentatieService
    });
    expect(presentatieService.clear).toHaveBeenCalled();
    expect(presentatieService.clear.callCount).toBe(1);
  });

  it('should know how many slides there are', function () {
    //arrange
    var fakePromise = $q.defer();
    var fakeAantal = 10;
    var isKlaarWaardeVoorLaden = null;
    spyOn(presentatieService, 'aantalSlides').andReturn(fakeAantal);
    spyOn(presentatieService, 'getSlides').andReturn(fakePromise.promise);
    //act
    $controller('MainCtrl', {
      $scope: scope,
      presentatieService: presentatieService
    });
    isKlaarWaardeVoorLaden = scope.klaarMetLaden;
    fakePromise.notify(fakeAantal);
    fakePromise.resolve([]);
    $rootScope.$digest();
    $rootScope.$apply();
    //assert
    expect(isKlaarWaardeVoorLaden).toBe(false);
    expect(scope.aantalGeladen).toBe(fakeAantal);
    expect(scope.klaarMetLaden).toBe(true);
  });


});
