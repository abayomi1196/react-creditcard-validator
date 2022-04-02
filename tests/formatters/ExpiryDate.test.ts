import { formatExpiry } from '../../src/utils/formatter';

describe('Card Expiry Date formatting tests', () => {
  const mockFn = jest.fn(formatExpiry);

  it('should return an empty string, if passed an invalid input', () => {
    expect(mockFn('')).toBe('');
  });

  it('should return properly formatted output when called with valid input', () => {
    expect(mockFn('1120')).toBe('11 / 20');
  });

  it('should return properly formatted month output when called with 2 digit input less than or equal to 12', () => {
    expect(mockFn('10')).toBe('10 / ');
  });

  it('should return formatted output where `month = 0 + input.charAt(0)` & `year = input.charAt(1)` when called with 2 digit input greater than 12', () => {
    expect(mockFn('13')).toBe('01 / 3');
  });
});
