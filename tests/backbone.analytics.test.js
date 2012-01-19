var TestRouter = Backbone.Router.extend({
  routes: {
    'some-page': 'somePage'
  },

  somePage: function() {
    this.navigate('some-page');
    return false;
  }
});

$(document).ready(function() {
  // Setup
  module('core', {
    setup: function() {
      window._gaq = [];
      this.router = new TestRouter();
      Backbone.history.start();
    }
  });

  // Tests
  test("Visit URL, trigger Google's trackEvent", function() {
    this.router.somePage();
    equal(_gaq.length, 1);
    equal(_gaq[0][0], '_trackPageview');
    equal(_gaq[0][1], '/some-page');
  });

});