DataHandler = {

    // Key Functions
     keyEvt: function(evtCode, jsKeyCode) {
        var evt = document.createEvent("Events");
        evt.initEvent(evtCode, true, true);

        evt.view = window;
        evt.which = jsKeyCode;
        evt.keyCode = jsKeyCode;

        document.dispatchEvent(evt);
    },

    keydown: function(jsKeyCode) {
        DataHandler.keyEvt("keydown", jsKeyCode);

    },

    keyup: function(jsKeyCode) {
        DataHandler.keyEvt("keyup", jsKeyCode);
        DataHandler.keyEvt("keypress", jsKeyCode);
    },

    // WebSockets Callback
    receiveKeyEvt: function(evtObj) {
        switch (evtObj.e) {
        case "press":
            DataHandler.keydown(evtObj.v);
            break;
        case "depress":
            DataHandler.keyup(evtObj.v);
            break;
        case "tilt":
            break;
        case "tiltStop":
            break;
        default:
            break;
        }
    }

}

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
     if (request.action == 'start' && request.pin != undefined && request.pin != "") {
       SockCon.init('ws://archie.stevegattuso.me:8080', request.pin);
     }
     else if (request.action == 'stop') {
       SockCon.connection.close();
     }

});
chrome.tabs.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
     if (request.action == 'start' && request.pin != undefined && request.pin != "") {
       SockCon.init('ws://archie.stevegattuso.me:8080', request.pin);
     }
     else if (request.action == 'stop') {
       SockCon.connection.close();
     }

});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
     if (request.action == 'start' && request.pin != undefined && request.pin != "") {
       SockCon.init('ws://archie.stevegattuso.me:8080', request.pin);
     }
     else if (request.action == 'stop') {
       SockCon.connection.close();
     }

});

// function onRequest(request, sender, sendResponse) {
//     console.log("RECV " + request);
 // if (request.action == 'start') {
 //   DataHandler.mySock = new sockCon('ws://archie.stevegattuso.me:8080');
 //   DataHandler.mySock.sendPin(request.pin);
 // }
 // else if (request.action == 'stop') {
 //   DataHandler.mySock.connection.close();
 // }

//  sendResponse({});
// };
// chrome.extension.onRequest.addListener(onRequest);

