export default function generateRandom8DigitNumber() {
  const min = 10000000; // smallest 8-digit number
  const max = 99999999; // largest 8-digit number

  // Generate a random integer between min and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
