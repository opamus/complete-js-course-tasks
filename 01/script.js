let js = "amazing";
console.log(40 + 8 + 23 - 10);

console.log("Jonas");
console.log(23);

let firstName = "Jonas";
console.log(firstName);

const country = "Finland";
const continent = "Europe";
let population = 5.5;

console.log(country, continent, population);

const isIsland = false;
const language = "finnish";
console.log(isIsland, population, country, language);

// LECTURE: Basic Operators

const halfOfPeople = population / 2;
console.log(halfOfPeople);

console.log(population + 1);

if (population > 6) {
  console.log("My country has more than 6 million people");
} else {
  console.log("My country has less or equal to 6 million people");
}

if (population > 33) {
  console.log("My country has more than 33 million people");
} else {
  console.log("My country has less or equal to 33 million people");
}

const description =
  country +
  " is in " +
  continent +
  ", and it's " +
  population +
  " million people speak " +
  language +
  ".";

console.log(description);

// LECTURE: Strings and Template Literals

const descriptionTemplateLiteral = `${country} is in ${continent}, and it's ${population} million people speak ${language}.`;

console.log(descriptionTemplateLiteral);

//LECTURE: Taking Decisions: if / else Statements

const country2 = "Portugal";
const portugalPopulation = 13;
const averagePopulation = 33;

if (portugalPopulation > averagePopulation) {
  console.log(`${country2}'s population is above average`);
} else if (portugalPopulation < averagePopulation) {
  console.log(
    `${country2}'s population is ${
      averagePopulation - portugalPopulation
    } million below average`
  );
}

// LECTURE: Type Conversion and Coercion

console.log("9" - "5");
console.log("19" - "13" + "17");
console.log("19" - "13" + 17);
console.log("123" < 57);
console.log(5 + 6 + "4" + 9 - 4 - 2);

// LECTURE: Equality Operators: == vs. ===

let numNeighbours = 1;

if (numNeighbours === 1) {
  console.log("Only 1 border!");
} else if (numNeighbours > 1) {
  console.log("More than 1 border");
} else {
  console.log("No borders");
}

console.log("-------------------");

// LECTURE: Logical Operators

const language3 = "english";
const isIsland3 = false;
const population3 = 13;

if (language3 === "english" && population3 < 50 && isIsland3 === false) {
  console.log("You should live in Portugal!");
} else {
  console.log("Portugal is not the place for you my G");
}

// LECTURE: The switch Statement

const language4 = "hindi";

switch (language4) {
  case "chinese":
  case "mandarin":
    console.log("Most number of native speakers");
    break;
  case "spanish":
    console.log("2nd place in number of native speakers");
    break;
  case "english":
    console.log("3rd place");
    break;
  case "hindi":
    console.log("Number 4");
    break;
  case "arabic":
    console.log("5th most spoken language");
    break;
  default:
    console.log("Great language too :D");
}

// LECTURE: The Conditional (Ternary) Operator

population > 33
  ? console.log("Portugals population is above average")
  : console.log("Portugals population is below average");

console.log(
  `${country}s population is ${population > 33 ? "above" : "below"} average`
);
