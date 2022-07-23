'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4]; // Array of objects

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = (acc, sort = false) => {
  containerMovements.innerHTML = '';
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach((movement, i) => {
    const type = movement > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${movement.toFixed(2)}€</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = acc => {
  const balance = acc.movements.reduce((acc, curr) => acc + curr, 0);
  labelBalance.textContent = `${balance.toFixed(2)} €`;
  acc.balance = balance;
  return balance;
};

const calcDisplaySummary = acc => {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr);
  const out = Math.abs(
    acc.movements.filter(mov => mov < 0).reduce((acc, curr) => acc + curr)
  );

  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${out}€`;

  const interestRate = acc.interestRate / 100;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * interestRate)
    .filter(int => int >= 1)
    .reduce((acc, curr) => acc + curr);
  labelSumInterest.textContent = `${interest}€`;
};

// Does not return anything (produces a side effect)
const convertUserNames = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
convertUserNames(accounts);

const updateUI = currAcc => {
  // Update movements
  displayMovements(currAcc);
  // Calculate and display balance
  calcDisplayBalance(currAcc);
  // Calculate and display summary
  calcDisplaySummary(currAcc);
};

// Event handlers
let currentAccount;

btnLogin.addEventListener('click', e => {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('Login successful');
    // Display UI and message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;
    // Clear input field focus
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    currentAccount.username !== receiverAcc.username
  ) {
    console.log('Transfer valid');
    // Push movements for accounts
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }

  // Lose focus
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
  inputTransferAmount.blur();
});

btnLoan.addEventListener('click', e => {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  console.log('Loan requested', amount);
  console.log(currentAccount);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= 0.1 * amount)) {
    currentAccount.movements.push(amount);

    updateUI(currentAccount);
    inputLoanAmount.value = '';
    inputLoanAmount.blur();
  } else {
    console.log('Denied :(');
  }
});

btnClose.addEventListener('click', e => {
  e.preventDefault();
  console.log('Remove was clicked');

  if (
    String(inputCloseUsername.value) === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, index + 1);
    containerApp.style.opacity = 0;
  }
  inputClosePin.value = '';
  inputCloseUsername.value = '';
});

let btnSortState = false;
btnSort.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount, !btnSortState);
  // Set sort to false when it's true and true when it's false
  btnSortState = !btnSortState;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// // Slice method
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4)); // End parameter is not included in the output so 2, 4 means 2 and 3
// console.log(arr.slice(-1));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));
// console.log(arr.slice()); // Create a shallow copy
// console.log([...arr]); // Same result with spread operator

// // Splice method
// // Mutates original array, used mostly for just removing stuff from array
// // console.log(arr.splice(2)); // removes from original array
// // console.log(arr); // ['a', 'b']

// arr.splice(-1); // Removes last item
// arr.splice(1, 2); // Position, amount deleted
// console.log(arr); // ['a']

// // Reverse method
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse()); // Mutates original array
// console.log(arr2);

// // Concat method
// const letters = arr.concat(arr2); // Adds the arrays together, doesn't mutate
// console.log(letters);
// console.log([...arr, ...arr2]); // Same result, doesn't mutate either

// // Join method
// console.log(letters.join(' - ')); // Specify separator and join array items into a string, doesn't mutate original array
// console.log(letters);

// // At method
// const arr3 = [23, 11, 55];
// console.log(arr3[0]); // Same thing as this
// console.log(arr3.at(0));
// // Getting the last element
// console.log(arr3[arr3.length - 1]);
// console.log(arr3.slice(-1)[0]);
// console.log(arr3.at(-1));
// console.log(arr3.at(-2));
// console.log(arr3.at(-3));
// // Works on strings too
// const str = 'Jonas';
// console.log(str.at(0));
// console.log(str.at(-1));

// ForEach
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const [index, movement] of movements.entries()) {
//   // for (const movement of movements) {
//   // For of loop with same functionality
//   if (movement > 0) {
//     console.log(`Movement ${index + 1} : deposit ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1} : withdraw ${Math.abs(movement)}`);
//   }
// }

// console.log('-----FOREACH-----');

// movements.forEach((movement, index, array) => {
//   // ORDER IS IMPORTANT (element, index, original array)
//   // Requires a callback function
//   if (movement > 0) {
//     console.log(`Movement ${index + 1} : deposit ${movement}`);
//   } else {
//     console.log(`Movement ${index + 1} : withdraw ${Math.abs(movement)}`);
//   }
// });
// // Calls the callback function for each value of the array
// // Can't break out of forEach loop at all

// Map = [[key, value]]
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach((currency, i, map) => {
//   console.log(`${currency} on position ${i}`);
// });

// // Set =
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach((currency, _, set) => {
//   // Same arguments but the 2 is the same as 1
//   console.log(`${currency} : ${currency}`); // KEY is the same as value since set doesn't have keys or indexes
// });

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, 
and stored the data into an array (one array for each). For now, they are just interested in knowing whether a 
dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs 
actually have cats, not dogs! So create a shallow copy of Julia's array
and remove the cat ages from that copied array (because it's a bad practice to 
mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult 
("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// const arr1 = [3, 5, 2, 12, 7]; // Julias data 1
// const arr2 = [4, 1, 15, 8, 3]; // Kates data 1
// const arr3 = [9, 16, 6, 8, 3]; // J2
// const arr4 = [10, 5, 6, 1, 4]; // K2

// const checkDogs = (dogsJulia, dogsKate) => {
//   // 1
//   const dogsJuliaFixed = dogsJulia.slice(1).slice(0, -2);
//   // 2
//   const allDogs = [...dogsJuliaFixed, ...dogsKate];
//   console.log('All dog ages: ' + allDogs);
//   // 3
//   allDogs.forEach((dogAge, i) => {
//     dogAge >= 3
//       ? console.log(
//           `Dog number ${i + 1} is an adult, and is ${dogAge} years old.`
//         )
//       : console.log(`Dog number ${i + 1} is still a puppy 🐶`);
//   });
// };

// checkDogs(arr1, arr2);
// console.log('-------- SPLIT ---------');
// checkDogs(arr3, arr4);

// // const test = [1, 2, 3, 4];

// // test.map((arr, i) => {
// //   console.log(arr * 2);
// //   // console.log(i);
// // });

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurtoUsd = 1.1;

// const movementsUSD = movements.map(val => Math.trunc(val * eurtoUsd));
// console.log(movementsUSD); // Map returns a new array
// console.log(movements);

// // For loop to get the same result
// const arr = [];
// for (const mov of movements) {
//   arr.push(Math.trunc(mov * eurtoUsd));
// }
// console.log(arr);

// const movDesc = movements.map(
//   (val, i) =>
//     `Movement ${i + 1}: You ${val > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
//       val
//     )}`
// );
// console.log(movDesc);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // filter also gets access to indexes and the whole array but is very rarely used
// const deposits = movements.filter(mov => mov > 0);

// console.log(deposits);

// const newArr = [];
// for (const mov of movements) {
//   if (mov > 0) newArr.push(mov);
//   // mov > 0 ?? newArr.push(mov); Doesn't work because it returns and we don't want a return here
// }
// console.log(newArr);

// const withdrawals = movements.filter(mov => mov < 0);
// console.log(withdrawals);

// // Accumulator is a snowball
// const globalBalance = movements.reduce((acc, cur, i, arr) => {
//   console.log(`Iteration number ${i}: Accumulator value is ${acc}`);
//   return acc + cur;
// }, 0); // Accumulator value in first iteration

// // const globalBalance = movements.reduce((acc, cur) => acc + cur, 0);

// console.log(globalBalance);
// console.log(200 + 450 - 400 + 3000 - 650 - 130 + 70 + 1300);

// let newVal = 0;
// for (const [i, mov] of movements.entries()) {
//   console.log(`Loop number ${i}: Value is ${newVal} and ${mov} is being added`);
//   newVal += mov;
// }
// console.log(newVal);

// Maximum value of movements array
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300, 120, 124000];

// const biggestMovement = movements.reduce((acc, curr) => {
//   // if (curr > acc) {
//   //   acc = curr;
//   // }
//   // return acc;
//   if (acc > curr) return acc;
//   else return curr;
// }, movements[0]);

// console.log(biggestMovement);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human 
ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, 
humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

// // 1, 2, 3
// const calcAverageHumanAge = ages => {
//   const humanAges = ages.map(age => {
//     if (age <= 2) {
//       return age * 2;
//     } else {
//       return age * 4 + 16;
//     }
//   });
//   const filteredAges = humanAges.filter(age => age > 18);
//   const averageHumanAges = filteredAges.reduce((acc, curr) => acc + curr, 0);

//   return `Average age of dogs over 18 human years: ${
//     averageHumanAges / filteredAges.length
//   }`;
// };

// // 4
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const eurtoUsd = 1.1;

// // Pipeline
// const totalDepositsUSD = Math.floor(
//   movements
//     .filter(mov => mov > 0) // Positive
//     .map(mov => mov * eurtoUsd) // Convert
//     .reduce((acc, mov) => acc + mov, 0) // Add
// );
// // This is hard to debug
// console.log(totalDepositsUSD);

// const totalDepositsUSD = Math.floor(
//   movements
//     .filter(mov => mov < 0) // Positive
//     .map((mov, i, arr) => {
//       // Log the whole arr here for clarity
//       console.log(arr);
//       return mov * eurtoUsd;
//     }) // Convert
//     .reduce((acc, mov) => acc + mov, 0) // Add
// );

// // console.log(totalDepositsUSD);

// // Coding challenge #3 ///////////////////////
// // 1
// const calcAverageHumanAge = ages =>
//   ages
//     .map(age => (age <= 2 ? age * 2 : age * 4 + 16))
//     .filter(age => age > 18)
//     .reduce((acc, curr, _i, arr) => acc + curr / arr.length, 0);

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// Find method
// const movements = [200, 450, -400, 3000, -650, -130];
// const element = movements.find(val => {
//   return val < 0;
// });
// Returns first element in the array that satisfies the condition
// Filter returns a new array, find returns only the element

// console.log(element);

// console.log(accounts);

// // Find method is used to find only 1 object or element so the conditional usually is for that 1 only
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

// // Same functionality with a for of loop
// let acct = {};
// for (const [i, acc] of accounts.entries()) {
//   if (acc.owner === 'Jessica Davis') {
//     acct = accounts[i];
//   }
// }
// console.log(acct);

// input: ['cat', 'car', 'bar'];
// function setup(input)
// function isInDict(word)

// const sum = (...numbers) =>
//   numbers.reduce((acc, curr) => {
//     return acc + curr;
//   });

// console.log(sum(1, 2, 3, 4)); // 10
// console.log(sum(1, 5, 6, 7, 8, 9, 12));

// const stringIncludes = (str, str2) => {
//   const lowercaseStr = str.toLowerCase();
//   return lowercaseStr.includes(str2.toLowerCase());
// };

// console.log(
//   stringIncludes('I drove to New York in a van with my friend', 'new')
// );
// console.log(
//   stringIncludes('I drove to New York in a van with my friend', 'neuv')
// );
// console.log(
//   stringIncludes('I drove to New York in a van with my friend', 'Drove')
// );

// const getNames = arr => {
//   let arr2 = [];
//   arr.forEach(item => {
//     item.name && arr2.push(item);
//   });
//   return arr2;
//   // const arr2 = arr.filter((item, i) => {
//   //   arr2.includes(item.name);
//   // });
//   // return arr2;
// };

// console.log(
//   getNames([
//     { a: 1 },
//     { name: 'Jane' },
//     {},
//     { name: 'Joanna' },
//     { name: 'Devin' },
//     { b: 2 },
//   ])
// );

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(movements);
// // INCLUDES = Tests for equality
// console.log(movements.includes(-130));
// // SOME = Tests condition IF THERE IS SOME VALUE THAT FILLS THIS CONDITION
// const test = movements.some(movement => {
//   return movement > 5000;
// });

// console.log(test);

// // EVERY = If every element passes the condition in our callback function returns true, else false
// console.log(account4.movements.every(mov => mov > 0));

// // Separate callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
// console.log(movements.every(deposit));
// console.log(movements.filter(deposit));

// // flat and flatMap
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arr.flat());
// console.log(arrDeep.flat(2));

// const accountMovements = accounts.map(mov => mov.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overallBalance);

// // const overallBalance = accounts
// //   .map(acc => acc.movements)
// //   .flat()
// //   .reduce((acc, mov) => acc + mov, 0);

// // flatMap example = maps and uses flat(1)
// const flatMapEx = accounts.flatMap(acc => acc.movements);
// console.log(flatMapEx);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // SORTING = MUTATES
// // Strings
// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);

// // Numbers
// console.log(movements);
// // return < 0, A, B (keep order)
// // return > 0, B, A (switch order)

// // Ascending
// // movements.sort((a, b) => {
// //   if (a > b) return 1;
// //   if (b > a) return -1;
// // });

// // Simplified with math to use only with numbers
// movements.sort((a, b) => a - b);
// console.log(movements);

// // Descending
// // movements.sort((a, b) => {
// //   if (a > b) return -1;
// //   if (b > a) return 1;
// // });
// // Simplified with math to use only with numbers
// movements.sort((a, b) => b - a);
// console.log(movements);
// // Sort changes the values to strings and then sorts

// const y = [1, 2, 3, 4, 5, 6, 7];
// console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// // Empty array of length 7
// const x = new Array(7);
// console.log(x);
// // Fill method
// // x.fill(1);
// // Value, start, end
// // Can be used in full arrays as well
// x.fill(1, 3, 5);
// console.log(x);

// y.fill(23, 4, 6);
// console.log(y);

// // Array.from
// const z = Array.from({ length: 7 }, () => 1);
// console.log(z);

// const arr = Array.from({ length: 7 }, (_cur, i) => i + 1);
// console.log(arr);

// // 100 random dice rolls
// const diceRolls = Array.from({ length: 100 }, _cur =>
//   Math.floor(Math.random() * 6 + 1)
// );
// console.log(diceRolls);

// labelBalance.addEventListener('click', () => {
//   // Convert array from UI objects values
//   const movementsUI = Array.from(
//     // Using map right after querySelectorAll wouldn't work
//     document.querySelectorAll('.movements__value'),
//     e => Number(e.textContent.replace('€', ''))
//   );
//   console.log(movementsUI);

//   const movementsUI2 = [...document.querySelectorAll('.movements__value')];
//   console.log(movementsUI2.map(el => el.textContent));
// });

// Coding challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. 
Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. 
(The result is in grams of food, and the weight needs to be in kg)

2. Find Sarah's dog and log to the console whether it's eating too much or too little. 
HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓

3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').

4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" 
and "Sarah and John and Michael's dogs eat too little!"

5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)

