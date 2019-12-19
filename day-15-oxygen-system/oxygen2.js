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
  let shortestPath = [];

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
          shortestPath = [...stack];
        }
      } else {
        possibleMoves.forEach((move) => branches.push([move, ...stack]));

        undoAll([...stack]);
        break;
      }
    } while (true); // eslint-disable-line no-constant-condition
  } while (branches.length);

  droid.move(shortestPath);
  branches.push([]);

  const pathLengths = [];

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
        pathLengths.push(stack.length);
        break;
      } else if (possibleMoves.length === 1) {
        stack.unshift(possibleMoves[0]);
        droid.move([possibleMoves[0]]);
      } else {
        possibleMoves.forEach((move) => branches.push([move, ...stack]));

        undoAll([...stack]);
        break;
      }
    } while (true); // eslint-disable-line no-constant-condition
  } while (branches.length);

  return pathLengths.sort((a, b) => b - a)[0];
};
