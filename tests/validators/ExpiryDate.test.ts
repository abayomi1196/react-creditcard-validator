import {
  getExpiryDateError,
  EMPTY_EXPIRY_DATE,
  INVALID_EXPIRY_DATE,
  MONTH_OUT_OF_RANGE,
  YEAR_OUT_OF_RANGE,
  DATE_OUT_OF_RANGE
} from '../../src/utils/validators';

describe('Expiry Date Tests', () => {
  const jestMock = jest.fn(getExpiryDateError);

  it('should return `undefined` if called correctly', () => {
    expect(jestMock('0932')).toBe(undefined);
  });

  it('should return `Enter an expiry date` if called with empty input', () => {
    expect(jestMock('')).toBe(EMPTY_EXPIRY_DATE);
  });

  it('should return `Invalid Expiry Date` if called with incomplete input', () => {
    expect(jestMock('093')).toBe(INVALID_EXPIRY_DATE);
  });

  it('should return `Month out of Range` if called with invalid month value', () => {
    expect(jestMock('2232')).toBe(MONTH_OUT_OF_RANGE);
  });

  it('should return `Invalid Year` if called with invalid year value', () => {
    expect(jestMock('0221')).toBe(YEAR_OUT_OF_RANGE);
  });

  it('should return `Invalid Date` if called with correct year but previous month value', () => {
    expect(jestMock('0222')).toBe(DATE_OUT_OF_RANGE);
  });

  it('should invoke optional validator with passed params', () => {
    const expDateValidatorMock = jest.fn();
    jestMock('0223', expDateValidatorMock);

    expect(expDateValidatorMock).toBeCalledWith('02', '2023');
  });

  it('should have optional validator return either `string` or `undefined`', () => {
    const expDateValidatorMock = jest.fn();
    jestMock('0223', expDateValidatorMock);

    expect(expDateValidatorMock() === typeof String || expDateValidatorMock() === undefined).toBeTruthy();
  });
});
