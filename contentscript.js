(function(jQuery) {
  "use strict";

  jQuery(function() {

    var Tarval = {

      init: function() {

      },

      go: function() {
        var foo = jQuery.Event( "keydown", { keyCode: 13 } );
        jQuery(window).trigger(foo);
        window.console.log("gogogogo");
      }
    };

    window.console.log("inside");
    setTimeout(Tarval.go, 1000);

  });

}(window.jQuery));
