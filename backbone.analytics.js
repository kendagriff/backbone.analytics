// Created by Kendall Buchanan, (https://github.com/kendagriff)
// Modified by Paul English, (https://github.com/nrub)
// MIT licence
// Version 0.0.2

(function() {
  var _loadUrl = Backbone.History.prototype.loadUrl;

  Backbone.History.prototype.loadUrl = function(fragmentOverride) {
    var matched = _loadUrl.apply(this, arguments),
        fragment = this.fragment = this.getFragment(fragmentOverride);

    if (!/^\//.test(fragment)) fragment = '/' + fragment;
    if (window._gaq !== undefined) window._gaq.push(['_trackPageview', fragment]);

    return matched;
  };

}).call(this);