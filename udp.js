/* For UDP connection */

var dgram = require("dgram");
var server = dgram.createSocket("udp4");
var HOST = '0.0.0.0';
var PORT = 41234;

server.on("listening", function () {
    var address = server.address();
    console.log("Listen udp connection on " + address.address + ":" + address.port);
});

server.on("message", function (message, remote) {
    console.log(remote.address + ":" + remote.port + ' - ' + message);
    var strMessage_parse = JSON.parse(message);
    console.log(strMessage_parse);

    // Send response back to client
    var cliresp = new Buffer('200 OK');
    server.send(cliresp, 0, cliresp.length, remote.port, remote.address, function (err, bytes) {
        if (err) throw err;
        console.log('Server response to ' + remote.address + ':' + remote.port + '|' + cliresp);
    });
});


server.bind(PORT);