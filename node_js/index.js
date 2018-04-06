
var net = require('net');

var HOST = '127.0.0.1';
var PORT = 8000;

var server = net.createServer();  
server.on('connection', handleConnection);

server.listen(PORT, HOST, function() {  
  console.log('server listening to %j', server.address());
});

function handleConnection(connection) {  
  var remoteAddress = connection.remoteAddress + ':' + connection.remotePort;
  console.log('new client connection from %s', remoteAddress);

  connection.on('data', onConnData);
  connection.once('close', onConnClose);
  connection.on('error', onConnError);

  function onConnData(d) {
    console.log('connection data from %s: %j', remoteAddress, d);
    connection.write(d);
  }

  function onConnClose() {
    console.log('connection from %s closed', remoteAddress);
  }

  function onConnError(err) {
    console.log('Connection %s error: %s', remoteAddress, err.message);
  }
}