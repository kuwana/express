
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , io = require('socket.io')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Socket.IO
//var socket = io.listen(app);
//socket.on('connection', function(client) {
//  // connect
//  client.on('message', function(message) {
//    // message
//  });
//  client.on('disconnect', function() {
//    // disconnect
//  });
//});
var socket = io.listen(app);
var count = 0;
socket.on('connection', function(client) {
  count++;
  client.broadcast(count);
  client.send(count);
  client.on('message', function(message) {
    // message
  });
  client.on('disconnect', function() {
    // disconnect
    count--;
    client.broadcast(count);
  });
});

