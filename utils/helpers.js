// helpers.js

// Generates a random integer between min and max (inclusive)
export function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Rolls a single die (returns a number between 1 and 6)
export function rollDie() {
  return generateRandomNumber(1, 6);
}

// Rolls a specific number of dice and returns an array of results
export function rollDice(count) {
  const results = [];
  for (let i = 0; i < count; i++) {
      results.push(rollDie());
  }
  return results;
}

// Utility to deep clone an object or array
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Formats a bid object into a readable string
export function formatBid(bid) {
  return `${bid.quantity} x ${bid.face}`;
}

// Shuffles an array (Fisher-Yates algorithm)
export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = generateRandomNumber(0, i);
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Rolls a single die (returns a number between 1 and 6)
export function rollDie() {
  return generateRandomNumber(1, 6);
}