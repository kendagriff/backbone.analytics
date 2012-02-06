# Backbone.Analytics

A drop-in plugin that integrates Google's `trackEvent` directly into Backbone's `navigate` function. Works best with `pushState` set to `true`. If `pushState` is turned off, it's possible Google will register visits twice on page load. You can mitigate that by removing the `trackEvent` from the Google code in your site.

### Dependencies

* [JQuery](http://jquery.com/)
* [Backbone.js](http://documentcloud.github.com/backbone/) (Tested in 0.5.3)
* [Underscore.js](http://documentcloud.github.com/underscore/) (Tested in 1.2.3)

## Setup

Add the [asynchronous Google Analytics code](http://code.google.com/apis/analytics/docs/tracking/asyncTracking.html) to your site.

If you run `Backbone.history.start()` with the `silent: false` option (it's the default) then you may want to remove the following line from your tracking snippet to prevent Google from possibly double counting the initial page load.
`_gaq.push(['_trackPageview']);`

Add these dependencies to your site's `<head>`, **in order**:

```
<script src="jquery.js"></script>
<script src="underscore.js"></script>
<script src="backbone.js"></script>
<script src="backbone.analytics.js"></script>
```

## Usage

In each function for each of your Backbone routes, simply call the `navigate` function as you normally would. Backbone.Analytics will call `_gaq.push(['_trackPageview', '/some-page'])` after completing the Backbone route.

```
var TestRouter = Backbone.Router.extend({
  routes: {
    'some-page': 'somePage'
  },

  somePage: function() {
    this.navigate('some-page');
    return false;
  }
});

var router = new TestRouter();
Backbone.history.start();

router.somePage();

// The alternative might be...

router.navigate('some-page', true);
```