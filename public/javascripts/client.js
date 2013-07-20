//var socket = new io.Socket('localhost');
//socket.connect();
//socket.on('message', function(message) {
//  //message
//  alert('test!');
//});
var socket = new io.Socket('localhost');
socket.connect();
socket.on('message', function(message) {
  $('#count').text(message);
});
