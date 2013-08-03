#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var connStor = {}
var http = require('http');

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
