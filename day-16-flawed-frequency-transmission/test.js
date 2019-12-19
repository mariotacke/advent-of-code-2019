const assert = require('assert');

const fft = require('./fft');

describe('Day 16: Flawed Frequency Transmission', () => {
  it('should determine first eight digits (sample 1)', () => {
    assert.strictEqual(fft('12345678', 1), '48226158');
    assert.strictEqual(fft('12345678', 2), '34040438');
    assert.strictEqual(fft('12345678', 3), '03415518');
    assert.strictEqual(fft('12345678', 4), '01029498');
  });

  it('should determine first eight digits (sample 2)', () => {
    assert.strictEqual(fft('80871224585914546619083218645595'), '24176176');
  });

  it('should determine first eight digits (sample 3)', () => {
    assert.strictEqual(fft('19617804207202209144916044189917'), '73745418');
  });

  it('should determine first eight digits (sample 4)', () => {
    assert.strictEqual(fft('69317163492948606335995924319873'), '52432133');
  });
});
