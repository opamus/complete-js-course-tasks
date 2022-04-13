// JavaScript Fundamentals – Part 2

// LECTURE: Functions

const describeCountry = (country, population, capitalCity) => {
  console.log(
    `${country} has ${population} million people and its capital city is ${capitalCity}`
  );
};

describeCountry("Finland", 5.5, "Helsinki");
describeCountry("Sweden", 20, "Stockholm");
describeCountry("Norway", 6, "Oslo");

// LECTURE: Function Declarations vs. Expressions

const worldPopulation = 7900;

const percentageOfWorld = (population) => {
  return (population / worldPopulation) * 100;
};

const chinaPopulationPercentage = percentageOfWorld(1441);
const finlandPopulationPercentage = percentageOfWorld(5.5);
const swedenPopulationPercentage = percentageOfWorld(20);

console.log(
  chinaPopulationPercentage,
  finlandPopulationPercentage,
  swedenPopulationPercentage
);

const percentageOfWorld2 = (population) => {
  return (population / worldPopulation) * 100;
};

const chinaPopulationP = percentageOfWorld2(1441);
const finlandPopulationP = percentageOfWorld2(5.5);
const swedenPopulationP = percentageOfWorld2(20);

console.log(chinaPopulationP, finlandPopulationP, swedenPopulationP);

// LECTURE: Arrow Functions SKIPPED since I already used arrow functions before ^

// LECTURE: Functions Calling Other Functions

const describePopulation = (country, population) => {
  return `${country} has ${population} million people, which is about ${percentageOfWorld(
    population
  ).toFixed(2)} % of the world`;
};

const chinaDescribed = describePopulation("China", 1441);
const finlandDescribed = describePopulation("Finland", 5.5);
const swedenDescribed = describePopulation("Sweden", 20);
console.log(chinaDescribed);
console.log(finlandDescribed);
console.log(swedenDescribed);

// LECTURE: Introduction to Arrays

const populations = [1441, 5.5, 20, 6];

console.log(populations.length === 4 ?? true);

const percentages = [
  percentageOfWorld(populations[0]).toFixed(2),
  percentageOfWorld(populations[1]).toFixed(2),
  percentageOfWorld(populations[2]).toFixed(2),
  percentageOfWorld(populations[3]).toFixed(2),
];

console.log(percentages);

// LECTURE: Basic Array Operations (Methods)

const neighbours = ["Sweden", "Russia", "Norway"];

neighbours.push("Utopia");
console.log(neighbours);
neighbours.pop("Utopia");
console.log(neighbours);

neighbours.includes("Germany")
  ? null
  : console.log("Probably not a central European country");

neighbours[0] = "Republic of Sweden";
console.log(neighbours);

// LECTURE: Introduction to Objects

const myCountry = {
  country: "Finland",
  capital: "Helsinki",
  language: "finnish",
  population: 5.5,
  neighbours: ["Sweden", "Russia", "Norway"],
};

console.log(myCountry);

// LECTURE: Dot vs. Bracket Notation

console.log(
  `${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`
);

myCountry.population = myCountry.population + 2;
console.log(myCountry.population);

myCountry["population"] = myCountry.population - 2;
console.log(myCountry.population);

// LECTURE: Object Methods

const myCountry2 = {
  country: "Finland",
  capital: "Helsinki",
  language: "finnish",
  population: 5.5,
  neighbours: ["Sweden", "Russia", "Norway"],
  describe: function () {
    console.log(
      `${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}`
    );
  },
  checkIsland: function () {
    console.log(this.neighbours.length === 0 ?? true);
  },
};

myCountry2.describe();
myCountry2.checkIsland();

// LECTURE: Iteration: The for Loop

for (let voter = 1; voter <= 15; voter++) {
  console.log(`Voter number ${voter} is currently voting`);
}

// LECTURE: Looping Arrays, Breaking and Continuing

const percentages2 = [];

