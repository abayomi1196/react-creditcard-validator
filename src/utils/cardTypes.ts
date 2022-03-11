export const CVC_LENGTH = 3;
export const DEFAULT_CARD_FORMAT = /(\d{1,4})/g;
export const CARD_TYPES = [
  {
    displayName: "Visa",
    type: "visa",
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^4/,
    gaps: [4, 8, 12],
    lengths: [16, 18, 19],
  },
  {
    displayName: "Mastercard",
    type: "mastercard",
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
    gaps: [4, 8, 12],
    lengths: [16],
  },
  {
    displayName: "Verve",
    type: "verve",
    format: DEFAULT_CARD_FORMAT,
    startPattern: /^5061/,
    gaps: [4, 8, 12],
    lengths: [19],
  },
];

export const getCardByType = (type: string) =>
  CARD_TYPES.filter((cardType) => cardType.type === type);
