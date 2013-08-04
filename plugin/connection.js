WebSocket.prototype.sendEvent = function(name, data) {
    if(data == undefined) {
        data = {};
    }
    data['e'] = name;
    this.send(JSON.stringify(data));
};

var SockCon = {

	connection: null,

	init: function(socketAddr, pin) {
		this.connection = new WebSocket(socketAddr, 'client');
		this.sendPin(pin);

	},
	sendPin = function(data) {
		this.connection.send("bindPin", { pin: data });
	},

	connection.onmessage = function(data) {
		DataHandler.receiveKeyEvt(JSON.parse(data.utf8Data));
	},

	connection.onopen = function(){
    	window.console.log('Connected.');
	}
};

// var sockCon = function(socketAddr) {
// 	this.connection = new WebSocket(socketAddr, 'client');

// 	this.sendPin = function(data) {
// 		this.connection.send("bindPin", { pin: data });
// 	}

// 	this.connection.onmessage = function(data) {
//    		DataHandler.receiveKeyEvt(JSON.parse(data.utf8Data));
// 	};

// 	this.connection.onopen = function(){
//     	console.log('Connected.');
// 	};
// };