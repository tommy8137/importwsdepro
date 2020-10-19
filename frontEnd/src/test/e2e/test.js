module.exports = {
  'Demo test Google': function (browser) {
    console.log('browser', browser.launch_url);
    browser
      .url(browser.launch_url)
      .waitForElementVisible('body', 1000)
      .pause(1000)
      .end();
  }
};
