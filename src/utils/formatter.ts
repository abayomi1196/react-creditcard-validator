import { getCardTypeByValue, DEFAULT_CARD_FORMAT } from './cardTypes';

/**
 * This function extracts the card type from the cardNumber argument, then proceeds to format it according to the format associated with that card, or by the default card format, finally the formatted card number is then returned.
 * @param cardNumber string
 * @returns string
 */
export const formatCardNumber = (cardNumber: string) => {
  const cardType = getCardTypeByValue(cardNumber);

  if (cardType) {
    return (cardNumber.match(cardType.format) || []).join(' ');
  }

  return (cardNumber.match(DEFAULT_CARD_FORMAT) || []).join(' ');
};

/**
 * Formats the expiry date input, using the input event.
 * @param event
 * @returns string
 */
export const formatExpiry = (event: React.ChangeEvent<HTMLInputElement>) => {
  const prevExpiry = event.target.value.split(' / ').join('/');

  if (!prevExpiry) return '';
  let expiry: RegExpMatchArray | string = prevExpiry;

  // if number less than 10, prepend 0 to it
  if (/^[2-9]$/.test(expiry)) {
    expiry = `0${expiry}`;
  }

  // if month input exceeds 12, i.e 14 or 40 -> set to 01/4 or 04/
  if (prevExpiry.length === 2 && +prevExpiry > 12) {
    const [head, ...tail] = prevExpiry.split('');
    expiry = `0${head}/${tail.join('')}`;
  }

  expiry = expiry.match(/(\d{1,2})/g) || [];

  if (expiry.length === 1) {
    if (prevExpiry.includes('/')) {
      return expiry[0];
    }
    if (/\d{2}/.test(String(expiry))) {
      return `${expiry[0]} / `;
    }
  }

  if (expiry.length > 2) {
    const [, month = null, year = null] = expiry.join('').match(/^(\d{2}).*(\d{2})$/) || [];
    return [month, year].join(' / ');
  }

  return expiry.join(' / ');
};
