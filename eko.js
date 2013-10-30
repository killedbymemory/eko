"use strict";

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('engine.io').attach(server);

// see: http://expressjs.com/api.html#app.use
// ... serving files in ./public using the express.static() middleware
app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
  (function(){
    // tail -f /var/log/apache2/access.log
    // if there are new data in stdout, send it through existing socket
    var spawn = require('child_process').spawn,
        ls    = spawn('tail', ['-f', '/var/log/apache2/access.log']);

    ls.stdout.on('data', function (data) {
      socket.send(data);
    });
  })();

  socket.on('message', function(v){
    // echo
    socket.send(v);
  });
});

server.listen(3000, function(){
  console.log('listening on localhost:3000');
});