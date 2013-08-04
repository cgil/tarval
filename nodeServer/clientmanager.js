var EventEmitter = require("events").EventEmitter;

var ClientManager = function(pin_to_client) {
    var self = this;
    self.pin_to_client = pin_to_client;

    self.on("bindPin", function(connection, data) {
        self.pin_to_client[data.pin] = connection;
    });
}

ClientManager.prototype.__proto__ = EventEmitter.prototype;

exports.ClientManager = ClientManager;
