const http = require('http');
const env = require('dotenv').config();
const spawn = require('child_process').spawn;
const path = require('path')

const express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  port = process.env.PORT || 8080;

app.use(express.static('./src/'));
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/calc', async (req, res) => {
  console.log(req.body)
  let returnData;
  function returnTime(){

      var dataToSend;
      // spawn new child process to call the python script
      const python = spawn('python3', ['time_calculator.py', req.body.time1, req.body.time2, req.body.day]);
      // collect data from script
      python.stdout.on('data', function (data) {
        dataToSend = data.toString();
        console.log("data to send = " + dataToSend);
        res.send(JSON.stringify(dataToSend));
      });

      python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
      });
  };
  returnTime()
  // console.log(returnData)
  // res.send(returnData);
});


app.listen(port);

console.log('App listening on port: ' + port);


