import { getCardTypeByValue, DEFAULT_CARD_FORMAT } from './cardTypes';

export const formatCardNumber = (cardNumber: string) => {
  // 1. get card type
  const cardType = getCardTypeByValue(cardNumber);

  // 2. format cardNumber by cardType format
  if (cardType) {
    return (cardNumber.match(cardType.format) || []).join(' ');
  }

  return (cardNumber.match(DEFAULT_CARD_FORMAT) || []).join(' ');
};

export const formatExpiry = (event: React.ChangeEvent<HTMLInputElement>) => {
  // @ts-ignore
  const eventData = event.nativeEvent && event.nativeEvent?.data;
  const prevExpiry = event.target.value.split(' / ').join('/');

  if (!prevExpiry) return null;
  let expiry: RegExpMatchArray | string = prevExpiry;

  // if number less than 10, prepend 0 to it
  if (/^[2-9]$/.test(expiry)) {
    expiry = `0${expiry}`;
  }

  // if month input exceeds 12, i.e 14 / 40 -> set to 01/4 / 04/
  if (prevExpiry.length === 2 && +prevExpiry > 12) {
    const [head, ...tail] = prevExpiry.split('');
    expiry = `0${head}/${tail.join('')}`;
  }

  expiry = expiry.match(/(\d{1,2})/g) || [];

  if (expiry.length === 1) {
    if (!eventData && prevExpiry.includes('/')) {
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
