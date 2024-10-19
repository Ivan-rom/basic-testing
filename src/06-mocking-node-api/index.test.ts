import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const fnSpy = jest.fn();
    const timeout = 1000;
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(fnSpy, timeout);

    expect(setTimeoutSpy).toBeCalledWith(fnSpy, timeout);
  });

  test('should call callback only after timeout', () => {
    const fnSpy = jest.fn();
    const timeout = 10000;

    doStuffByTimeout(fnSpy, timeout);

    expect(fnSpy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(fnSpy).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const fnSpy = jest.fn();
    const timeout = 1000;
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(fnSpy, timeout);

    expect(setIntervalSpy).toBeCalledWith(fnSpy, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const fnSpy = jest.fn();
    const timeout = 10000;
    const iterations = 3;

    doStuffByInterval(fnSpy, timeout);

    expect(fnSpy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout * iterations);

    expect(fnSpy).toBeCalledTimes(iterations);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const joinSpy = jest.spyOn(path, 'join');

    const testPath = 'testPathToFile';

    readFileAsynchronously(testPath);

    expect(joinSpy).toBeCalledWith(expect.any(String), testPath);
  });

  test('should return null if file does not exist', async () => {
    const testPath = 'testPathToNonExistFile';

    const result = await readFileAsynchronously(testPath);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const testPath = 'index.ts';

    const result = await readFileAsynchronously(testPath);

    expect(typeof result).toBe('string');
  });
});
