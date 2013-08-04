var EventEmitter = require("events").EventEmitter;

var PhoneManager = function() {
    var self = this;

    self.on("getPin", function(connection, data) {
       connection.pin = (Math.random(1) * 1000).toFixed(0);
       connection.sendMessage("setPin", { pin: connection.pin });
    });

    self.on("keyDown", function(connection, data){
        //button down stuff here
        console.log(data);
        console.log("keyDown called");
    });

    self.on("keyUp", function(connection, data){
        //button up stuff here
        console.log("keyUp called")
    });
}

PhoneManager.prototype.__proto__ = EventEmitter.prototype;

exports.PhoneManager = PhoneManager;
