const RepairDroid = require('./repairDroid');

const getOpposite = (direction) =>
  direction === 'west'
    ? 'east'
    : direction === 'east'
      ? 'west'
      : direction === 'north'
        ? 'south'
        : 'north';

module.exports = (input) => {
  const program = input.split(',').map(Number);
  const droid = new RepairDroid(program);

  const undoAll = (movements) => {
    while (movements.length) {
      const movement = getOpposite(movements.shift());

      droid.move([movement]);
    }
  };

  let stack = [];
  let stepsRequired = 0;

  const branches = [[]];

  do {
    const branch = branches.pop();

    stack = [...branch];

    if (stack.length) {
      droid.move([...stack]);
    }

    do {
      const possibleMoves = droid.lookAround(stack[0]);

      if (possibleMoves.length === 0) {
        undoAll([...stack]);

        break;
      } else if (possibleMoves.length === 1) {
        stack.unshift(possibleMoves[0]);

        const status = droid.move([possibleMoves[0]]);

        if (status === 2) {
          stepsRequired = stack.length;
        }
      } else {
        possibleMoves.forEach((move) => branches.push([move, ...stack]));

        undoAll([...stack]);
        break;
      }
    } while (true); // eslint-disable-line no-constant-condition
  } while (branches.length);

  // eslint-disable-next-line no-console
  console.log(droid.print());

  return stepsRequired;
};
