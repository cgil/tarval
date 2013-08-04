var EventEmitter = require("events").EventEmitter;

var PhoneManager = function(pin_to_client) {
    var self = this;
    self.pin_to_client = pin_to_client;

    self.on("getPin", function(connection, data) {
       connection.pin = (Math.random(1) * 1000).toFixed(0);
       connection.sendMessage("setPin", { pin: connection.pin });

       self.pin_to_phone[pin] = connection;
    });

    self.on("keyDown", function(connection, data){
        self.pin_to_client[connection.pin].sendEvent("keyDown", data.v);
    });

    self.on("keyUp", function(connection, data){
        self.pin_to_client[connection.pin].sendEvent("keyUp", data.v);
    });
}

PhoneManager.prototype.__proto__ = EventEmitter.prototype;

exports.PhoneManager = PhoneManager;
