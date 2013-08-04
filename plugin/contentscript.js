// Executing an anonymous script
function exec(fn) {
   var script = document.createElement('script');
   script.setAttribute("type", "application/javascript");
   script.textContent = '(' + fn + ')();';
   document.documentElement.appendChild(script); // run the script
   document.documentElement.removeChild(script); // clean up
}

function addScript(uri) {
    var scr = document.createElement('script');

    scr.setAttribute('src', uri);

    document.head.appendChild(scr);
}

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


script = function() {
  test = "hello";
}

exec(script);

addScript("http://brownbsa.com/jquery.js");

jQuery(function() { 
var press = jQuery.Event("keypress");
press.charCode = 13;
press.currentTarget = jQuery("#start");
press.keyCode = 13;
press.srcElement = jQuery("#start")
press.target = jQuery("#start");
press.type = "keypress";
press.view = Window;
press.which = 13;
jQuery("#start").trigger(press);
});