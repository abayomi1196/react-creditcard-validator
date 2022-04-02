import { formatCardNumber } from '../../src/utils/formatter';
import { DEFAULT_CARD_FORMAT } from '../../src/utils/cardTypes';

describe('CardNumber Format tests', () => {
  const formatFn = jest.fn(formatCardNumber);

  it('should use default formatting', () => {
    expect(formatFn('5199110759598409')).toMatch(DEFAULT_CARD_FORMAT);
  });
});
