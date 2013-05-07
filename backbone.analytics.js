(function() {
  var _loadUrl = Backbone.History.prototype.loadUrl;

  Backbone.History.prototype.loadUrl = function(fragmentOverride) {
    var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });

    if (!/^\//.test(fragment)) fragment = '/' + fragment;
    if (window._gaq !== undefined) window._gaq.push(['_trackPageview', fragment]);

    return matched;
  };

}).call(this);
