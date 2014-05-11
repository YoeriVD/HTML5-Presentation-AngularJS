/**
 * Created by YoeriD on 10/05/2014.
 */
describe('the landing page', function () {
  'use strict';

  var ptor;

  beforeEach(function () {
    browser.get('/');
    ptor = protractor.getInstance();
  });

  it('should show a button to start the presentation', function () {
    //todo: shouldn't this check for the value of the progressbar?
    var urlButton = $('#start');
    urlButton.click().then(function () {
      ptor.waitForAngular();
      ptor.getCurrentUrl().then(function (url) {
        expect(url).toContain('/slides');
      });
    });
  });
});
