'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Soham Datta',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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


const displayMovements = function(movements) {
  containerMovements.innerHTML = ``;

  movements.forEach((mov, i) => {
    const type = mov > 0 ? `deposit` : `withdrawal`;
    
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}$</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML(`afterbegin`, html);

  });

}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const calcDisplaySummary = function(account) {

  const incomes = account.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}$`;

  const out = account.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}$`;

  const interest = account.movements.filter(mov => mov > 0).map(deposit => (deposit*account.interestRate)/100).filter(mov => mov>1).reduce((acc, mov) => acc + mov, 0);
  // console.log(interest);
  labelSumInterest.textContent = `${interest}$`;

}

// calcDisplaySummary(movements);

const createUserNames = function(accs) {

  accs.forEach(acc => {
    acc.username = acc.owner.toLowerCase().split(` `).map(name => name[0]).join(``);
  })

}
createUserNames(accounts);
// console.log(accounts);

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}$`;
};

const deposits = movements.filter(mov => mov > 0); 
// console.log(deposits);

const withdrawls = movements.filter(mov => mov < 0);
// console.log(withdrawls);

const balance = movements.reduce((acc, mov) => acc+mov, 1000);
// console.log(balance);

const eurToUSD = 1.1;

const totalDeposite = movements.filter(mov => mov>0).map(mov => mov*eurToUSD).reduce((acc, mov) => acc + mov, 0);


const updateUI = function(acc) {

  // Display Movements
  displayMovements(acc.movements);

  // Display Balance
  calcDisplayBalance(acc);

  // Display Summary
  calcDisplaySummary(acc);

}

// const firstWithdrawl = movements.find(mov => mov < 0);

const account = accounts.find(acc => acc.owner === `Jessica Davis`);
// console.log(account);

// Event handler
let currentAccount;

btnLogin.addEventListener(`click`, function(e) {
  // Prevent from submitting
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  
  if(currentAccount?.pin === Number(inputLoginPin.value)) {

    // Display UI and Message
    labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(` `)[0]}`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = ``;
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }

});


btnTransfer.addEventListener(`click`, function(e) {

  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = ``;
  inputTransferTo.blur();

  if(amount > 0 && receiverAccount && currentAccount.balance >= amount && receiverAccount?.username !== currentAccount.username) {

    // Doing transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);

  }

})

btnLoan.addEventListener(`click`, function(e) {
  
  e.preventDefault();
  const amount = Number(inputLoanAmount.value)
  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount*0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = ``;

});

btnClose.addEventListener(`click`, function(e) {
  e.preventDefault();
  const closedUserName = inputCloseUsername.value;
  const closedPin = Number(inputClosePin.value);

  if(closedUserName === currentAccount.username && closedPin === currentAccount.pin) {
    const index = accounts.findIndex(acc=> acc.username === closedUserName);
    // Delete Account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = ``;

});