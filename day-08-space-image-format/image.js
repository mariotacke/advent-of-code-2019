module.exports = (input, width = 25, height = 6) => {
  const bits = input.split('').map(Number);
  const layers = [];

  for (let x = 0; x < input.length; x += width * height) {
    layers.push(bits.slice(x, x + width * height));
  }

  const fewestZeros = layers
    .map((layer) => {
      return {
        zeros: layer.filter((bit) => bit === 0).length,
        ones: layer.filter((bit) => bit === 1).length,
        twos: layer.filter((bit) => bit === 2).length,
      };
    })
    .sort((a, b) => a.zeros - b.zeros);

  return fewestZeros[0].ones * fewestZeros[0].twos;
};
