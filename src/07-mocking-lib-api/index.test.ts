import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const mockedAxios = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const testPath = '/test/path';

    mockedAxios.create = jest.fn(() => mockedAxios);
    mockedAxios.get.mockResolvedValue({ data: {} });

    await throttledGetDataFromApi(testPath);

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const testPath = '/test/path';

    mockedAxios.create = jest.fn(() => mockedAxios);
    mockedAxios.get.mockResolvedValue({ data: 'mocked data' });

    await throttledGetDataFromApi(testPath);

    expect(mockedAxios.get).toHaveBeenCalledWith(testPath);
  });

  test('should return response data', async () => {
    const testPath = '/test/path';
    const expectedData = 'Expected mocked data';

    mockedAxios.create = jest.fn(() => mockedAxios);
    mockedAxios.get.mockResolvedValue({ data: expectedData });

    const result = await throttledGetDataFromApi(testPath);

    expect(result).toEqual(expectedData);
  });
});
