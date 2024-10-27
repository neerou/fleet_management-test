"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
// Create an interface for input and output streams
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
// Function to display fizBuzz
function fizzBuzzInteractive() {
    rl.question('Please enter a number: ', function (input) {
        var number = parseFloat(input);
        if (isNaN(number)) {
            console.log('That is not a valid number. Please try again.');
            fizzBuzzInteractive(); // Ask again if input is invalid
        }
        else {
            console.log("You entered: ".concat(number));
            rl.close(); // Close the readline interface
            processInput(number);
        }
    });
}
fizzBuzzInteractive();
function processInput(number) {
    for (var i = 0; i <= number; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log('FizzBuzz');
            continue;
        }
        if (i % 3 === 0) {
            console.log('Fizz');
            continue;
        }
        if (i % 5 === 0) {
            console.log('Buzz');
            continue;
        }
        console.log(i);
    }
}
