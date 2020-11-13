// GLOBAL VARIABLES
// add array of words and create alphabet array
const wordArr = [
  'Ashtray',
  'Anomaly',
  'Almonds',
  'Ballroom',
  'Bastard',
  'Braille',
  'Citizen',
  'Chastise',
  'Colonialism',
  'Dickbutt',
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

let count = 0;
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
let imgIndex;

// array containing url for images
let imgArr = ['img/0.svg', 'img/1.svg', 'img/2.svg', 'img/3.svg', 'img/4.svg', 'img/5.svg', 'img/6.svg', 'img/7.svg', 'img/8.svg', 'img/9.svg', 'img/10.svg', 'img/11.svg'];

// initiate empty arrays
let blanks = [];
let correctLetters = [];
let incorrectLetters = [];

// QUERY SELECTOR-VARIABLES

let startGameBtn = document.querySelector('.start-game-btn');

// EVENT LISTENERS
startGameBtn.addEventListener('click', startGame);

// All DOM-Updates
function updateDOM() {
  // print blanks[] to DOM with a space between
  document.querySelector('.word-area').innerHTML = blanks.join(' ');

  // variable to keep track of total guesses
  let numberOfGuesses = correctLetters.length + incorrectLetters.length;
  // print
  document.querySelector('.counter').innerHTML = 'Tries: ' + numberOfGuesses;
  //deklarerar variabeln lives som börjar på 10 men minskar varje gång incorrectLetters[] fylls på

  // the number of hangman images minus the incorrect guesses
  let hp = imgArr.length - incorrectLetters.length;
  document.querySelector('.health').innerHTML = 'HP :' + hp;

  //om correctLetters[] och randomWord är lika långa
  if (correctLetters.length === randomWord.length) {
    //skrivs stringen ut i html
    document.querySelector('.win').innerHTML = 'You win!';
    //och knappen för att börja om blir synlig
    // document.querySelector('.reset').style.visibility = 'visible';
  }

  //om incorrectLetters[] är längre än 10
  if (incorrectLetters.length === imgArr.length) {
    //skrivs stringen ut i html
    document.getElementById('lose').innerHTML = 'You lose...';
    //och knappen för att börja om blir synlig
    document.getElementById('reset').style.visibility = 'visible';
  }

  // console.log("randomWord", randomWord);
  // console.log("correctLetters", correctLetters);
  // console.log("incorrectLetters", incorrectLetters);
}

function generateKeyboard() {
  // iterates the alphabet array
  for (let i = 0; i < alphabet.length; i++) {
    // the function createButton creates a unique button each iteration
    let buttonElement = createButton(alphabet[i]);
    // which are appended as children of buttons-class
    document.querySelector('.buttons').appendChild(buttonElement);
  }
}

function createButton(letter) {
  //deklarerar variabeln btn som skapar button-tagg i html
  let btn = document.createElement('button');
  //i html: <button></button>

  //gör bokstaven till versal
  btn.innerHTML = letter.toUpperCase();
  //i html: <button>A</button>

  //skapar ett id som är samma som bokstaven
  btn.id = 'button-' + letter;
  //i html: <button id="button-a">A</button>
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

  //söker igenom randomWord efter letter
  let isCorrect = randomWord.indexOf(letter) !== -1;

  // letter is found
  if (isCorrect) {
    for (let i = 0; i < randomWord.length; i++) {
      if (randomWord[i] === letter) {
        // iteration equals letter and letter is put in correct position
        blanks[i] = letter;
        // letter is pushed to correctLetters[]
        correctLetters.push(letter);
        console.log(correctLetters);
      }
    }
  }
  // letter is not found
  else {
    // letter is pushed to incorrectLetters[]
    incorrectLetters.push(letter);
    console.log(incorrectLetters);
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
  // store the word in a variable in lower-case for easier comparison ahead
  let randomWord = wordArr[arrIndex].toLowerCase();
  // split into array
  randomWord = randomWord.split('');
  // console.log('randomWord: ' + randomWord);
  // console.log(randomWord.length);

  return randomWord;
}

function generateBlanks(word) {
  for (let i = 0; i < randomWord.length; i++) {
    //for every match in alphabet a underscores is pushed, "!== -1" is returned if there are no matches
    if (alphabet.indexOf(randomWord[i]) !== -1) {
      blanks.push('_');
      //spaces will push a non-breaking space
    } else if (randomWord[i] === ' ') {
      blanks.push('&nbsp;');
      //övriga tecken skrivs ut som dom är
    } else {
      blanks.push(randomWord[i]);
    }
  }
  updateDOM();
}

// function setImgSrc(index) {
//   const hangmanImgElement = document.querySelector('.hangman-img');
//   // hangmanImg = imgArr[0];
//   hangmanImgElement.setAttribute('src', imgArr[index]);
// }

function startGame() {
  startGameBtn.disabled = true;
  startGameBtn.style = 'display: none';
  randomWord = getRandomWord(); // the word as an array
  console.log(randomWord);
  generateBlanks();
  generateKeyboard();
  // imgIndex = getGuess(letter);
  // debugger;

  // setImgSrc();
}
