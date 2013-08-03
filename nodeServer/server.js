#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var IphoneManager = require("./iphoneManager").ControllerManager;
var ChromeManager = require("./chromeManager").ControllerManager;
var connStor = {}
var http = require('http');

var connectionMaping = {};

var server = http.createServer(function(request, response) {
	console.log((new Date()) + ' received request for ' + request.url);
	response.writeHead(404);
	response.end();
});
var iphone_manager = new IphoneManager;
var chrome_manager = new ChromeManager;

server.listen(8080, function() {
	console.log((new Date()) + " server is istening on port 8080");
});

wsServer = new WebSocketServer({
	httpServer: server, 
	autoAcceptConnections:false
});

function handleRequest(protocol, manager) {
    return function(request) {
        console.log((new Date()) + 'Connection test.');

        try {
            var conn = request.accept(protocol, request.origin);
        } catch(e) {
            return;
        }
        console.log((new Date()) + 'Connection accepted.');

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

wsServer.on('request', handleRequest("iphone", iphone_manager));
wsServer.on('request', handleRequest("chrome", chrome_manager));
