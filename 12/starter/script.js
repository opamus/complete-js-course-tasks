'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-07-17T17:01:17.194Z',
    '2022-07-18T23:36:17.929Z',
    '2022-07-21T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDates = (date, locale) => {
  const calcDaysPassed = (date1, date2) => {
    return Math.round(Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)));
  };

  const daysPassed = calcDaysPassed(new Date(), date);
  // console.log(daysPassed);
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();

  // if (daysPassed === 0) {
  //   return 'Today';
  // } else if (daysPassed === 1) {
  //   return 'Yesterday';
  // } else if (daysPassed <= 7) {
  //   return `${daysPassed} days ago`;
  // }

  //   return `${day}/${month}/${year}`;

  return daysPassed === 0
    ? 'Today'
    : daysPassed === 1
    ? 'Yesterday'
    : daysPassed <= 7
    ? `${daysPassed} days ago`
    : new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = (value, locale, currency) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const startLogOutTimer = () => {
  // Set time
  let time = 60 * 5;

  const tick = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to the UI
    labelTimer.textContent = `${min}:${seconds}`;

    // When timer hits 0, stop timer and log out the current user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }
    // Decrease 1s every second
    time--;
  };
  // Call the timer every second to update
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDates(date, account.locale);
    const formattedMov = formatCur(mov, account.locale, account.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formattedMov = formatCur(acc.balance, acc.locale, acc.currency);
  labelBalance.textContent = formattedMov;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// /// Fake always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // // Create current date and time
    const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const minutes = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${minutes}`;

    // Experimenting with intl (internationalization) API
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    // const locale = navigator.language; // How to get browser locale
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);

    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Timer
    if (timer) clearInterval(timer);

    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(() => {
      currentAccount.movements.push(amount);

      // Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Timer
      if (timer) clearInterval(timer);

      timer = startLogOutTimer();

      // Update UI
      updateUI(currentAccount);
    }, 3000);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    // console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// console.log(23 === 23.0);

// // Base 10 - 0 to 9. 1/10 = 0.1. 3/10 = 3.3333333
// // Binary base 2 - 0 1
// console.log(0.1 + 0.2); // = 0.30000000000000004
// console.log(0.1 + 0.2 === 0.3); // false

// // Convert string to number
// console.log(Number('23'));
// console.log(+'23'); // Type coercion

// // Parsing
// console.log(Number.parseInt('30px', 10));
// console.log(Number.parseInt('e23', 10)); // Doesn't work

// console.log(Number.parseFloat(' 2.5rem'));
// console.log(Number.parseInt('2.5rem  '));
// console.log(parseFloat('2.5rem  ')); // This works too

// // Check if value is not a number(NaN)
// console.log(Number.isNaN(20));
// console.log(Number.isNaN('20'));
// console.log(Number.isNaN(+'20X'));
// console.log(Number.isNaN(23 / 0));

// // Is finite (if value is a number)
// console.log(Number.isFinite(20));
// console.log(Number.isFinite('20'));
// console.log(Number.isFinite(+'20x')); // NaN
// console.log(Number.isFinite(23 / 0));

// console.log(Number.isInteger(23));
// console.log(Number.isInteger(23.0));
// console.log(Number.isInteger(23 / 0));

// console.log(Math.sqrt(25)); // Square root
// console.log(25 ** (1 / 2)); // Square root
// console.log(8 ** (1 / 3)); // Cubic root

// console.log(Math.max(5, 18, 23, 11, 2));
// console.log(Math.max(5, 18, '23', 11, 2));
// console.log(Math.max(5, 18, '23px', 11, 2)); // Doesn't work

// console.log(Math.min(5, 18, 23, 11, 2));

// console.log(Math.PI * Number.parseFloat('10') ** 2); // Area of circle of radius 10

// console.log(Math.trunc(Math.random() * 6) + 1);
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min) + 1) + min;
// console.log(randomInt(10, 20));

// // Rounding integers
// console.log(Math.trunc(15.532));
// console.log(Math.round(15.532));

// console.log(Math.ceil(23.3));
// console.log(Math.ceil(23.9));

// console.log(Math.floor(23.3));
// console.log(Math.floor('23.9')); // All these methods to type coercion

// console.log(Math.trunc(-23.3));
// console.log(Math.floor(-23.3));

// // Rounding decimals
// console.log((2.7).toFixed(0)); // Returns a string
// console.log((2.7).toFixed(3)); // 3 decimals
// console.log((2.345).toFixed(2));
// console.log(+(2.345).toFixed(2));

// console.log(5 % 2); // Remainder operator 5/2 = 2.5 = 2 and 1 remain (2*2+1)
// console.log(8 % 3); // 3*2+(2)
// console.log(8 / 3); // 8 = 2 * 3 + remainder (2)

// // Check even or odd
// // Number is even when Num % 2 = 0 else it's odd

// const isEven = num => num % 2 === 0;

// console.log(isEven(15));
// console.log(isEven(14));
// console.log(isEven(18));

// labelBalance.addEventListener('click', () => {
//   [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
//     if (i % 2 === 0) row.style.backgroundColor = 'lightgrey'; // 0, 2 ,4 ,6 ...
//     if (i % 3 === 0) row.style.backgroundColor = 'orangered'; // 0, 3, 6, 9 ...
//   });
// });

// // Numeric separators
// const diameter = 287_460_000_000;
// console.log(diameter);

// const price = 345_99; // Cents
// console.log(price);

// const transferFee = 15_00;
// const transferFee2 = 1_500;
// console.log(transferFee, transferFee2);

// const PI = 3.1415; // Not in the beginning, end or 2 in a row, or next to decimal point on either side
// console.log(PI);

// console.log(Number('230_000')); // Returns NaN, so it doesn't parse like expected
// console.log(Number.parseInt('230_000')); // Returns 230

// // Big Int
// console.log(2 ** 53 - 1); // Biggest number js can safely interpret
// console.log(Number.MAX_SAFE_INTEGER); // Same thing
// console.log(2 ** 53 + 3); // Calculations on bigger numbers might lose precision

// console.log(343342324234234234982309480284280239840284n);
// console.log(BigInt(343342324234234234982309480284280239840284)); // Doesn't really work on really huge numbers

// // Operators on big int
// console.log(10000n + 10000n); // works just the same as normal calculations
// console.log(
//   12402390423098243089243098234089423089n *
//     234230830490894230984309824092843043n
// );

// // console.log(Math.sqrt(16n)); // Doesn't work
// const huge = 129034023809234809340932409234n;
// const num = 23;
// console.log(huge * BigInt(num)); // Cannot mix bigInt and other types

// console.log(20n > 15); // this still works
// console.log(20n === 20); // false because no type coercion, different type
// console.log(typeof 20n);
// console.log(20n == '20'); // Type coercion here

// console.log(huge + ' is REALLY big');

// // Divisions
// console.log(10n / 3n); // Will return the closest bigInt so cut off the decimal part
// console.log(10 / 3);

// Create a date object
// const now = new Date();
// console.log(now);

// console.log(new Date('Jul 19 2022 21:36:00'));
// console.log(new Date('December 24, 2015'));
// console.log(new Date('Jul 19 2022'));
// console.log(new Date(account1.movementsDates[0]));
// console.log(new Date(2037, 10, 19, 15, 23, 5)); // Month is zero-based
// console.log(new Date(2037, 10, 33)); // Autocorrect

// console.log(new Date(0)); // 0 milliseconds after unix based time
// console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days after

// Working with dates
// const future = new Date(2037, 10, 19, 15, 23);
// console.log(future);
// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay()); // day of the week
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.toISOString());
// console.log(future.getTime()); // Milliseconds after unix based time
// console.log(new Date(2142249780000)); // Same as date of "future"

// console.log(Date.now());

// future.setFullYear(2040); // Set year to 2040
// console.log(future);
// There also exist setMonth, SetDate etc

// const future = new Date(2037, 10, 19, 15, 23);
// // console.log(+future);
// console.log(Number(future));

// const calcDaysPassed = (date1, date2) => {
//   return Math.abs((date2 - date1) / (1000 * 60 * 60 * 24));
// };

// const days1 = calcDaysPassed(
//   new Date(2037, 3, 14),
//   new Date(2037, 3, 4, 10, 8)
// );
// console.log(days1);

// // If you need precise calculations with daylight savings etc. you can use Moment

// // Reverse string
// const string = 'str';
// console.log(string.split('').reverse().join(''));

// // Sum 2D array
// const arr2d = [
//   [1, 2, 4, 5, 6],
//   [1, 2, 4, 5, 6],
// ];
// let val = 0;
// for (const item of arr2d) {
//   for (const d of item) {
//     val += d;
//   }
// }
// console.log(val);

// Number internationalization
// const num = 23.32;
// // const options = {
// //   style: 'unit',
// //   unit: 'mile-per-hour',
// // };
// // const options = {
// //   style: 'percent',
// // };
// const options = {
//   style: 'currency',
//   currency: 'EUR',
//   // useGrouping: false,
// };
// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl

// console.log('US:      ', new Intl.NumberFormat('en-US', options).format(num));
// console.log('Germany: ', new Intl.NumberFormat('de-DE', options).format(num));
// console.log('Finland: ', new Intl.NumberFormat('fi-FI', options).format(num));
// console.log('Syria:   ', new Intl.NumberFormat('ar-SY', options).format(num));
// console.log(
//   navigator.language,
//   new Intl.NumberFormat(navigator.language, options).format(num)
// );

// // setTimeout
// // Code will not stop running while js is waiting for the timeout (asyncronous javascript)
// // Arguments can be given after the delay argument in setTimeout
// const ingredients = ['olives', 'pineapple'];
// const pizzaTimer = setTimeout(
//   (ing1, ing2) => {
//     return console.log(`Pizza with ${ing1} and ${ing2} arrived :)`);
//   },
//   3000,
//   ...ingredients
// );
// console.log('Waiting...');

// if (ingredients.includes('spinach')) clearTimeout(pizzaTimer); // How to clear timeout

// // setInterval
// setInterval(() => {
//   const now = new Date();
//   const formattedTime = new Intl.DateTimeFormat(account1.locale, {
//     timeStyle: 'medium',
//   }).format(now);
//   console.log(formattedTime);
// }, 1000);
