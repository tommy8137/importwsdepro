let HtmlReporter = require('nightwatch-html-reporter');
/* Same options as when using the built in nightwatch reporter option */
let reporter = new HtmlReporter({
  openBrowser: false,
  reportsDirectory: __dirname + '/reports/'
});

module.exports = {
  write : function(results, options, done) {
    reporter.fn(results, done);
  }
}