for (let i = 0; i < populations.length; i++) {
  const perc = percentageOfWorld2(populations[i]).toFixed(2);
  percentages2.push(perc);
}

console.log(percentages2);

// LECTURE: Looping Backwards and Loops in Loops

const listOfNeighbours = [
  ["Canada", "Mexico"],
  ["Spain"],
  ["Norway", "Sweden", "Russia"],
];

// In for loop the first declaration is run once
// second defines the condition how long the loops is ran, while the condition stays true the loop keeps running
// third is run every time after the previous is done, i++ basically means i = i+1

// First for loop = we take the array of 3 arrays and separate them to their own separate arrays
// Second for loop takes the 3 separate arrays and separates the countries from the arrays
for (i = 0; i < listOfNeighbours.length; i++) {
  for (x = 0; x < listOfNeighbours[i].length; x++) {
    console.log(` Neighbour: ${listOfNeighbours[i][x]}`);
  }
}

// LECTURE: The while Loop

const percentages3 = [];
let z = 0; // We use z here to not conflict with the above for loop.

while (z < populations.length) {
  const perc = percentageOfWorld2(populations[z]).toFixed(2);
  percentages3.push(perc);
  z++;
}

console.log(percentages3);

// Coding Challenge #1

const calcAverage = (score1, score2, score3) => {
  return (score1 + score2 + score3) / 3;
};

const dolphinScore = calcAverage(44, 23, 71);
const koalaScore = calcAverage(65, 54, 49);

const dolphinScore2 = calcAverage(85, 54, 41);
const koalaScore2 = calcAverage(23, 34, 27);

const checkWinner = (avgDolphins, avgKoalas) => {
  if (avgDolphins > avgKoalas * 2 || avgKoalas > avgDolphins * 2) {
    avgDolphins > avgKoalas
      ? console.log(`Dolphins win ${avgDolphins} - ${avgKoalas}`)
      : console.log(`Koalas win ${avgKoalas} - ${avgDolphins}`);
  } else {
    console.log("Nobody wins :(");
  }
};

checkWinner(dolphinScore, koalaScore);
checkWinner(dolphinScore2, koalaScore2);

// Coding challenge 2

const bills = [125, 555, 44];

const calcTip = (bill) => {
  if (bill >= 50 && bill <= 300) {
    return 0.15 * bill;
  } else {
    return 0.2 * bill;
  }
};

const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];

console.log(tips);

// #2 Bonus

const total = [tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2]];
console.log(total);

// Coding challenge 3

// BMI = mass / (height * height)
// or simpler version = mass / height ** 2

const Mark = {
  fullname: "Mark Miller",
  weight: 78, //kg
  height: 1.69, //m
  calcBMI: function () {
    const BMI = this.weight / this.height ** 2;
    return BMI;
  },
};
const John = {
  fullname: "John Smith",
  weight: 92,
  height: 1.95,
  calcBMI: function () {
    const BMI = this.weight / this.height ** 2;
    return BMI;
  },
};

const markBMI = Mark.calcBMI().toFixed(2);
const johnBMI = John.calcBMI().toFixed(2);

markBMI > johnBMI
  ? console.log(`Marks BMI (${markBMI}) is higher than Johns BMI (${johnBMI})!`)
  : console.log(
      `Johns BMI (${johnBMI}) is higher than Marks BMI (${markBMI})!`
    );

console.log(markBMI, johnBMI);

// Coding challenge 4

const calcTip2 = (bill) => {
  return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
};

const bills2 = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips2 = [];
const totals2 = [];

for (let i = 1; i < bills2.length; i++) {
  const tip = calcTip2(bills2[i]);
  tips2.push(tip);
  totals2.push(tip + bills2[i]);
}

console.log(bills2, tips2, totals2);

// 4 Bonus

const calcAverage2 = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    //sum = sum + arr[i];  SAME THING AS BELOW
    sum += arr[i];
  }
  return sum / arr.length;
};

console.log(calcAverage2(totals2).toFixed(2));
