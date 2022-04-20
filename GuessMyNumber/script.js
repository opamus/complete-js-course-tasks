'use strict';

let winningNumber = Math.trunc(Math.random() * 20) + 1;
const msg = document.querySelector('.message');
let highScore = document.querySelector('.highscore');
let score = 20;

const execute = () => {
  // Functionality for check button
  const guess = Number(document.querySelector('.guess').value);
  let scoreLabel = document.querySelector('.score');

  if (!guess) {
    // Empty guess, no deduction of score
    msg.textContent = 'No number!';
  } else if (guess !== winningNumber) {
    // Guess is lower or higher than winning number
    guess < winningNumber
      ? (msg.textContent = 'Higher!')
      : (msg.textContent = 'Lower!');
    score--;
    scoreLabel.textContent = score;
    // Also check here if the score is lower than 1 then you lose the game
    if (score < 1) {
      document.querySelector('.check').removeEventListener('click', execute);
      document.querySelector('body').style.background = '#9c5449';
      msg.textContent = 'You lose the game :(';
      document.querySelector('.number').textContent = ':(';
    }
  } else if (guess === winningNumber) {
    // Winning guess!
    score > highScore.textContent
      ? (highScore.textContent = score)
      : console.log('score was lower than current highscore');
    msg.textContent = `Correct Number! \r\n Your score was: ${score}`;
    document.querySelector('.score').textContent = score;
    scoreLabel.textContent = 20;
    document.querySelector('body').style.background = '#588549';
    document.querySelector('.number').textContent = winningNumber;
    winningNumber = Math.trunc(Math.random() * 20) + 1;
    document.querySelector('.check').removeEventListener('click', execute);
  }
};

// Add event listener to check button
const checkBtn = document
  .querySelector('.check')
  .addEventListener('click', execute);

// Functionality for "Again" button
const againBtn = document
  .querySelector('.again')
  .addEventListener('click', function () {
    score = 20;
    document.querySelector('body').style.background = '#222';
    document.querySelector('.score').textContent = 20;
    document.querySelector('.guess').value = null;
    document.querySelector('.number').textContent = '?';
    winningNumber = winningNumber;
    msg.textContent = 'Start Guessing!';
    document.querySelector('.check').addEventListener('click', execute);
  });
