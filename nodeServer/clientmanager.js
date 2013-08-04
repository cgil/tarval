var EventEmitter = require("events").EventEmitter;

var ClientManager = function() {
    var self = this;

    self.sendMessage = function(connection, data) {
        connection.send(JSON.stringify(data));
    }
}

ClientManager.prototype.__proto__ = EventEmitter.prototype;

exports.ClientManager = ClientManager;
