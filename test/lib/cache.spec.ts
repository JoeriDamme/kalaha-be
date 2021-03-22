import { Cache } from '../../src/lib/cache';
import chai from 'chai';
const expect = chai.expect;

describe('lib/cache', () => {
  describe('get()/set()', () => {
    it('should get value from cache', () => {
      const key = 'qwerty';
      const value = {
        x: 1337
      };
      Cache.getInstance().set(key, value);
      const result = Cache.getInstance().get(key);
      expect(result).to.be.deep.equal({
        x: 1337,
      });
    });
  });
});
