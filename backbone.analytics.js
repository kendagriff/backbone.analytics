(function() {
  var loadUrl = Backbone.History.prototype.loadUrl;
  
  Backbone.History.prototype.loadUrl = function(fragmentOverride) {
    var matched = loadUrl.apply(this, arguments),
        gaFragment = this.fragment;
    if (!/^\//.test(gaFragment)) gaFragment = '/' + gaFragment;
    if(window._gaq !== undefined) window._gaq.push(['_trackPageview', gaFragment]);
    
    return matched;
  };

}).call(this);
