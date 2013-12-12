"use strict";

var express = require('express'),
    app = express(),
    webcam_server = require('http').createServer(app),
    eko_server = require('http').createServer(app),
    io = require('engine.io').attach(webcam_server);

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
    //'-acodec', 'libvorbis', // audio codec
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

// serve static file
app.get('/pilot.webm', function(req, res){
  res.writeHead(200, {
    'Content-Type': 'video/webm'
  });

  require('fs').readFile('./public/videos/pilot-audio.webm', function(err, data){
    if (err) {
      throw err;
    }

    // res is Writeable Stream
    // file:///home/leonardo/Softwares/nodejs/node-v0.10.9/doc/api/stream.html#stream_writable_write_chunk_encoding_callback_1
    // we can always track if it's taking too long to serve this file and we need to cut off.
    res.write(data);
  });

  res.on('close', function(){
    
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

webcam_server.listen(3000, function(){
  console.log('webcam listening on localhost:3000');
});