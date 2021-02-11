// GLOBAL VARIABLES
// add array of words and create alphabet array
const orig_wordArr = [
  'Ashtray',
  'Anomaly',
  'Almonds',
  'Ballroom',
  'Bastard',
  'Braille',
  'Citizen',
  'Chastise',
  'Colonialism',
  'Donor',
  'Doorbell',
  'Diplomat',
  'Empire',
  'Electricity',
  'Eel',
  'Frankly',
  'Focus',
  'Figment',
  'Gorilla',
  'Gentleman',
  'Gentile',
];

const wordArr = [
  'Wilmer',
  'Elsa',
  'Love',
  'Emilia',
  'Robin',
  'Samuel',
  'Kristoffer',
  'Cecilia',
  'Staffan',
  'Britten',
  'Rihad',
  'Rahima',
  'Azad'
];

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');

// array containing url for images
let imgArr = ['img/0.svg', 'img/1.svg', 'img/2.svg', 'img/3.svg', 'img/4.svg', 'img/5.svg', 'img/6.svg', 'img/7.svg', 'img/8.svg', 'img/9.svg', 'img/10.svg', 'img/11.svg'];

// initiate empty arrays
let blanks = [];
let correctLetters = [];
let incorrectLetters = [];

// ELEMENT-VARIABLES
let startGameBtn = document.querySelector('.start-game-btn');
let keyboardElement = document.querySelector('.keyboard');
let wordAreaElement = document.querySelector('.word-area');
let resetBtn = document.querySelector('.reset');

// EVENT LISTENERS
startGameBtn.addEventListener('click', startGame);

// DOM-Updates
function updateDOM() {
  // print blanks[] to DOM with a space between
  wordAreaElement.innerHTML = blanks.join(' ');

  // variable to keep track of total guesses
  let numberOfGuesses = correctLetters.length + incorrectLetters.length;
  let guessesElement = document.querySelector('.guesses');

  guessesElement.style.display = 'flex';
  // print to DOM
  guessesElement.innerHTML = 'Guesses made: ' + numberOfGuesses;

  // the number of hangman images minus the incorrect guesses
  let hp = imgArr.length - incorrectLetters.length;
  console.log(hp);

  document.querySelector('.health').style.display = 'flex';

  document.querySelector('.health').innerHTML = '<i class="fas fa-heart"></i>' + '&nbsp;' + 'HP : ' + hp;

  // correctLetters and randomWord equal length
  if (correctLetters.length === randomWord.length) {
    generateMessage('win');
    keyboardElement.innerHTML = '';
  }
  // incorrectLetters too long
  if (incorrectLetters.length === imgArr.length) {
    generateMessage('lose');
    keyboardElement.innerHTML = '';
  }
}
// generates an end of game-message depending on the outcome
function generateMessage(msg) {
  const msgContainer = document.querySelector('.messages');
  let msgElement = document.createElement('h1');
  if (msg === 'win') {
    msgElement.textContent = 'Congratulations! You won!';
  } else {
    msgElement.textContent = `You lost! The word was: ${randomWord.join('')}`;
  }
  msgContainer.appendChild(msgElement);
  document.querySelector('.reset').style.display = 'flex';
}
function generateKeyboard() {
  // iterates the alphabet array
  for (let i = 0; i < alphabet.length; i++) {
    // the function createButton creates a unique button each iteration
    let buttonElement = createButton(alphabet[i]);
    // which are appended as children of buttons-class
    keyboardElement.appendChild(buttonElement);
  }
}

// Creates buttons based on passed letter and adds onclick-function
function createButton(letter) {
  let btn = document.createElement('button');

  btn.innerHTML = letter;

  // add id and class
  btn.id = 'button-' + letter;
  btn.classList = 'btn keyboard-btn';

  // adds a onclick-function that calls the the getGuess-function with the clicked letter as a parameter
  btn.onclick = function () {
    getGuess(letter);
  };

  return btn;
}

function getGuess(letter) {
  let btn = document.querySelector('#button-' + letter);

  btn.disabled = true;

  // looks for matches of letter in randomWord
  let isCorrect = randomWord.indexOf(letter) !== -1;

  // letter is found
  if (isCorrect) {
    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] === letter) {
        // iteration equals letter and letter is put in correct position
        blanks[i] = letter;
        // letter is pushed to correctLetters[]
        correctLetters.push(letter);
        console.log('correct: ' + correctLetters.length);
      }
    }
  }
  // letter is not found
  else {
    // letter is pushed to incorrectLetters[]
    incorrectLetters.push(letter);
    // sets image url depending on wrong guesses
    let imgIndex = incorrectLetters.length - 1;
    const hangmanImgElement = document.querySelector('.hangman-img');
    hangmanImgElement.setAttribute('src', imgArr[imgIndex]);
  }
  updateDOM();
}

function getRandomWord(arr) {
  // get a random index/postion in the wordArr
  const arrIndex = Math.floor(Math.random() * wordArr.length);
  // store the word in a variable in upper-case for easier comparison ahead
  randomWord = wordArr[arrIndex].toUpperCase();
  // split into array
  randomWord = randomWord.split('');

  return randomWord;
}

function generateBlanks(word) {
  for (let i = 0; i < randomWord.length; i++) {
    // for every match in alphabet a underscores is pushed, "!== -1" is returned if there are no matches
    if (alphabet.indexOf(randomWord[i]) !== -1) {
      blanks.push('_');
      // spaces will push a non-breaking space
    } else if (randomWord[i] === ' ') {
      blanks.push('&nbsp;');
      // eventual other characters will be printed as is
    } else {
      blanks.push(randomWord[i]);
    }
  }
  updateDOM();
}

function startGame() {
  startGameBtn.disabled = true;
  startGameBtn.style = 'display: none';

  randomWord = getRandomWord(); // the word as an array
  console.log(randomWord);
  generateBlanks();
  generateKeyboard();
}
