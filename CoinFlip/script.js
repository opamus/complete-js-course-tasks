"use strict";

let headsOrTails = document.getElementById("value");
let coinContainer = document.getElementById("CoinContainer");

const flipCoin = () => {
  const coin = document.getElementById("Coin");
  const value = Math.floor(Math.random() * 2);

  const resultText = `Coin was flipped, you got ${headsOrTails.innerText}`;
  const delayTime = 1900;

  if (value === 1) {
    coin.style.animation = "flip-heads 2s forwards";
    setTimeout(() => {
      headsOrTails.innerText = "Heads";
      console.log(resultText);
    }, delayTime);
  } else {
    coin.style.animation = "flip-tails 2s forwards";
    setTimeout(() => {
      headsOrTails.innerText = "Tails";
      console.log(resultText);
    }, delayTime);
  }
};

coinContainer.addEventListener("click", flipCoin);
