import { EMPTY_CARD_NUMBER, getCardNumberError, INVALID_CARD_NUMBER } from '../../src/utils/validators';

describe('CardNumber Tests', () => {
  const jestMock = jest.fn(getCardNumberError);

  it('should return `undefined` if called correctly', () => {
    expect(jestMock('5199110759598409')).toBe(undefined);
  });

  it('should return `Empty Card Number` if called with empty input', () => {
    expect(jestMock('')).toBe(EMPTY_CARD_NUMBER);
  });

  it('should return `Invalid Card Number` if called with invalid input', () => {
    expect(jestMock('519912830989238')).toBe(INVALID_CARD_NUMBER);
  });

  it('should invoke optional validator with passed params', () => {
    const cardNumberMock = jest.fn();
    jestMock('5199110759598409', cardNumberMock);

    expect(cardNumberMock).toBeCalledWith('5199110759598409');
  });

  it("shouldn't invoke optional validator if passed input is invalid", () => {
    const cardNumberMock = jest.fn();
    jestMock('519912830989238', cardNumberMock);

    expect(cardNumberMock).not.toBeCalled();
  });
});
