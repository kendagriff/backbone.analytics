// Created by Kendall Buchanan, (https://github.com/kendagriff)
// MIT licence
// Version 0.0.1

(function() {
  var hashStrip = /^#*/;

  Backbone.History.prototype.navigate = function(fragment, triggerRoute) {
    var frag = (fragment || '').replace(hashStrip, '');
    if (this.fragment == frag || this.fragment == decodeURIComponent(frag)) return;
    if (this._hasPushState) {
      var loc = window.location;
      if (frag.indexOf(this.options.root) != 0) frag = this.options.root + frag;
      this.fragment = frag;
      window.history.pushState({}, document.title, loc.protocol + '//' + loc.host + frag);
    } else {
      window.location.hash = this.fragment = frag;
      if (this.iframe && (frag != this.getFragment(this.iframe.location.hash))) {
        this.iframe.document.open().close();
        this.iframe.location.hash = frag;
      }
    }
    if (window._gaq !== undefined) window._gaq.push(['_trackPageview', '/' + fragment]);
    if (triggerRoute) this.loadUrl(fragment);
  };
}).call(this);