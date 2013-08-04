(function($, document) {
  "use strict";

  $(function() {

    $('#disconnect').hide();

    $('#connect').click(function() {
      var pin = $('#pin').val();

      if (pin != "") {
        // Visual Shit
        $('#status').text('Connecting...');
        $('#connect').hide();
        $('#disconnect').show();

        // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //   chrome.tabs.sendMessage(tabs[0].id, {action:'start', pin:pin}, function(response) {
        //     console.log(response);
        //   });
        // });

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {action:'stop', pin:pin}, function(response) {
            console.log(response);
          });
          // chrome.tabs.sendRequest(tabs[0].id, {action:'stop', pin:pin}, function(response) {
          //   console.log('Start action sent');
          // });
        });


        // chrome.runtime.sendMessage({action:'start', pin:pin}, function(response) {
        //   console.log(response);
        //   $('#status').text('Connected.');
        // });
      }
    
    });

    $('#disconnect').click(function() {
      // Visual Shut
      $('#status').text('Disconnecting...');
      $('#disconnect').hide();
      $('#connect').show();

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // chrome.tabs.sendMessage(tabs[0].id, {action:'stop', pin:pin}, function(response) {
        //   console.log(response);
        // });
        chrome.tabs.sendRequest(tabs[0].id, {action:'stop', pin:pin}, function(response) {
          console.log('Start action sent');
        });
      });

        // chrome.runtime.sendMessage({action:'stop', pin:pin}, function(response) {
        //   console.log(response);
        //   $('#status').text('Connected.');
        // });

      $('#status').text('Disconnected.');
    });

  });

}(window.$, window.document));
