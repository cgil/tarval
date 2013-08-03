#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var connStor = {}
var http = require('http');

var server = http.createServer(function(request, response) {
	console.log((new Date()) + ' received request for ' + request.url);
	response.writeHead(404);
	response.end();
});

server.listen(8080, function() {
	console.log((new Date()) + " server is istening on port 8080");
});

wsServer = new WebSocketServer({
	httpServer: server, 
	autoAcceptConnections:true
});

wsServer.on('request', function(request) {

	var conn = request.accept('hack-protocol', request.origin);

	console.log((new Date()) + 'Connection accepted.');

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
