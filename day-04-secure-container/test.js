const assert = require('assert');

const secure = require('./secure');

describe('Day 4: Secure Container', () => {
  it('should find number of valid passwords in range', () => {
    assert.strictEqual(secure('122345-122345'), 1);
    assert.strictEqual(secure('111123-111123'), 1);
    assert.strictEqual(secure('111111-111111'), 1);
    assert.strictEqual(secure('223450-223450'), 0);
    assert.strictEqual(secure('123789-123789'), 0);
  });
});
