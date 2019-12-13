const intcode = require('./intcode');

const print = (panels) => {
  const keys = [...panels.keys()];
  const [width, height] = keys
    .reduce(([maxWidth, maxHeight], xy) => {
      const [x, y] = xy.split(',').map(Number);

      return [Math.max(maxWidth, x), Math.max(maxHeight, y)];
    }, [0, 0]);

  const canvas = Array
    .from({ length: height + 1 })
    .map(() => Array
      .from({ length: width + 1 })
      .map(() => ' '));

  for (let i = 0; i < keys.length; i++) {
    const [x, y] = keys[i].split(',').map(Number);

    canvas[y][x] = panels.get(`${x},${y}`) === 1 ? '█' : ' ';
  }

  return canvas.map((row) => row.join('')).join('\n');
};

module.exports = (instructions) => {
  const initialMemory = instructions
    .split(',')
    .map(Number);

  const panels = new Map();

  let memory = [...initialMemory];
  let instructionPointer = 0;
  let relativeBase = 0;

  const getPanel = () => panels.get(`${position.x},${position.y}`) || 0;

  const position = { x: 0, y: 0, dx: 0, dy: -1 };

  panels.set(`${position.x},${position.y}`, 1);

  let result = intcode(memory, instructionPointer, relativeBase, [getPanel()]);

  while (result) {
    let [memory, instructionPointer, relativeBase, output] = result;

    const turn = output[1] === 0 ? 'left' : 'right';

    panels.set(`${position.x},${position.y}`, output[0]);

    const dx = position.dx === 0 ? turn === 'left' ? position.dy : position.dy * -1 : 0;
    const dy = position.dy === 0 ? turn === 'left' ? position.dx * -1 : position.dx : 0;

    position.dx = dx;
    position.dy = dy;
    position.x += position.dx;
    position.y += position.dy;

    result = intcode(memory, instructionPointer, relativeBase, [getPanel()]);
  }

  return print(panels);
};
