var EventEmitter = require("events").EventEmitter;

var ControllerManager = function() {
    var self = this;

    self.sendMessage = function(connection, data) {
        connection.send(JSON.stringify(data));
    }

    self.on("getPin", function(connection, data) {
       connection.pin = (Math.random(1) * 1000).toFixed(0);
       this.sendMessage(connection, { e: "setPin", pin: connection.pin} );
    });

}

ControllerManager.prototype.__proto__ = EventEmitter.prototype;

exports.ControllerManager = ControllerManager;

