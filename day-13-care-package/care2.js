const Breakout = require('./breakout');

const patchFreeGames = (memory) => {
  memory[0] = 2;

  return memory;
};

module.exports = (input, display = false) => {
  const program = input.split(',').map(Number);
  const patchedProgram = patchFreeGames(program);
  const game = new Breakout(patchedProgram);

  let highscore = 0;

  game.on('frame', (frame) => {
    if (display) {
      console.log(frame, '\n'); // eslint-disable-line no-console
    }
  });

  game.on('score', (score) => {
    highscore = score;
  });

  game.on('game-over', () => {
    if (display) {
      // eslint-disable-next-line no-console
      console.log(`You win. Highscore: ${highscore}`);
    }
  });

  game.run();

  return highscore;
};
