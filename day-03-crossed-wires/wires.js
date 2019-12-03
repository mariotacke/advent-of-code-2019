const getWirePositions = (wire) => {
  const positions = new Set();
  const position = { x: 0, y: 0 };

  for (let i = 0; i < wire.length; i++) {
    const { direction, distance } = wire[i];

    for (let step = 1; step <= distance; step++) {
      position.x += direction === 'L' ? -1 : direction === 'R' ? 1 : 0;
      position.y += direction === 'U' ? -1 : direction === 'D' ? 1 : 0;

      positions.add(`${position.x},${position.y}`);
    }
  }

  return positions;
};

module.exports = (input) => {
  const wires = input
    .split('\n')
    .map((wire) => {
      return wire
        .trim()
        .split(',')
        .map((instruction) => {
          return {
            direction: instruction[0],
            distance: Number(instruction.slice(1)),
          };
        });
    });

  const wire1Positions = getWirePositions(wires[0]);
  const wire2Positions = [...getWirePositions(wires[1])];

  return wire2Positions
    .filter((position) => wire1Positions.has(position))
    .map((position) => position.split(',').map(Number))
    .map(([x, y]) => Math.abs(x) + Math.abs(y))
    .sort((a, b) => a - b)[0];
};
