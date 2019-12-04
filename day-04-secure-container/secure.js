const isValid = (password) => {
  let twoAdjacent = false;
  let onlyIncreasing = true;

  for (let i = 0; i < password.length; i++) {
    if (password[i] === password[i + 1]) {
      twoAdjacent = true;
    }

    if (Number(password[i]) > Number(password[i + 1])) {
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
