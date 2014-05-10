exports.config = {
  // The address of a running selenium server.
  //seleniumAddress: 'http://localhost:4444/wd/hub', //we want protractor to start the server

  // Spec patterns are relative to the location of this config.
  specs: [
    'spec/*_spec.js'
  ],

  //comment out these lines to run the tests locally
  sauceUser: 'YoeriVD',
  sauceKey: 'fad64f2f-c9d6-4955-8ce3-4f73ceb3f003',

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {'args': ['--disable-extensions']},
    'name': 'HTML5-Presentation-AngularJS Protractor Tests'
  },


  // A base URL for your application under test. Calls to protractor.get()
  // with relative paths will be prepended with this.
  baseUrl: 'http://localhost:9001',

  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 10000
  }
};
