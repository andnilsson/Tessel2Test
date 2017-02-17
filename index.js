// Import the interface to Tessel hardware
var tessel = require('tessel');

// // Turn one of the LEDs on to start.
// tessel.led[2].on();

// // Blink!
// setInterval(function () {
//   tessel.led[2].toggle();
//   tessel.led[3].toggle();
// }, 100);

// console.log("I'm blinking! (Press CTRL + C to stop)");


tessel.network.ap.disable(function (error) {
  if (error) {
    // handle error if it exists
    console.log("error");
    console.log("en liten ändring");
  }

  console.log("the access point has been successfully disabled");
});