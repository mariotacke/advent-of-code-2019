const intcode = require('./intcode');

module.exports = (instructions) => {
  const initialMemory = instructions
    .split(',')
    .map(Number);

  const panels = new Map();

  let memory = [...initialMemory];
  let instructionPointer = 0;
  let relativeBase = 0;

  let result = intcode(memory, instructionPointer, relativeBase, [0]);

  const position = { x: 0, y: 0, dx: 0, dy: -1 };

  while (result) {
    let [memory, instructionPointer, relativeBase, output] = result;

    const turn = output[1] === 0 ? 'left' : 'right';

    if ((panels.get(`${position.x},${position.y}`) || 0) !== output[0]) {
      panels.set(`${position.x},${position.y}`, output[0]);
    }

    const dx = position.dx === 0 ? turn === 'left' ? position.dy : position.dy * -1 : 0;
    const dy = position.dy === 0 ? turn === 'left' ? position.dx * -1 : position.dx : 0;

    position.dx = dx;
    position.dy = dy;
    position.x += position.dx;
    position.y += position.dy;

    const panel = panels.get(`${position.x},${position.y}`) || 0;

    result = intcode(memory, instructionPointer, relativeBase, [panel]);
  }

  return panels.size;
};
