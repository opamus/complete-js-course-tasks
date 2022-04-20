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
  } else if (score === 0) {
    // Score hits 0 and you lose the game
    document.querySelector('.check').removeEventListener('click', execute);
    document.querySelector('body').style.background = '#9c5449';
    msg.textContent = 'You lose the game :(';
    document.querySelector('.number').textContent = ':(';
  } else if (guess > winningNumber) {
    // Guess is higher than winning number
    msg.textContent = 'Lower!';
    score--;
    scoreLabel.textContent = score;
  } else if (guess < winningNumber) {
    // Guess is lower than winning number
    msg.textContent = 'Higher!';
    score--;
    scoreLabel.textContent = score;
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
