'use strict';

// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, isPlaying;

// Initialize the game
const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;

  score0El.textContent = '0';
  score1El.textContent = '0';
  current0El.textContent = '0';
  current1El.textContent = '0';
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  diceEl.classList.add('hidden');
};

// Switch player
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = '0';
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Roll dice
btnRoll.addEventListener('click', () => {
  if (isPlaying) {
    const diceRole = Math.floor(Math.random() * 6) + 1;
    diceEl.src = `dice-${diceRole}.png`;
    diceEl.classList.remove('hidden');
    if (diceRole === 1) {
      switchPlayer();
    } else {
      currentScore += diceRole;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    }
  }
});

// Hold score
btnHold.addEventListener('click', () => {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      isPlaying = false;
      diceEl.classList.remove('hidden');
    } else {
      switchPlayer();
    }
  }
});

// New game
btnNew.addEventListener('click', init);

// Initialize the game
init();
