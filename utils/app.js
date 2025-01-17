// app.js

import GameLogic from "./components/GameLogic.js";
import { rollDice } from "./utils/helpers.js";
import { MAX_PLAYERS, MAX_DICE_PER_PLAYER } from "./utils/constants.js";

// DOM Elements
const gameContainer = document.getElementById("game-container");
const startButton = document.createElement("button");
startButton.textContent = "Start Game";
gameContainer.appendChild(startButton);

// Game State
let game;

// Initialize players (1 human and bots)
function initializePlayers(playerCount) {
    const players = [];
    for (let i = 0; i < playerCount; i++) {
        players.push({
            name: i === 0 ? "Player" : `Bot ${i}`,
            dice: rollDice(MAX_DICE_PER_PLAYER),
            loseDie: function () {
                if (this.dice.length > 0) {
                    this.dice.pop();
                }
            },
            rollAllDice: function () {
                this.dice = rollDice(this.dice.length);
            },
        });
    }
    return players;
}

// Render the game state
function renderGameState() {
    gameContainer.innerHTML = ""; // Clear previous state

    // Display current bid
    if (game.currentBid) {
        const bidInfo = document.createElement("p");
        bidInfo.textContent = `Current Bid: ${game.currentBid.quantity} x ${game.currentBid.face}`;
        gameContainer.appendChild(bidInfo);
    }

    // Display players and their dice
    game.players.forEach((player, index) => {
        const playerInfo = document.createElement("div");
        playerInfo.textContent = `${player.name} - Dice: ${player.dice.join(", ")}`;
        if (index === game.currentPlayerIndex) {
            playerInfo.style.fontWeight = "bold"; // Highlight current player
        }
        gameContainer.appendChild(playerInfo);
    });

    // Add action buttons for the player
    if (game.players[game.currentPlayerIndex].name === "Player" && !game.gameOver) {
        const bidButton = document.createElement("button");
        bidButton.textContent = "Place Bid";
        bidButton.onclick = () => handlePlayerAction("bid");
        gameContainer.appendChild(bidButton);

        const challengeButton = document.createElement("button");
        challengeButton.textContent = "Challenge";
        challengeButton.onclick = () => handlePlayerAction("challenge");
        gameContainer.appendChild(challengeButton);
    }
}
