(function() {
  var loadUrl = Backbone.History.prototype.loadUrl;

  Backbone.History.prototype.loadUrl = function(fragmentOverride) {
    var matched = loadUrl.apply(this, arguments),
        gaFragment = this.fragment;
    if (!/^\//.test(gaFragment)) gaFragment = '/' + gaFragment;
    if(typeof window._gaq !== "undefined") window._gaq.push(['_trackPageview', gaFragment]);
    if(typeof window['GoogleAnalyticsObject'] !== "undefined"){
      var ga = window['GoogleAnalyticsObject'];
      window[ga]('send', 'pageview', gaFragment);
    }
    return matched;
  };

}).call(this);
