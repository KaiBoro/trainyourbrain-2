"use strict";

// Selecting elements
const field1El = document.querySelector(".field--1");
const field2El = document.querySelector(".field--2");
const field3El = document.querySelector(".field--3");
const field4El = document.querySelector(".field--4");
const field5El = document.querySelector(".field--5");
const infoEl = document.querySelector(".info");
const buttonStartEl = document.querySelector(".btn--start");
const buttonCheckEl = document.querySelector(".btn--check");
const buttonResetEl = document.querySelector(".btn--reset");
const levelEl = document.querySelector(".level-scores");
const highscoreEl = document.querySelector(".highscore-scores");

// Starting conditions
let randomNumbers = [];
let userInputNumbers = [];
let playing = true;
let checking = false;
let reset = false;
let adding = false;
let highscore = 0;

// Initialize number of blinks
let numberBlinks = 1;

// Change color of buttons
function changeColor(buttonEl, newColor) {
  buttonEl.style.backgroundColor = newColor;
}

// Set text content
function setText(element, newText) {
  element.textContent = newText;
}

// Create random numbers array between 1 - 5
function createRandom() {
  for (let i = 0; i < numberBlinks; i++) {
    randomNumbers.push(Math.floor(Math.random() * 5) + 1);
  }
}

// Show blinking fields to user
function showBlinkingFields() {
  let durationTime;
  // Deactivate playing button
  playing = false;
  setText(infoEl, "Concentrate.");
  infoEl.classList.add("animated");
  // Show fields blinking
  randomNumbers.forEach(function (entry, index) {
    durationTime = index * 2500 + 1500;
    // Interval blinking fields
    setTimeout(function () {
      document.querySelector(".field--" + entry).style.backgroundColor =
        "#ffd523";
      // Duration blinking each field
      setTimeout(function () {
        document.querySelector(".field--" + entry).style.backgroundColor = "";
      }, 1000);
    }, index * 2500);
  });
  setTimeout(function () {
    setText(infoEl, "What is your solution?");
    infoEl.classList.remove("animated");
    // Activate user input
    adding = true;
  }, durationTime);
}

// Collect user input numbers
function addUserInput(numberInput) {
  if (adding) {
    // Only add max numberBlinks items to userInputNumbers array
    if (userInputNumbers.length === numberBlinks - 1) {
      // Activate checking button
      checking = true;
      // Deactive user input
      adding = false;
      userInputNumbers.push(numberInput);
      changeColor(buttonCheckEl, "#ffd523");
    } else if (userInputNumbers.length !== numberBlinks) {
      userInputNumbers.push(numberInput);
    }
  }
}

// Compare user input with random numbers array
function checkUserInput() {
  if (checking) {
    // Deactivate checking button
    checking = false;
    // check if random sequence order is same as user input sequence order
    let isEqual = userInputNumbers.toString() === randomNumbers.toString();

    // User input correct
    if (isEqual) {
      // Activate playing button
      playing = true;
      numberBlinks += 1;
      setText(levelEl, numberBlinks);
      setText(infoEl, "Correct. Now " + numberBlinks + " numbers to memorize.");
      changeColor(buttonCheckEl, "#B2B1B9");
      changeColor(buttonStartEl, "#FFD523");
    }
    // User input not correct
    else {
      if (
        numberBlinks <= highscore ||
        numberBlinks === 1 ||
        numberBlinks - 1 === highscore
      ) {
        setText(infoEl, "Good luck next time.");
      }
      // New highscore
      else if (numberBlinks - 1 > highscore) {
        highscore = numberBlinks - 1;
        setText(highscoreEl, highscore);
        setText(
          infoEl,
          "Keep training. But anyway, new highscore. Let´s start again at level 1."
        );
      }
      reset = true;
      playing = false;
      changeColor(buttonResetEl, "#FFD523");
      changeColor(buttonCheckEl, "#B2B1B9");
    }
  }
}

// Reset
function resetGame() {
  // Initialize game except highscore
  numberBlinks = 1;
  // Activate playing button
  playing = true;
  // Deactive reset button
  reset = false;
  setText(levelEl, numberBlinks);
  setText(infoEl, "Let´s start. 1 number to memorize.");
  changeColor(buttonResetEl, "#B2B1B9");
  changeColor(buttonStartEl, "#FFD523");
}

// Start game
buttonStartEl.addEventListener("click", function () {
  if (playing) {
    randomNumbers = [];
    userInputNumbers = [];
    changeColor(buttonStartEl, "#b2b1b9");
    createRandom();
    showBlinkingFields();
  }
});

// Check user input
buttonCheckEl.addEventListener("click", function () {
  if (checking) {
    checkUserInput();
  }
});

// Reset game
buttonResetEl.addEventListener("click", function () {
  if (reset) {
    resetGame();
  }
});
