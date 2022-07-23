'use strict';

const oneWord = str => {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = str => {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher order number (Kind of delegates the real functionality to lower level functions but can still contain logic inside)
const transformer = (str, fn) => {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`); // Get the function name that was passed to the higher order function
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// THIS IS REALLY COMMON
// Callback function
const high5 = () => {
  console.log('Heya');
};
// Higher order function
document.body.addEventListener('click', high5);

['Jonas', 'Martha', 'Adam'].forEach(high5);

// First class functions =
// Functions are simply values that can be passed as arguments or used in objects, or returned from other functions

// Higher order functions =
// Function that takes another function as a parameter or that returns a new function or both. Possible because of First class functions

const greet = () => console.log('Hey Jonas'); // Regular function
btnClose.addEventListener('click', greet); // Higher order function that returns another function = callback function

const count = () => {
  // Higher order function
  let counter = 0;
  return function () {
    // Returned function
    counter++;
  };
};

const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 234252442,
};

const checkIn = (flightNum, passenger) => {
  flightNum = 'LH999';
  passenger.name = 'Mr.' + passenger.name;

  if (passenger.passport === 234252442) {
    alert('Check In');
  } else {
    alert('Wrong passport');
  }
};

// checkIn(flight, jonas);
// console.log(flight, jonas); // String is a primitive to flightNum is just a copy of flight
// For object: only the reference is copied so modifying something inside the reference will edit the original object

const newPassport = person => {
  person.passport = Math.trunc(Math.random() * 10000000000);
};

newPassport(jonas);
checkIn(flight, jonas);
console.log(jonas);

// Be wary of manipulating data inside functions as it will cause bugs

const bookings = [];

// Default values
const createBooking = (
  flightNumber,
  numPassengers = 1,
  price = 199 * numPassengers
) => {
  const booking = {
    flightNumber,
    numPassengers,
    price,
  };

  bookings.push(booking);
};

createBooking('LH123', 2, 300);
createBooking('LH123');
createBooking('LH123', 3);
createBooking('LH123', 5);
createBooking('LH123', undefined, 1000);

console.log(bookings);

// Returning a function inside a function
// Functional programming uses these concepts
// const greet = greeting => name => {
//   console.log(`${greeting} ${name}`);
// };
const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

// Call the function and the function inside it
greet('Hello')('Jonas');

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
  },
};

lufthansa.book(239, 'Olli L');
lufthansa.book(635, 'Mike Smith');
console.log(lufthansa.bookings);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

// Call Method
const book = lufthansa.book;
book.call(eurowings, 23, 'Sarah Williams');
book.bind(eurowings)(33, 'Wendy Williams');
console.log(eurowings.bookings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Airlines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');
console.log(swiss);

// Apply method
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
// Exactly the same as above
book.call(swiss, ...flightData);

// Bind method
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);
bookEW(23, 'Steven Williams');

// Partial application
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Jesus Gonzales');
bookEW23('Martha Cooper');

// With Event Listeners
lufthansa.planes = 300;

lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// lufthansa.buyPlane();
// console.log(lufthansa.planes);

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

//////////////////////////////////

// Partial application
// const addTax = (rate, value) => value + value * rate;
// console.log(addTax(0.1, 200));

// // Note that you can only preset the values in the correct order.
// const addVAT = addTax.bind(null, 0.23);
// console.log(addVAT(400));
// console.log(addVAT(300));

// Rewrite this partial application part by using function returning another function
// Looks confusing
// const addTaxRate = rate => value => value + value * rate;
// Better way
// AddTaxRate is the higher order function, and value is the lower order function
const addTaxRate = rate => {
  return value => {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

///////////////////////////////////////
// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. 
Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! 
So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

// // 1, 3, 4
// const poll = {
//   question: 'What is your favourite programming language',
//   options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
//   answers: new Array(4).fill(0),

//   registerNewAnswer() {
//     // const optionMap = this.options.map(lang => `\n${lang}`);
//     const answer = Number(
//       prompt(
//         `${this.question}? \n${this.options.join('\n')} \n(Write option number)`
//       )
//     );

//     answer >= 0 && answer < this.options.length && typeof answer === 'number'
//       ? this.answers[answer]++
//       : console.log('Try again bozo, with proper numbers');
//     this.displayResults.call(poll, this.answers);
//   },

//   displayResults(type) {
//     console.log(
//       typeof type === 'string' ? `Poll results are in: ${type}` : type
//     );
//   },
// };

// // 2
// document
//   .querySelector('.poll')
//   .addEventListener('click', poll.registerNewAnswer.bind(poll));

// // Bonus
// poll.displayResults.call(poll, [5, 2, 3]);
// poll.displayResults.call(poll, [1, 5, 3, 9, 6, 1]);

// const runOnce = () => {
//   console.log('This will never run again');
// };

// runOnce();

// IIFE
// Immediately invoked function expression
// (() => console.log('This will never run again'))();

// (function () {
//   console.log('This will ALSO never run again');
//   // const isPrivate = 23; // Inside of a scope so it's private, incapsulated
// })();

// // console.log(isPrivate);
// {
//   const isPrivate = 23; // This cannot be accessed outside either, scoped
//   var notPrivate = 45;
// }

// console.log(notPrivate);

// Closure example
const secureBooking = () => {
  let passengerCount = 0;

  return () => {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

// Closures make the function remember all the variables that existed at the functions birthplace
booker(); // Booker function modifies the passengerCount that is private inside secureBooking (Closures)
booker(); // 2 passengers (JS looks for closure to see if it can find the original variable environment)
booker(); // 3 passengers

// A function has access to the variable environment of the execution context in which it was created
// A closure is this variable environment attached to the the function as it was when it was created

console.dir(booker);

// More closure examples
let f;

const g = () => {
  const a = 23;
  f = () => console.log(a * 2);
};

const h = () => {
  const b = 777;
  f = () => console.log(b * 2);
};

g();
f();
console.dir(f);
// Re-assigning f function
h();
f();
console.dir(f);

// Example 2
const boardPassengers = (n, wait) => {
  const perGroup = n / 3; // If this is commented out the perGroup from global scope will be used.
  setTimeout(() => {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups each with ${perGroup} passengers`);
  }, wait * 1000);
  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000; // This will be used if perGroup in boardPassengers is commented out
boardPassengers(180, 3);

///////////////////////////////////////
// Coding Challenge #2

/* 
This is more of a thinking challenge than a coding challenge 🤓

Take the IIFE below and at the end of the function, attach an event listener that changes 
the color of the selected h1 element ('header') to blue, each time the BODY element is clicked. 
Do NOT select the h1 element again!

And now explain to YOURSELF (or someone around you) WHY this worked! 
Take all the time you need. Think about WHEN exactly the callback function is executed, 
and what that means for the variables involved in this example.

GOOD LUCK 😀
*/

// Immediately invoked function expression = IIFE
(() => {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  document.querySelector('body').addEventListener('click', () => {
    header.style.color = 'blue';
  });
})();
