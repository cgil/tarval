#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var ControllerManager = require("./controllerManager").ControllerManager;
var connStor = {}
var http = require('http');

var server = http.createServer(function(request, response) {
	console.log((new Date()) + ' received request for ' + request.url);
	response.writeHead(404);
	response.end();
});
var manager = new ControllerManager;

server.listen(8080, function() {
	console.log((new Date()) + " server is istening on port 8080");
});

wsServer = new WebSocketServer({
	httpServer: server, 
	autoAcceptConnections:false
});

wsServer.on('request', function(request) {
	console.log((new Date()) + 'Connection test.');

	var conn = request.accept('hack-protocol', request.origin);
	console.log((new Date()) + 'Connection accepted.');

    conn.on('message', function(msg){
        try{
            var msg = JSON.parse(message.utf8data);
            manager.emit(msg.e, conn, msg);
        }
        catch(e){
            console.log(msg);
        }
    })

	conn.on('phone-reg', function(msg) {
		var pin = (Math.random(1) * 10000).toFixed(0);
		var resp = { "p": pin }; // p stands for pin
		
		connStor[pin] = [];

		conn.sendUTF(resp);
	});

	conn.on('browser-reg', function(msg) {
		var data = JSON.parse(msg.utf8Data);

		if (connStor[data.p].indexOf(conn) == -1) {
			connStor[data.p].push(conn);
		}
	});

	conn.on('phone-cmd', function(msg) {
		var data = JSON.parse(msg.utf8Data);
		var stor = connStor[data.p];

		for (var i = 0; i < stor.length; i++) {
			stor[i].sendUTF(msg);
		}
	});

	conn.on('close', function(reasonCode, description) {
		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected');
	});
});
