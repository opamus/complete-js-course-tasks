"use strict";

let headsOrTails = document.getElementById("value");
let coinContainer = document.getElementById("CoinContainer");

const flipCoin = () => {
  const coin = document.getElementById("Coin");
  const value = Math.floor(Math.random() * 2);

  if (value === 1) {
    coin.style.animation = "flip-heads 3s forwards";
    setTimeout(() => {
      headsOrTails.innerText = "Heads";
    }, 1800);
  } else {
    coin.style.animation = "flip-tails 3s forwards";
    setTimeout(() => {
      headsOrTails.innerText = "Tails";
    }, 1800);
  }
  console.log(`Coin was flipped, you got ${headsOrTails.innerText}`);
};

coinContainer.addEventListener("click", flipCoin);
