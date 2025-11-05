import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ action: Action.Add, a: 2, b: 3 });
    expect(result).toBe(5);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ action: Action.Subtract, a: 3, b: 2 });
    expect(result).toBe(1);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ action: Action.Multiply, a: 2, b: 3 });
    expect(result).toBe(6);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ action: Action.Divide, a: 6, b: 3 });
    expect(result).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      action: Action.Exponentiate,
      a: 2,
      b: 3,
    });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ action: 'invalid', a: 2, b: 3 });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ action: Action.Add, a: '', b: null });
    expect(result).toBeNull();
  });
});
