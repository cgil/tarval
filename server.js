#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var connStor = {}
var http = require('http');

var server = http.createServer(function(request, response) {
	console.log((new Date()) + ' received request for ' + request.url);
	response.writeHead(404;
	response.end();
});

server.listen(8080, function() {
	console.log((new Date()) + " server is istening on port 8080");
});

server.start();

wsServer = new WebSocketServer({
	httpServer: server, 
	autoAcceptConnections:true
});

wsServer.on('request', function(request) {

	var conn = request.accept('hack-protocol', request.origin);

	console.log((new Date()) + 'Connection accepted.');

	conn.on('phone-reg', function(msg) {
		var data = JSON.parse(msg.utf8Data);

		connStor[data.pin] = null;
	});

	conn.on('browser-reg', function(msg) {
		var data = JSON.parse(msg.utf8Data);

		connStor[data.pin] = conn;
	});

	conn.on('phone-cmd', function(msg) {
		var data = JSON.parse(msg.utf8Data);

		connStor[msg.pin].sendUTF(data);
	});

	conn.on('close', function(reasonCode, description) {
		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected');
	});
});
