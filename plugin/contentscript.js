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

script = function() {
  test = "hello";
}

exec(script);
addScript("http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js");
