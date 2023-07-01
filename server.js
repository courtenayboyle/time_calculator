const http = require('http');
const env = require('dotenv').config();
const {spawn} = require('child_process');

var express = require('express'),
  app = express(),
  port = process.env.PORT || 8080;

  app.get('/', (req, res) => {
 
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['script1.py']);
    // collect data from script
    python.stdout.on('data', function (data) {
     console.log('Pipe data from python script ...');
     dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(dataToSend);
    });
    
   });

app.listen(port);

console.log('App listening on port: ' + port);


