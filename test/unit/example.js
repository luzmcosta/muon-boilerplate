/**
 * Unit Test Example
 *
 * Import paths are relative to the build directory, build/test/unit/.
 */

import chai from 'chai';
import greet from '../../scripts/greet';

chai.should();

describe('example test', () => {
  describe('import greet', () => {
    it('greet has integrity', () => {
      Object.keys(greet).should.deep.equal(['greetings', 'make', 'do']);
    });
  });
});
