DataHandler = {

    mySock : null,

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

function onRequest(request, sender, sendResponse) {
 if (request.action == 'start') {
   DataHandler.mySock = new sockCon('ws://archie.stevegattuso.me:8080');
   DataHandler.mySock.sendPin(request.pin);
 }
 else if (request.action == 'stop') {
   DataHandler.mySock.connection.close();
 }

 sendResponse({});
};
chrome.extension.onRequest.addListener(onRequest);

