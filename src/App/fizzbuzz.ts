import * as readline from 'readline';

// Create an interface for input and output streams
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to display fizzBuzz
function fizzBuzzInteractive(): void {

    rl.question('Please enter a number: ', (input) => {
        const number = parseFloat(input);

        if (isNaN(number) || number < 0) {
            console.log('That is not a valid positive number. Please try again.');
            fizzBuzzInteractive(); // Ask again if input is invalid
        } else {
            console.log(`You entered: ${number}`);
            rl.close(); // Close the readline interface
            processInput(number);
        }
    });
}




function processInput(number: number) {
    for (let i = 0; i <= number; i++) {
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
fizzBuzzInteractive();
