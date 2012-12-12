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
Anywhere you call your routers navigate method with the trigger option set to true Backbone.Analytics will call '_gaq.push(['_trackPageview', '/some-page'])' after completing the Backbone route. This pushes the route to the Google Analytics tracking queue. Once this queue is processed by the Google Analytics script your urls will be tracked to the Google Analytics server.

```javascript
var TestRouter = Backbone.Router.extend({
  routes: {
    'some-page': 'somePage'
  },

  somePage: function() {
    // Perform your route based logic, e.g. Replace the current view with a different one.
    return false;
  }
});

var router = new TestRouter();
Backbone.history.start();
```

Somewhere else in your application, change the view by doing:
```javascript
router.navigate('some-page', { trigger: true });
```

Anywhere in your application where you want to update the URL but do **not** trigger the associated route, you will still need to manually track the action.

## Contributors

* [WillsB3](https://github.com/WillsB3)
* [Paul English](https://github.com/nrub)
* [Kendall Buchanan](https://github.com/kendagriff)
