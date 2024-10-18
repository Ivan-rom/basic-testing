import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const a = 1;
    const b = 2;
    const expectedResult = 3;
    const calculatedResult = simpleCalculator({ a, b, action: Action.Add });
    expect(calculatedResult).toEqual(expectedResult);
  });

  test('should subtract two numbers', () => {
    const a = 2;
    const b = 1;
    const expectedResult = 1;
    const calculatedResult = simpleCalculator({
      a,
      b,
      action: Action.Subtract,
    });
    expect(calculatedResult).toEqual(expectedResult);
  });

  test('should multiply two numbers', () => {
    const a = 3;
    const b = 2;
    const expectedResult = 6;
    const calculatedResult = simpleCalculator({
      a,
      b,
      action: Action.Multiply,
    });
    expect(calculatedResult).toEqual(expectedResult);
  });

  test('should divide two numbers', () => {
    const a = 4;
    const b = 2;
    const expectedResult = 2;
    const calculatedResult = simpleCalculator({ a, b, action: Action.Divide });
    expect(calculatedResult).toEqual(expectedResult);
  });

  test('should exponentiate two numbers', () => {
    const a = 2;
    const b = 3;
    const expectedResult = 8;
    const calculatedResult = simpleCalculator({
      a,
      b,
      action: Action.Exponentiate,
    });
    expect(calculatedResult).toEqual(expectedResult);
  });

  test('should return null for invalid action', () => {
    const a = 1;
    const b = 2;
    const expectedResult = null;
    const calculatedResult = simpleCalculator({ a, b, action: null });
    expect(calculatedResult).toEqual(expectedResult);
  });

  test('should return null for invalid arguments', () => {
    const a = 'one';
    const b = 'two';
    const expectedResult = null;
    const calculatedResult = simpleCalculator({ a, b, action: Action.Add });
    expect(calculatedResult).toEqual(expectedResult);
  });
});
