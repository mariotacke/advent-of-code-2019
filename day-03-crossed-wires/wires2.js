const getWirePositions = (wire) => {
  const positions = new Map();
  const position = { x: 0, y: 0 };

  let length = 0;

  positions.set(`${position.x},${position.y}`, length);

  for (let i = 0; i < wire.length; i++) {
    const { direction, distance } = wire[i];

    const directionX = direction === 'L' ? -1 : 1;
    const directionY = direction === 'U' ? -1 : 1;

    if (direction === 'U' || direction === 'D') {
      for (let step = 1; step <= distance; step++) {
        length += 1;
        positions.set(`${position.x},${position.y + directionY * step}`, length);
      }

      position.y += directionY * distance;
    } else if (direction === 'L' || direction === 'R') {
      for (let step = 1; step <= distance; step++) {
        length += 1;
        positions.set(`${position.x + directionX * step},${position.y}`, length);
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
  const wire2Positions = [...getWirePositions(wires[1]).entries()];

  return wire2Positions
    .filter(([position]) => wire1Positions.has(position))
    .map(([position, steps]) => wire1Positions.get(position) + steps)
    .slice(1) // skip 0,0
    .sort((a, b) => a - b)[0];
};
