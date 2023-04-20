// const generator = document.querySelector('h2')
// const rainbow = [
//     "red",
//     "orange",
//     "yellow",
//     "green",
//     "blue",
//     "indigo",
//     "violet",
// ];

// let generatorColor = 0;
//   setInterval(() => {
//     generator.style.color = `${rainbow[generatorColor]}`;
//     generatorColor++; 
//     if (generatorColor == rainbow.length-1) {
//     generatorColor = 0;
//     }
//   }, 75);

// Password Generator

// Generator Functions

// Function that accepts a string value as an argument and returns a random index number from that string
function randomIndex(str){
    return Math.floor(Math.random() * str.length);
}

// Checks if the function is working properly
console.log(randomIndex('Chicken')); // 0 through 6

// Returns a random lowercase letter using index
function getRandomLower(){
    const letters = 'abcdefghijklmnopqrstupwxyz';
    // return letters[Math.floor(Math.random) * letters.length];
    return letters[randomIndex(letters)];
}
console.log(getRandomLower());


// Function that returns an uppercase letter
function getRandomUpper(){
    const letter = getRandomLower();
    return letter.toUpperCase();
}
console.log(getRandomUpper());

// Function that returns a random number as a string value
function getRandomNumber(){
    const numbers = '0123456789';
    return numbers[randomIndex(numbers)];
}
console.log(getRandomNumber());

// Function that returns a random symbol
function getRandomSymbol(){
    const symbols = `~!@#$%^&*()_+{}:"<>?-=[]',./`
    return symbols[randomIndex(symbols)];
}
console.log(getRandomSymbol());

// Object to store all the character generator functions
const randomFunctions = {
    lower: getRandomLower(),
    upper: getRandomUpper(),
    number: getRandomNumber(),
    symbol: getRandomSymbol(),
}

// Selecting DOM Elements
const resultEl = document.querySelector('#results');
const cliboardEl = document.querySelector('#clipboard');
const lowercaseEl = document.querySelector('#lowercase');
const uppercaseEl = document.querySelector('#uppercase');
const numbersEl = document.querySelector('#numbers');
const symbolsEl = document.querySelector('#symbols');
const lengthEl = document.querySelector('#length');
const generateEl = document.querySelector('#generate');

// Generate Password Function (accepts true or false values as well as a number as an argument)
// Checkbox inputs and number (length) input will determine the value/arguments entered into this function
function generatePassword(lower, upper, number, symbol, length){
    // 1. Create the password variable
    let generatedPassword = '';

    // 2. Filter out unchecked options
    // True and False values can be added together (true is equal to 1, false is equal to 0)
    // The value set to the typesCount variable will be used when building out the password
    const typesCount = lower + upper + number + symbol;
    
    // If the user has not selected an option, the alert will be displayed and an empty string will be returned from the function so that the password displays to the user will be an empty string
    if (typesCount === 0){
        alert('Please select at least one option');
        return '';
    }
    
    // Create an array of arrays. The first item in each nested array holds the value of a string that will be used to access a function in the randomFunctions object. The second item in each nested array are the values passed into this function (generatePassword())
    let typesArr = [
        ['lower', lower],
        ['upper', upper],
        ['number', number],
        ['symbol', symbol],
    ];
    console.log('typesArr', typesArr);
    
    // The filter method here creates a new array with all the items that pass "the test" implemented b y the provided function (All the items that cause the function to return a boolean value of true when the function is run using the item as the argument for the item parameter)
    // Checking if the value for index of 1 in each item in the typesArr array is true or false. Also removing the item from the typesArr array if it is false
    typesArr = typesArr.filter((item) => {
        console.log('item[1]', item[1]);
        return item[1];
    })
    
    // 3. Loop over the length and call the generator function for each checked option
    // The value for length is the value entered for the length number input
    for (i=0; i<length ; i+=typesCount){
        typesArr.forEach((type) => {
            const funcName = type[0];
            console.log('funcName', funcName);
            // Accessing and Running the functions in the randomFunctions object. Also, concatenating the value returns from the accessed function to the generatedPassword string
            generatedPassword += randomFunctions[funcName]();
            console.log('generatedPassword', generatedPassword);
        });
    }
    
    // Add generatedPassword to the finalPassword variable and return it from the function
    const finalPassword = generatedPassword.slice(0, length);
    console.log('finalPassword', finalPassword);
    
    
    console.log('typesArr', typesArr);
    console.log('typesCount', typesCount);
    return finalPassword;
    











}
// generatePassword();

// Event Listener for when the Generate Password button is clicked
generateEl.addEventListener('click', ()=>{
    // Checking if the following options are checked and the true false values to the respective variables
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    // Accessing the value for the number input and changing the value from a string to a number
    const length = parseInt(lengthEl.value);

    // The generatePassword function takes the true/false values determined by the checkboxes as well as the number from the number input (length), as arguments and returns the finalPassword string. Then it is set to the innerText of the resultEl
    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
});

