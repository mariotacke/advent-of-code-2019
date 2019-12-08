module.exports = (input, width = 25, height = 6) => {
  const bits = input.split('').map(Number);
  const layers = [];

  for (let i = 0; i < input.length; i += width * height) {
    layers.push(bits.slice(i, i + width * height));
  }

  const pixels = [];

  for (let i = 0; i < width * height; i++) {
    const layeredPixels = layers.map((layer) => layer[i]);

    for (let p = 0; p < layeredPixels.length; p++) {
      if (layeredPixels[p] !== 2) {
        pixels.push(layeredPixels[p]);

        break;
      }
    }
  }

  const image = [];

  for (let i = 0; i < width * height; i += width) {
    image.push(pixels.slice(i, i + width));
  }

  return image
    .map((row) => row
      .map((c) => c === 0 ? ' ' : 'X')
      .join(''))
    .join('\n');
};
