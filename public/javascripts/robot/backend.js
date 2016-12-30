var board, pump0, pump1, pump2, pump3, pump4, pump5, pump6;

var raspi = require('raspi');
var gpio = require('raspi-gpio');

raspi.init(function() {
  pump0 = new gpio.DigitalOutput(7);    //GPIO4
  pump1 = new gpio.DigitalOutput(21);   //GPIO5
  pump2 = new gpio.DigitalOutput(22);   //GPIO6
  pump3 = new gpio.DigitalOutput(11);   //GPIO7
  pump4 = new gpio.DigitalOutput(10);   //GPIO8
  pump5 = new gpio.DigitalOutput(13);   //GPIO9
  pump6 = new gpio.DigitalOutput(12);   //GPIO10
  pump6.write(gpio.HIGH);
});

exports.pump = function (ingredients) {
  console.log("Dispensing Drink");
  for (var i in ingredients) {
    (function (i) {
      setTimeout(function () {  // Delay implemented to have a top-biased mix
        pumpMilliseconds(ingredients[i].pump, ingredients[i].amount);
      }, ingredients[i].delay);
    })(i);
  }
};

function pumpMilliseconds(pump, ms) {
  exports.startPump(pump);
  setTimeout(function () {
    exports.stopPump(pump);
  }, ms);
}

exports.startPump = function (pump) {
  console.log("\033[32m[PUMP] Starting " + pump + "\033[91m");
  var p = exports.usePump(pump);
  p.write(gpio.HIGH);
}

exports.stopAll = function () {
  if (pump0 != null) pump0.write(gpio.LOW);
  if (pump1 != null) pump1.write(gpio.LOW);
  if (pump2 != null) pump2.write(gpio.LOW);
  if (pump3 != null) pump3.write(gpio.LOW);
  if (pump4 != null) pump4.write(gpio.LOW);
  if (pump5 != null) pump5.write(gpio.LOW);
  if (pump6 != null) pump6.write(gpio.LOW);
}

exports.stopPump = function (pump) {
  console.log("\033[32m[PUMP] Stopping " + pump + "\033[91m");
  var p = exports.usePump(pump);
  p.write(gpio.LOW);
}

exports.usePump = function (pump) {
  var using;
  switch(pump) {
    case 'pump0':
      using = pump0;
      break;
    case 'pump1':
      using = pump1;
      break;
    case 'pump2':
      using = pump2;
      break;
    case 'pump3':
      using = pump3;
      break;
    case 'pump4':
      using = pump4;
      break;
    case 'pump5':
      using = pump5;
      break;
    case 'pump6':
      using = pump6;
      break;
    default:
      using = null;
      break;
  }
  return using;
}