'use strict';

const messageEl = document.querySelector('.message');
const guessInputEl = document.querySelector('.guess');
const actualNumberEl = document.querySelector('.number');
const playerScoreEl = document.querySelector('.score');
const playerHighScoreEl = document.querySelector('.highscore');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again'); 

let secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const updateMessage = (msg) => {
  messageEl.textContent = msg;
};

const updateScore = (newScore) => {
  score = newScore;
  playerScoreEl.textContent = score;
};

const handleGuess = () => {
  const guess = Number(guessInputEl.value);

  // Handle invalid input
  if (!guess) {
    updateMessage('⛔ Please enter a number!');
    return;
  }

  // Check guess and update UI
  if (guess === secretNumber) {
    updateMessage(' Correct Number!');
    actualNumberEl.textContent = secretNumber;
    changeBackgroundColor('#60b347');
    changeNumberWidth('30rem');
    checkBtn.disabled = true;
    if (score > highScore) {
      highScore = score;
      playerHighScoreEl.textContent = highScore;
    }
  } else {
    const hint = guess > secretNumber ? '📈 Too High!' : '📉 Too Low!';
    updateMessage(hint);
    if (score === 1) {
      updateMessage('💥 You lost the game!');
      checkBtn.disabled = true;
    } else {
      updateScore(score - 1);
    }
  }
};

const startNewGame = () => {
  updateMessage('Guess My Number!');
  updateScore(20);
  secretNumber = Math.floor(Math.random() * 20) + 1;
  actualNumberEl.textContent = '?';
  changeBackgroundColor('#222');
  changeNumberWidth('15rem');
  checkBtn.disabled = false;
  guessInputEl.value = '';
};

checkBtn.addEventListener('click', handleGuess);
againBtn.addEventListener('click', startNewGame);

// Helper functions to improve readability
function changeBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

function changeNumberWidth(width) {
  actualNumberEl.style.width = width;
}

