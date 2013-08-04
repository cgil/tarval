// Key Functions
function keyEvt(evtCode, jsKeyCode) {
    var evt = document.createEvent("Events");
    evt.initEvent(evtCode, true, true);

    evt.view = window;
    evt.which = jsKeyCode;
    evt.keyCode = jsKeyCode;

    document.dispatchEvent(evt);
}

function keydown(jsKeyCode) {
    keyEvt("keydown", jsKeyCode);

}

function keyup(jsKeyCode) {
    keyEvt("keyup", jsKeyCode);
    keyEvt("keypress", jsKeyCode);
}

// WebSockets Callback
function receiveKeyEvt(evtObj) {
    switch (evtObj.e) {
    case "press":
        keydown(evtObj.v);
        break;
    case "depress":
        keyup(evtObj.v);
        break;
    case "tilt":
        break;
    case "tiltStop":
        break;
    default:
        break;
    }
}