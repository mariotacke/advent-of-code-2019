const assert = require('assert');

const secure = require('./secure');
const secure2 = require('./secure2');

describe('Day 4: Secure Container', () => {
  it('should find number of valid passwords in range', () => {
    assert.strictEqual(secure('122345-122345'), 1);
    assert.strictEqual(secure('111123-111123'), 1);
    assert.strictEqual(secure('111111-111111'), 1);
    assert.strictEqual(secure('223450-223450'), 0);
    assert.strictEqual(secure('123789-123789'), 0);
  });

  describe('Part Two', () => {
    it('should find number of valid passwords in range', () => {
      assert.strictEqual(secure2('112233-112233'), 1);
      assert.strictEqual(secure2('123444-123444'), 0);
      assert.strictEqual(secure2('111122-111122'), 1);
    });
  });
});
