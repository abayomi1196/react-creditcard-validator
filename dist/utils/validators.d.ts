export declare const EMPTY_CARD_NUMBER = "Enter a card number";
export declare const EMPTY_EXPIRY_DATE = "Enter an expiry date";
export declare const EMPTY_CVC = "Enter a CVC";
export declare const INVALID_CARD_NUMBER = "Card number is invalid";
export declare const INVALID_EXPIRY_DATE = "Expiry date is invalid";
export declare const INVALID_CVC = "CVC is invalid";
export declare const MONTH_OUT_OF_RANGE = "Expiry month must be between 01 and 12";
export declare const YEAR_OUT_OF_RANGE = "Expiry year cannot be in the past";
export declare const DATE_OUT_OF_RANGE = "Expiry date cannot be in the past";
export declare const hasCardNumberReachedMaxLength: (currentValue: string) => boolean;
export declare const validateLuhn: (cardNumber: string) => boolean;
/**
 * Validates card number inputs, checking against empty inputs, and validating with the `validateLuhn` method.
 * @param cardNumber
 * @returns string | boolean
 */
export declare const getCardNumberError: (cardNumber: string) => boolean | "Enter a card number" | "Card number is invalid";
/**
 * Validates expiry date inputs, checking against empty inputs, invalid months / years, or past dates.
 * @param expiryDate
 * @returns string | undefined
 */
export declare const getExpiryDateError: (expiryDate: string) => "Enter an expiry date" | "Expiry date is invalid" | "Expiry month must be between 01 and 12" | "Expiry year cannot be in the past" | "Expiry date cannot be in the past" | undefined;
/**
 * Validates cvc input, checking for empty inputs & incomplete inputs.
 * @param cvc
 * @returns string
 */
export declare const getCVCError: (cvc: string) => "Enter a CVC" | "CVC is invalid" | undefined;