6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)

7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)

8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order 
(keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// // 1
// dogs.forEach(dog => {
//   const recommendedFood = Math.floor(dog.weight ** 0.75 * 28);
//   dog.recommendedFood = recommendedFood;
// });
// console.log(dogs);

// // 2
// const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
// console.log(
//   sarahDog.curFood > sarahDog.recommendedFood
//     ? 'Sarahs dog is eating too much'
//     : 'Sarahs dog is not eating enough'
// );

// // 3
// const ownersEatTooMuch = dogs
//   .filter(dog => dog.curFood > dog.recommendedFood)
//   .flatMap(dog => dog.owners);
// const ownersEatTooLittle = dogs
//   .filter(dog => dog.curFood < dog.recommendedFood)
//   .flatMap(dog => dog.owners);
// console.log(ownersEatTooMuch);
// console.log(ownersEatTooLittle);

// // 4
// const tooMuchJoined = ownersEatTooMuch.join(' and ');
// const tooLittleJoined = ownersEatTooLittle.join(' and ');
// console.log(
//   `${tooMuchJoined}'s dogs eat too much and ${tooLittleJoined}'s dogs eat too little!`
// );

// // 5
// console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// // 6
// console.log(
//   dogs.some(
//     dog =>
//       dog.curFood > dog.recommendedFood * 0.9 &&
//       dog.curFood < dog.recommendedFood * 1.1
//   )
// );

// // 7
// console.log(
//   dogs.filter(
//     dog =>
//       dog.curFood > dog.recommendedFood * 0.9 &&
//       dog.curFood < dog.recommendedFood * 1.1
//   )
// );

// // 8
// console.log(
//   dogs.slice().sort((dogA, dogB) => dogA.recommendedFood - dogB.recommendedFood)
// );

// // const doggos = [...dogs];
// // console.log(
// //   doggos.sort((dogA, dogB) => {
// //     return dogA.recommendedFood - dogB.recommendedFood;
// //   })
// // );
