(function($, document) {
  "use strict";

  $(function() {
    $('#disconnect').hide();

    var Pop = {

      init: function() {

      }
    };

    $('#connect').click(function() {
      $('#status').text('Connecting...');
      $('#connect').hide();
      $('#disconnect').show();
    });

    $('#disconnect').click(function() {
      $('#status').text('Disconnecting...');
      $('#disconnect').hide();
      $('#connect').show();
    });

  });

}(window.$, window.document));
