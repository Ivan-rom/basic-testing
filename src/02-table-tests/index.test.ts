// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Divide, expected: 1 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 'invalid argument', b: 2, action: Action.Add, expected: null },
  { a: 3, b: 2, action: 'invalid action', expected: null },
];
describe('simpleCalculator', () => {
  test.each(testCases)(
    'should calculate $a $action $b = $expected',
    ({ expected, ...args }) => {
      const result = simpleCalculator(args);
      expect(result).toBe(expected);
    },
  );
});
