/**
 * This function extracts the card type from the cardNumber argument, then proceeds to format it according to the format associated with that card, or by the default card format, finally the formatted card number is then returned.
 * @param cardNumber string
 * @returns string
 */
export declare const formatCardNumber: (cardNumber: string) => string;
/**
 * Formats the expiry date input, using the input event.
 * @param event
 * @returns string
 */
export declare const formatExpiry: (event: React.ChangeEvent<HTMLInputElement>) => string;
