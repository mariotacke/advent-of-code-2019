const isValid = (password) => {
  let twoAdjacent = false;
  let onlyIncreasing = true;

  for (let i = 0; i < password.length; i++) {
    const previousDigit = password[i - 1];
    const digit = password[i];
    const nextDigit = password[i + 1];
    const digitAfterNext = password[i + 2];

    if (previousDigit !== digit && digit === nextDigit && digit !== digitAfterNext) {
      twoAdjacent = true;
    }

    if (Number(digit) > Number(nextDigit)) {
      onlyIncreasing = false;
    }
  }

  return twoAdjacent && onlyIncreasing;
};

module.exports = (input) => {
  const range = input.split('-').map(Number);

  let counter = 0;

  for (let i = range[0]; i <= range[1]; i++) {
    if (isValid(`${i}`)) {
      counter++;
    }
  }

  return counter;
};
