"use strict";

var express = require('express'),
    app = express(),
    webcam_server = require('http').createServer(app),
    eko_server = require('http').createServer(app),
    io = require('engine.io').attach(eko_server);

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/webcam.webm', function(req, res){
  res.writeHead(200, {
    'Content-Type': 'video/webm'
  });

  // start ffmpeg
  var ffmpeg = require('child_process').spawn('ffmpeg', [
    '-f', 'video4linux2', // force input format
    '-r', '25', // frame rate
    '-s', '640x480', // frame size
    '-i', '/dev/video0', // source/input  
    '-vcodec', 'libvpx', // video codec
    '-an', // no audio
    '-f', 'webm', // force output format
    '-' // output to stdout
  ]);

  // pipe ffmpeg output to res(ponse) Writable Stream
  ffmpeg.stdout.pipe(res);

  res.on('close', function(){
    ffmpeg.kill();
  });
});

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

webcam_server.listen(3001, function(){
  console.log(arguments);
  console.log('listening on localhost:3001');
});

eko_server.listen(3000, function(){
  console.log(arguments);
  console.log('listening on localhost:3000');
});