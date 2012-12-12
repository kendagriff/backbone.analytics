var TestRouter = Backbone.Router.extend({
  routes: {
    'some-page': 'somePage'
  },

  somePage: function() {
    // Pretend we are doing something
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
    // Check that the initial route was tracked
    equal(_gaq.length, 1);
    equal(_gaq[0][0], '_trackPageview');
    equal(_gaq[0][1], '/');

    // Check that calling a route works
    this.router.navigate('some-page', { trigger: true });
    equal(_gaq.length, 2);
    equal(_gaq[1][0], '_trackPageview');
    equal(_gaq[1][1], '/some-page');
  });

});