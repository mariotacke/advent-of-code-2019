const intcode = require('./intcode');

module.exports = (instructions, inputs = [1]) => {
  return intcode(instructions, inputs);
};
