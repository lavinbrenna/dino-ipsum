import $ from 'jquery';
//import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './css/yacck.css';
import './css/styles.css';
import DinoIpsum from './dino-ipsum.js';

let globalDinoWord = [];
let guessedLetters = [];

function buildEmptyLetterArray(word) {
  const x = new Array(word.length).fill('_');
  return x;
}

function getWord() {
  let dino = DinoIpsum.getNewDino();
  dino.then((response)=>{
    const dinoWord = JSON.parse(response);
    globalDinoWord = [dinoWord[0][0].toLowerCase(), buildEmptyLetterArray(dinoWord[0][0])];
    console.log(globalDinoWord);
    updateDisplay();
    $("#start-game").hide();
  });
}

function updateDisplay() {
  $("#output").text(globalDinoWord[1].join(' '));
}

function checkGuess() {
  const guess = $('#guess-letter').val().toLowerCase();

  if (guessedLetters.includes(guess)) {
    // let user know they are an idiot & exit out
    // "You've already guessed that, dingdong!"
    return false;
  }

  // "velociraptor".indexOf('o') -> -1
  if (globalDinoWord[0].indexOf(guess) > -1) {
    // letter exists in word
    for (let i = 0; i < globalDinoWord[0].length; i++) {
      if (globalDinoWord[0][i] === guess) {
        globalDinoWord[1][i] = guess;
      }
    }
  } else {
    // letter does not exist in word
  }
  // have we picked this before?
  // if not is it in word?
  // if not add to checked letters and display letter as RED
  // if it is find all instances of it in word & update display
  updateDisplay();
}


function debugVariables() {
  console.log('globalDinoWord = ', globalDinoWord);
}

function registerHandlers() {
  // use this to see where we are
  $('#start-game').on('click', getWord);
  $('#debug').on('click', debugVariables);
  $('#letter').on('click', () => {
    if (checkGuess) {
      // update display with guess that was green
    } else {
      // update display with red guess
    }
  });
}


$(document).ready(() => {
  registerHandlers();
  // X - pull word from API 
  // update display with underscores === length of word
  // 'Trex' => _ _ _ _
  // allow user input to check to see if character is in word (only a-z)
  // if letter in word update display to show letter in all positions in word
  // if letter not in word reduce # of chances to pick letters (5->4->3)
  // add letter to list of picked letters
  // do something if word is completely filled in & choices remain
  // if choices run out then display word and allow user to restart game
});