var tessel = require('tessel');
var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function (request, response) {
    var urlParts = url.parse(request.url, true);
    var ledRegex = /leds/;
    if (urlParts.pathname.match(ledRegex)) {
        toggleLED(urlParts.pathname, request, response);
    } else {
        showIndex(urlParts.pathname, request, response);
    }
});

server.listen(8080);

 function showIndex (url, request, response) {
    // Create a response header telling the browser to expect html
    response.writeHead(200, {"Content-Type": "text/html"});

    // Use fs to read in index.html
    fs.readFile(__dirname + '/index.html', function (err, content) {
      // If there was an error, throw to stop code execution
      if (err) {
        throw err;
      }

      // Serve the content of index.html read in by fs.readFile
      response.end(content);
    });
  }

function toggleLED(url, request, response) {
    
    var indexRegex = /(\d)$/;

    // Capture the number, returns an array
    var result = indexRegex.exec(url);

    // Grab the captured result from the array
    var index = result[1];

    // Use the index to refence the correct LED
    var led = tessel.led[index];

    // Toggle the state of the led and call the callback after that's done
    led.toggle(function (err) {
        if (err) {
            // Log the error, send back a 500 (internal server error) response to the client
            console.log(err);
            response.writeHead(500, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ error: err }));
        } else {
            // The led was successfully toggled, respond with the state of the toggled led using led.isOn
            response.writeHead(200, { "Content-Type": "application/json" });
            response.end(JSON.stringify({ on: led.isOn }));
        }
    });
}