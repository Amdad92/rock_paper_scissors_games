// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {

    // Button elements for player's choices
    let rockBtn = document.getElementById("rock");
    let paperBtn = document.getElementById("paper");
    let scissorsBtn = document.getElementById("scissors");
    let resetBtn = document.getElementById("reset");
  
    // The div where results are displayed
    let resultDiv = document.querySelector(".result-div");
  
    // Load previous score from localStorage or initialize it
    let score = JSON.parse(localStorage.getItem("score")) || {
      wins: 0,
      losses: 0,
      ties: 0,
    };
  
    // Update the score display with the current score
    updateScore();
  
    // Event listener for the Rock button
    rockBtn.addEventListener("click", () => {
      playermove("rock");   // Play the game with "rock" as the player's move
      resultDisplay();      // Show the result section
    });
  
    // Event listener for the Paper button
    paperBtn.addEventListener("click", () => {
      playermove("paper");  // Play the game with "paper" as the player's move
      resultDisplay();      // Show the result section
    });
  
    // Event listener for the Scissors button
    scissorsBtn.addEventListener("click", () => {
      playermove("scissors"); // Play the game with "scissors" as the player's move
      resultDisplay();        // Show the result section
    });
  
    // Event listener for the Reset button
    resetBtn.addEventListener("click", () => {
      // Reset the score to 0 for all outcomes
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.removeItem("score"); // Clear score from localStorage
      updateScore();                   // Update the score display
      resultHide();                    // Hide the result section
    });
  
    /**
     * Handles the logic for a player's move and determines the result of the game
     * @param {string} playermove - The player's chosen move ("rock", "paper", or "scissors")
     */
    function playermove(playermove) {
      const computerMove = computerMoveFunc(); // Get the computer's move
      let result = ""; // Variable to store the result of the game
  
      // Determine the outcome based on the player's and computer's moves
      if (playermove === "rock") {
        if (computerMove === "rock") {
          result = "Tie";
        } else if (computerMove === "paper") {
          result = "You lose";
        } else {
          result = "You win";
        }
      } else if (playermove === "paper") {
        if (computerMove === "rock") {
          result = "You win";
        } else if (computerMove === "paper") {
          result = "Tie";
        } else {
          result = "You lose";
        }
      } else if (playermove === "scissors") {
        if (computerMove === "rock") {
          result = "You lose";
        } else if (computerMove === "paper") {
          result = "You win";
        } else {
          result = "Tie";
        }
      }
  
      // Update the score based on the result
      if (result === "You win") {
        score.wins += 1;
      } else if (result === "You lose") {
        score.losses += 1;
      } else if (result === "Tie") {
        score.ties += 1;
      }
  
      // Save the updated score to localStorage
      localStorage.setItem("score", JSON.stringify(score));
  
      // Update the score display
      updateScore();
  
      // Display the moves and the result in the result section
      document.getElementById(
        "js-move"
      ).innerHTML = `You picked <span class="player-move">${playermove}</span> - Computer picked <span class="computer-move">${computerMove}</span>`;
      document.getElementById("js-result").innerHTML = `Result: ${result}`;
    }
  
    /**
     * Randomly selects a move for the computer
     * @returns {string} - The computer's chosen move ("rock", "paper", or "scissors")
     */
    function computerMoveFunc() {
      const randomNumber = Math.random(); // Generate a random number between 0 and 1
      if (randomNumber < 1 / 3) {
        return "rock";
      } else if (randomNumber < 2 / 3) {
        return "paper";
      } else {
        return "scissors";
      }
    }
  
    /**
     * Updates the score display on the page
     */
    function updateScore() {
      document.getElementById(
        "js_score_update"
      ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    }
  
    /**
     * Makes the result section visible
     */
    function resultDisplay() {
      resultDiv.style.display = "block";
    }
  
    /**
     * Hides the result section
     */
    function resultHide() {
      resultDiv.style.display = "none";
    }
  });
  