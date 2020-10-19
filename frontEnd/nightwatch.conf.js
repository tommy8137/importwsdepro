// const os = require('os');
// const selenium_server = './bin/selenium-server-standalone.jar';

let config = {
  src_folders: [
    './src/test/e2e', // Where you are storing your Nightwatch e2e tests
  ],
  output_folder: './reports',
  test_settings: {
    default: {
      launch_url: 'http://127.0.0.1:9453',
      // selenium_host: 'selenium.devpack.cc',
      selenium_host: '127.0.0.1',
      selenium_port: 4444,
      silent: true,
      globals: {
        waitForConditionTimeout: 30000, // sometimes internet is slow so wait.
      },
      screenshots: {
        enabled: true, // if you want to keep screenshots
        path: './screenshots', // save screenshots here
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      },
      skip_testcases_on_fail: false,
    },
    sit: {
      launch_url: 'http://192.168.100.207:3000',
      selenium_host: 'selenium.devpack.cc',
      selenium_port: 4444,
      silent: true,
      globals: {
        waitForConditionTimeout: 30000, // sometimes internet is slow so wait.
      },
      screenshots: {
        enabled: true, // if you want to keep screenshots
        path: './screenshots', // save screenshots here
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      },
      skip_testcases_on_fail: false,
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
      },
    },
    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
      },
    },
  },
};

module.exports = config;
