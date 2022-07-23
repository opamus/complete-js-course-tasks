'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  // ES6 enhanced object literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time} :)`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}.`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

const airline = 'TAP Air Portugal';
const plane = 'A320';

// console.log(airline.toLowerCase());
// console.log(airline.toUpperCase());

// // Fix capitalization in name

// // const passenger = 'jOnaS';
// // const passengerLower = passenger.toLowerCase();
// // const passengerCorrect =
// //   passengerLower[0].toUpperCase() + passengerLower.slice(1);
// // console.log(passengerCorrect);

// const capitalize = name => {
//   const lower = name.toLowerCase();
//   const corr = lower[0].toUpperCase() + lower.slice(1);
//   console.log(corr);
// };

// capitalize('joNAs');

// // Comparing emails
// const email = 'hello@jonas.io';
// const loginEmail = '  Hello@Jonas.Io \n';

// // const corr = loginEmail.toLowerCase();
// // const trim = corr.trim();

// // const normalizedEmail = loginEmail.toLowerCase().trim();
// // console.log(normalizedEmail);
// // console.log(email === normalizedEmail);

// // Same as above functionized
// const isCorrectEmail = (original, address) => {
//   const normalized = address.toLowerCase().trim();
//   console.log(original === normalized ? true : false);
// };

// isCorrectEmail(email, loginEmail);

// STRINGS VIDEO 2 //////////////////////////////

// // Replacing
// const priceGB = '288,97€';
// const priceUSD = priceGB.replace('€', '$').replace(',', '.');
// console.log(priceUSD);

// const announcement =
//   'All passengers come to boarding door 23. Boarding door 23!';
// console.log(announcement.replace('door', 'gate')); // Replaces only one
// console.log(announcement.replaceAll('door', 'gate')); // Replaces all

// console.log(announcement.replace(/door/g, 'gate')); // Regex, this is the old way this would have been done

// // Booleans
// const plane2 = 'Airbus A320neo';
// console.log(plane2.includes('A320'));
// console.log(plane2.includes('Boeing'));
// console.log(plane2.startsWith('Airb'));

// if (plane2.startsWith('Airbus') && plane2.endsWith('neo'))
//   console.log('Part of the new airbus fam');

// // Practice excercise
// const checkBaggage = items => {
//   const baggage = items.toLowerCase();
//   if (baggage.includes('knife') || baggage.includes('gun')) {
//     console.log("You're not allowed on the plane");
//   } else {
//     console.log('Welcome aboard');
//   }
// };

// checkBaggage('I have a laptop, some Food and a pocket Knife');
// checkBaggage('Socks and camera');
// checkBaggage('Got some snacks and a gun for protection');

// STRINGS VIDEO 3//////////////////////////////

