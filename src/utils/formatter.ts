import { getCardTypeByValue, DEFAULT_CARD_FORMAT } from "./cardTypes";

export const formatCardNumber = (cardNumber: string) => {
  // 1. get card type
  const cardType = getCardTypeByValue(cardNumber);

  // 2. format cardNumber by cardType format
  if (cardType) {
    return (cardNumber.match(cardType.format) || []).join(" ");
  }

  return (cardNumber.match(DEFAULT_CARD_FORMAT) || []).join(" ");
};
