const getWirePositions = (wire) => {
  const positions = new Set();
  const position = { x: 0, y: 0 };

  positions.add(`${position.x},${position.y}`);

  for (let i = 0; i < wire.length; i++) {
    const { direction, distance } = wire[i];

    const directionX = direction === 'L' ? -1 : 1;
    const directionY = direction === 'U' ? -1 : 1;

    if (direction === 'U' || direction === 'D') {
      for (let step = 1; step <= distance; step++) {
        positions.add(`${position.x},${position.y + directionY * step}`);
      }

      position.y += directionY * distance;
    } else if (direction === 'L' || direction === 'R') {
      for (let step = 1; step <= distance; step++) {
        positions.add(`${position.x + directionX * step},${position.y}`);
      }

      position.x += directionX * distance;
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
    .slice(1) // skip 0,0
    .map((position) => position.split(',').map(Number))
    .map(([x, y]) => Math.abs(x) + Math.abs(y))
    .sort((a, b) => a - b)[0];
};
