import { getCVCError, EMPTY_CVC, INVALID_CVC } from '../../src/utils/validators';

describe('CVC Tests', () => {
  const jestMock = jest.fn(getCVCError);

  it('should return return undefined if invoked correctly', () => {
    expect(jestMock('121')).toBe(undefined);
  });

  it('should return return `Enter a CVC` if called with empty string input', () => {
    expect(jestMock('')).toBe(EMPTY_CVC);
  });

  it('should return return `CVC is invalid` if called with incomplete input', () => {
    expect(jestMock('12')).toBe(INVALID_CVC);
  });

  it('should invoke optional validator with passed params', () => {
    const cvcValidatorMock = jest.fn();
    jestMock('123', cvcValidatorMock);

    expect(cvcValidatorMock).toBeCalledWith('123');
  });

  it('should have optional validator return either `string` or `undefined`', () => {
    const cvcValidatorMock = jest.fn();
    jestMock('123', cvcValidatorMock);

    expect(cvcValidatorMock() === typeof String || cvcValidatorMock() === undefined).toBeTruthy();
  });
});
