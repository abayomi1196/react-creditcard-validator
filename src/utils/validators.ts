import { getCardTypeByValue } from './cardTypes';

const MONTH_REGEX = /(0[1-9]|1[0-2])/;

export const EMPTY_CARD_NUMBER = 'Enter a card number';
export const EMPTY_EXPIRY_DATE = 'Enter an expiry date';
export const EMPTY_CVC = 'Enter a CVC';

export const INVALID_CARD_NUMBER = 'Card number is invalid';
export const INVALID_EXPIRY_DATE = 'Expiry date is invalid';
export const INVALID_CVC = 'CVC is invalid';

export const MONTH_OUT_OF_RANGE = 'Expiry month must be between 01 and 12';
export const YEAR_OUT_OF_RANGE = 'Expiry year cannot be in the past';
export const DATE_OUT_OF_RANGE = 'Expiry date cannot be in the past';

export const hasCardNumberReachedMaxLength = (currentValue: string) => {
  const cardType = getCardTypeByValue(currentValue);
  return cardType && currentValue.length >= cardType.lengths[cardType.lengths.length - 1];
};

// https://en.wikipedia.org/wiki/Luhn_algorithm
// luhn validation
export const validateLuhn = (cardNumber: string) => {
  return (
    cardNumber
      .split('')
      .reverse()
      .map((digit) => parseInt(digit, 10))
      .map((digit, idx) => (idx % 2 ? digit * 2 : digit))
      .map((digit) => (digit > 9 ? (digit % 10) + 1 : digit))
      .reduce((accum, digit) => (accum += digit)) %
      10 ===
    0
  );
};

/**
 * Validates card number inputs, checking against empty inputs, and validating with the `validateLuhn` method & custom validation through the `cardNumberValidator` function.
 * @param cardNumber
 * @param {Function} cardNumberValidator
 * @returns string | boolean | undefined
 */
export const getCardNumberError = (
  cardNumber: string,
  cardNumberValidator?: (cardNumber: string) => string | undefined
) => {
  if (!cardNumber) {
    return EMPTY_CARD_NUMBER;
  }

  const rawCardNumber = cardNumber.replace(/\s/g, '');
  const cardType = getCardTypeByValue(rawCardNumber);

  if (cardType && cardType.lengths) {
    const doesCardNumberMatchLength = cardType.lengths.includes(rawCardNumber.length);

    if (doesCardNumberMatchLength) {
      const isLuhnValid = validateLuhn(rawCardNumber);

      if (isLuhnValid) {
        if (cardNumberValidator) {
          return cardNumberValidator(rawCardNumber);
        }
        return;
      }
    }
  }

  if (cardNumberValidator && rawCardNumber.length >= 16) {
    return cardNumberValidator(rawCardNumber);
  }

  return INVALID_CARD_NUMBER;
};

/**
 * Validates expiry date inputs, checking against empty inputs, invalid months / years, or past dates. Also provides custom validation through the `expiryDateValidator` function
 * @param expiryDate
 * @param {Function} expiryDateValidator
 * @returns string | undefined
 */
export const getExpiryDateError = (
  expiryDate: string,
  expiryDateValidator?: (month: string, year: string) => string | undefined
) => {
  if (!expiryDate) {
    return EMPTY_EXPIRY_DATE;
  }

  const rawExpiryDate = expiryDate.replace(' / ', '').replace('/', '');

  if (rawExpiryDate.length === 4) {
    const month = rawExpiryDate.slice(0, 2);
    const year = `20${rawExpiryDate.slice(2, 4)}`;

    if (!MONTH_REGEX.test(month)) {
      return MONTH_OUT_OF_RANGE;
    }

    if (parseInt(year) < new Date().getFullYear()) {
      return YEAR_OUT_OF_RANGE;
    }

    if (parseInt(year) === new Date().getFullYear() && parseInt(month) < new Date().getMonth() + 1) {
      return DATE_OUT_OF_RANGE;
    }

    if (expiryDateValidator) {
      return expiryDateValidator(month, year);
    }

    return;
  }
  return INVALID_EXPIRY_DATE;
};

/**
 * Validates cvc input, checking for empty inputs & incomplete inputs. Also invokes user custom validation logic if its exists.
 * @param {string} cvc
 * @param {Function} [cvcValidator]
 * @returns string | undefined
 */
export const getCVCError = (cvc: string, cvcValidator?: (cvc: string) => string | undefined) => {
  if (!cvc) {
    return EMPTY_CVC;
  }
  if (cvc.length < 3) {
    return INVALID_CVC;
  }
  if (cvcValidator) {
    return cvcValidator(cvc);
  }
};
