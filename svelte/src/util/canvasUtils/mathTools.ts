/**
 * Gets a random integer between 0 and max (inclusive).
 */
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * Gets a random number between 0 and max (inclusive).
 */
export function getRandomNumber(max: number) {
  return Math.random() * max;
}

/**
 * Gets a random OKLCH color that is bright and visible.
 */
export function getRandomColor() {
  return `oklch(70% 0.5 ${getRandomNumber(360)})`;
}
