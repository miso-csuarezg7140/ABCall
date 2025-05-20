module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        timeoutInterval: 10000
      },
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcov' }
      ],
      check: {
        global: {
          statements: 0,
          branches: 0,
          functions: 0,
          lines: 0
        }
      },
      includeAllSources: true,
      include: [
        'src/**/*.ts'
      ],
      exclude: [
        'src/test.ts',
        'src/polyfills.ts',
        'src/main.ts',
        'src/**/*.module.ts',
        'src/**/*.spec.ts',
        'src/environments/environment*.ts',
        'src/environments/**/*.ts',
        'src/**/*.mock.ts',
        'src/test-coverage.ts'
      ],
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserNoActivityTimeout: 60000,
    restartOnFileChange: false,
    captureTimeout: 60000,
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-dev-shm-usage',
          '--disable-extensions'
        ]
      }
    },
    browsers: ['ChromeHeadlessNoSandbox']
  });
};