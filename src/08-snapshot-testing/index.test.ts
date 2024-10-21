import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const testArray = [1, 2, 3];
    const list = generateLinkedList(testArray);
    expect(list).toStrictEqual({
      value: 1,
      next: { value: 2, next: { value: 3, next: { value: null, next: null } } },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const testArray = [1, 2, 3];

    expect(generateLinkedList(testArray)).toMatchSnapshot();
  });
});
