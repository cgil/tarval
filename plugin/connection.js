WebSocket.prototype.sendEvent = function(name, data) {
    if(data == undefined) {
        data = {};
    }
    data['e'] = name;
    this.send(JSON.stringify(data));
}

var connection = new WebSocket('archit.stevegattuso.me:8080');

var sendPin = function(data){
    connection.send("bindPin", { pin: data });
};

connection.onmessage = function(data) {
    data = JSON.parse(data.utf8Data);
};

connection.onopen = function(){
    console.log('Connected.');
};