console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');
console.log(typeof firstName, typeof lastName);

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = name => {
  const splitName = name.split(' ');
  const newArr = [];
  for (const item of splitName) {
    // const fullString = item[0].toUpperCase() + item.slice(1);
    const fullString = item.replace(item[0], item[0].toUpperCase()); // Another way to achieve the same result
    newArr.push(fullString);
  }
  console.log(newArr.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');
capitalizeName('olli lehmusvuori');

// Padding
// First argument: length of string and second argument is what will be used to pad the string
const message = 'Go to gate 23!';
console.log(message.padStart(25, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = creditCardNum => {
  const str = creditCardNum + '';
  const last = str.slice(-4);
  console.log(last.padStart(str.length, '*'));
};

maskCreditCard(1234342375648767);
maskCreditCard(17648767);
maskCreditCard('1234342375648767');

// Repeat
const message2 = 'Bad weather... All departures delayed... ';
console.log(message2.repeat(2));

const planesInLine = n => {
  console.log(`There are ${n} planes in line ${'p '.repeat(n)}`);
};

planesInLine(3);
planesInLine(13);
planesInLine(2);

// STRINGS VIDEO 1 //////////////////////////////

// console.log(plane[0]);
// console.log(plane[1]);
// console.log(plane[2]);
// console.log('B737'[0]);

// console.log(airline.length);
// console.log('B737'.length);
// console.log(airline.indexOf('r'));
// console.log(airline.lastIndexOf('r'));
// console.log(airline.indexOf('Portugal'));

// // Slice
// // Does not mutate the original string, but creates a substring = a new string from the old one
// console.log(airline.slice(4));
// console.log(airline.slice(4, 7));

// console.log(airline.slice(0, airline.indexOf(' ')));
// console.log(airline.slice(airline.lastIndexOf(' ') + 1));

// console.log(airline.slice(-2));
// console.log(airline.slice(1, -1));

// const checkMiddleSeat = seat => {
//   // B and E are middle seats
//   const letter = seat.slice(seat.lastIndexOf());
//   // const letter = seat.slice(-1); // Same thing as above
//   console.log((letter === 'B' || letter === 'E') ?? true);
// };

// checkMiddleSeat('11B');
// checkMiddleSeat('23C');
// checkMiddleSeat('3E');

// // String methods return primitives even when a string object is being called
// console.log(new String('jonas'));
// console.log(typeof new String('jonas'));
// console.log(typeof new String('jonas').slice(1)); // Returns string

// Another way to create a map ///////////////////
// const question = new Map([
//   ['question', 'What is the best programming language in the world?'],
//   [1, 'C'],
//   [2, 'Java'],
//   [3, 'JavaScript'],
//   ['correct', 3],
//   [true, 'You win!'],
//   [false, 'Try again!'],
// ]);

// console.log(question);

// // Convert object to map
// console.log(Object.entries(openingHours));
// const hoursMap = new Map(Object.entries(openingHours));
// console.log(hoursMap);

// for (const [key, value] of question) {
//   if (typeof key === 'number') console.log(`Answer ${key} : ${value}`);
// }
// // const answer = Number(prompt('Your answer?'));
// const answer = 2;
// console.log(answer);
// // console.log(
// //   answer === question.get('correct') ? question.get(true) : question.get(false)
// // );
// // Or like this
// console.log(question.get(question.get('correct') === answer));

// // Convert map to an array ////////////////////
// console.log([...question]);
// // console.log([...question.entries()]);
// console.log([...question.keys()]);
// console.log([...question.values()]); // similar to entries

// // Working with maps ///////////////////////
// const rest = new Map();
// rest.set('name', 'Classico Italiano');
// rest.set(1, 'Firenze, Italy');
// // rest.set(2, 'Lisbon, Portugal');
// console.log(rest.set(2, 'Lisbon, Portugal'));

// // Chaining set methods
// rest
//   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
//   .set('open', 11)
//   .set('close', 23)
//   .set(true, 'We are open :D')
//   .set(false, 'We are closed :(');

// // Returning map values by key
// console.log(rest.get('name'));
// console.log(rest.get(true));

// // Useful but not very readable having booleans as map keys
// const time = 21;
// console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// // Check if map has key
// console.log(rest.has('categories'));
// rest.delete(2);
// console.log(rest);
// console.log(rest.size);
// // remove all elements from map
// // rest.clear();

// // Use objects or arrays as map keys
// const arr = [1, 2];
// rest.set(arr, 'Test');
// rest.set(document.querySelector('h1'), 'Heading');
// console.log(rest);

// console.log(rest.get(arr));

// Sets (iterable, elements are unique, order is irrelevant)
// const orderSet = new Set([
//   'Pasta',
//   'Pizza',
//   'Pizza',
//   'Risotto',
//   'Pasta',
//   'Pizza',
// ]);

// console.log(orderSet);
// console.log(new Set('Jonas'));

// Working with sets
// console.log(orderSet.size);
// console.log(orderSet.has('Pizza'));
// console.log(orderSet.has('Bread'));
// orderSet.add('Garlic Bread');
// orderSet.add('Garlic Bread');
// orderSet.delete('Risotto');
// console.log(orderSet);
// // orderSet.clear();
// // console.log(orderSet);

// // Looping is possible
// for (const order of orderSet) {
//   console.log(order);
// }

// // Example : remove duplicates from arrays
// const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
// const staffSet = [...new Set(staff)];
// console.log(staffSet);
// console.log(new Set(staff).size);

// // Example : how many different letters in string
// console.log(new Set('jsajdjjjajsdjjfkafooaookkkasj').size);

// ////////////////////////////

// Count how many unique letters are in this string: jsajdjjjajsdjjfkafooaookkkasj

// // Property NAMES
// const properties = Object.keys(openingHours);
// console.log(properties);
// console.log(`We are open on ${properties.length} days`);

// let openStr = `We are open on ${properties.length} days: `;

// for (const day of properties) {
//   openStr += `${day}, `;
// }

// console.log(openStr);

// // Property VALUES
// const values = Object.values(openingHours);
// console.log(values);

// // Property ENTRIES = Entire object
// const entries = Object.entries(openingHours);
// console.log(entries);

// // Destructuring the array and the object inside the array
// for (const [day, { open, close }] of entries) {
//   console.log(`On ${day} we open at ${open} and close at ${close}.`);
// }

// Object.keys
// Object.values
// Object.entries

// Optional chaining //
// console.log(restaurant.openingHours?.mon?.open);

// // Example
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// days;
// for (const day of days) {
//   const open = restaurant.openingHours?.[day]?.open ?? 'closed';
//   console.log(`On ${day}, we open at ${open} o'clock :)`);
// }

// // Methods
// console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
// console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

// // Arrays
// const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// console.log(users[0]?.name ?? 'User array empty');

// //////////////////////////

// Real world example

// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt('Ingredient 2?'),
//   prompt('Ingredient 3?'),
// ];
// console.log(ingredients);
// restaurant.orderPasta(...ingredients);

// restaurant.orderDelivery({
//   time: '22:30',
//   address: 'Via del Sole, 21',
//   mainIndex: 2,
//   starterIndex: 2,
// });
// restaurant.orderDelivery({
//   address: 'Via del Sole, 21',
//   starterIndex: 1,
// });

// // Spread operator on objects

// const newRestaurant = { foundedIn: 1995, ...restaurant, founder: 'Giuseppe' };
// console.log(newRestaurant);

// const restaurantCopy = { ...restaurant };
// restaurantCopy.name = 'Ristorante Roma';
// console.log(restaurantCopy.name);
// console.log(restaurant.name);

// // DESTRUCTURING OBJECTS //

// const { name, openingHours2, categories } = restaurant;
// console.log(name, openingHours2, categories);

// const {
//   name: restaurantName,
//   openingHours2: hours,
//   categories: tags,
// } = restaurant;

// console.log(restaurantName, hours, tags);

// // Default values
// const { menu = [], starterMenu: starters = [] } = restaurant;
// console.log(menu, starters);

// // Mutating variables
// let a = 111;
// let b = 999;
// const obj = { a: 23, b: 7, c: 14 };
// console.log(obj);

// ({ a, b } = obj);
// console.log(a, b);

// // Nested objects
// console.log(openingHours);
// const {
//   fri: { open: o, close: c },
// } = openingHours;
// console.log(o, c);

// const arr = [7, 8, 9];
// const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
// console.log(badNewArr);

// // Spread operator

// const goodNewArr = [1, 2, ...arr];
// console.log(goodNewArr);

// console.log(...goodNewArr);

// const newMenu = [...restaurant.mainMenu, 'Gnocci'];
// console.log(newMenu);

// // Copy array
// const mainMenuCopy = [...restaurant.mainMenu];
// console.log(mainMenuCopy);

// // Join 2 or more arrays together to a new array
// const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];
// console.log(menu2);

// // Iterables: arrays, strings, maps, sets. NOT OBJECTS
// const string = 'string';
// console.log([...string, ' ', 'S.']);

// // 1) Destructuring

// // SPREAD, because of RIGHT side of =
// const arr3 = [1, 2, ...[3, 4]];

// // REST, because of LEFT side of =
// // Rest element has to be the last and only one in the array
// const [x, y, ...others] = [1, 2, 3, 4, 5];
// console.log(x, y, others);

// const [pizza, , risotto, ...otherFood] = [
//   ...restaurant.mainMenu,
//   ...restaurant.starterMenu,
// ];

// console.log(pizza, risotto, otherFood);

// // Objects

// const { sat, ...weekdays } = restaurant.openingHours;
// console.log(weekdays);

// // 2) Functions
// const add = function (...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i++) sum += numbers[i];
//   console.log(sum);
// };

// add(2, 3); // Should give 5
// add(5, 3, 7, 2); // Should give 17
// add(8, 2, 5, 3, 2, 1, 4); // Should give 25

// const t = [23, 5, 7];
// // Call function with spread operator
// add(...t);

// restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
// restaurant.orderPizza('mushrooms');

// // Use ANY data type with logical operators, return ANY data type, short-circuiting
// console.log(3 || 'Jonas');
// console.log('' || 'Jonas');
// console.log(false || 1);
// console.log(undefined || null);

// // Short-circuiting gives the first truthy value
// console.log(undefined || 0 || '' || 'Hello' || 23 || null);

// // For-of loop
// const menu3 = [...restaurant.starterMenu, ...restaurant.mainMenu];

// for (const item of menu3) console.log(item);

// for (const [i, el] of menu3.entries()) {
//   // console.log(item);
//   console.log(`${i + 1}: ${el}`);
// }

// console.log([...menu3.entries()]);

/*
///////////////////////////////////////////////////////////////
// DESTRUCTURING ARRAYS //
const arr = [1, 2, 3];
const a = arr[0];
const b = arr[1];
const c = arr[2];

console.log(a, b, c);

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// Switching variables
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

// console.log(restaurant.order(2, 0));

// Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested destructuring

const nested = [2, 4, [5, 6]];
// console.log(nested);

// const [i, , j] = nested;
// console.log(i, j);

const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values

const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

*/
