#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var PhoneManager = require("./phonemanager").PhoneManager;
var ClientManager = require("./clientmanager").ClientManager;
var http = require('http');

var server = http.createServer(function(request, response) {
	console.log((new Date()) + ' received request for ' + request.url);
	response.writeHead(404);
	response.end();
});

var pin_to_client = {};

var phone_manager = new PhoneManager(pin_to_client);
var client_manager = new ClientManager(pin_to_client);

server.listen(8080, function() {
	console.log((new Date()) + " server is listening on port 8080");
});

wsServer = new WebSocketServer({
	httpServer: server, 
	autoAcceptConnections:false
});

function handleRequest(protocol, manager) {
    return function(request) {
        try {
            var conn = request.accept(protocol, request.origin);
        } catch(e) {
            return;
        }
        console.log((new Date()) + 'Connection accepted.');

        self.sendMessage = function(event, data) {
            data['e'] = event;
            connection.send(JSON.stringify(data));
        }

        conn.on('message', function(data){
            try{
                var msg = JSON.parse(data.utf8Data);
                manager.emit(msg.e, conn, msg);
            }
            catch(e){
                console.log("Invalid JSON from client");
                console.log(data.utf8data);
            }
        });

        conn.on('close', function(reasonCode, description) {
            console.log((new Date()) + ' Peer ' + conn.remoteAddress + ' disconnected');
        });
    };
}

wsServer.on('request', handleRequest("phone", phone_manager));
wsServer.on('request', handleRequest("client", client_manager));
