(function($, document) {
  "use strict";

  $(function() {

    $('#disconnect').hide();

    var Pop = {

      init: function() {

      }
    };

    $('#connect').click(function() {
      var pin = $('#pin').val();

      if (pin != "") {
        // Visual Shit
        $('#status').text('Connecting...');
        $('#connect').hide();
        $('#disconnect').show();

        chrome.runtime.sendMessage({action:'start', pin:pin}, function(response) {
          console.log(response);
          $('#status').text('Connected.');
        });
      }
    
    });

    $('#disconnect').click(function() {
      // Visual Shut
      $('#status').text('Disconnecting...');
      $('#disconnect').hide();
      $('#connect').show();

        chrome.runtime.sendMessage({action:'stop', pin:pin}, function(response) {
          console.log(response);
          $('#status').text('Connected.');
        });

      $('#status').text('Disconnected.');
    });

  });

}(window.$, window.document));
