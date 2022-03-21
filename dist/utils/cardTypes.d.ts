export declare const DEFAULT_CARD_FORMAT: RegExp;
export declare const CARD_TYPES: {
    displayName: string;
    type: string;
    format: RegExp;
    startPattern: RegExp;
    gaps: number[];
    lengths: number[];
}[];
export declare type SINGLE_CARD_TYPE = typeof CARD_TYPES[0];
export declare const getCardByType: (type: string) => {
    displayName: string;
    type: string;
    format: RegExp;
    startPattern: RegExp;
    gaps: number[];
    lengths: number[];
}[];
export declare const getCardTypeByValue: (value: string) => {
    displayName: string;
    type: string;
    format: RegExp;
    startPattern: RegExp;
    gaps: number[];
    lengths: number[];
};
