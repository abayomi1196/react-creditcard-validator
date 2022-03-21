Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

var DEFAULT_CARD_FORMAT = /(\d{1,4})/g;
var CARD_TYPES = [
    {
        displayName: 'Visa',
        type: 'visa',
        format: DEFAULT_CARD_FORMAT,
        startPattern: /^4/,
        gaps: [4, 8, 12],
        lengths: [16, 18, 19]
    },
    {
        displayName: 'Mastercard',
        type: 'mastercard',
        format: DEFAULT_CARD_FORMAT,
        startPattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
        gaps: [4, 8, 12],
        lengths: [16]
    },
    {
        displayName: 'Verve',
        type: 'verve',
        format: DEFAULT_CARD_FORMAT,
        startPattern: /^5061/,
        gaps: [4, 8, 12],
        lengths: [18, 19]
    }
];
var getCardTypeByValue = function (value) {
    return CARD_TYPES.filter(function (cardType) { return cardType.startPattern.test(value); })[0];
};

/**
 * This function extracts the card type from the cardNumber argument, then proceeds to format it according to the format associated with that card, or by the default card format, finally the formatted card number is then returned.
 * @param cardNumber string
 * @returns string
 */
var formatCardNumber = function (cardNumber) {
    var cardType = getCardTypeByValue(cardNumber);
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
var formatExpiry = function (event) {
    var prevExpiry = event.target.value.split(' / ').join('/');
    if (!prevExpiry)
        return '';
    var expiry = prevExpiry;
    // if number less than 10, prepend 0 to it
    if (/^[2-9]$/.test(expiry)) {
        expiry = "0".concat(expiry);
    }
    // if month input exceeds 12, i.e 14 or 40 -> set to 01/4 or 04/
    if (prevExpiry.length === 2 && +prevExpiry > 12) {
        var _a = prevExpiry.split(''), head = _a[0], tail = _a.slice(1);
        expiry = "0".concat(head, "/").concat(tail.join(''));
    }
    expiry = expiry.match(/(\d{1,2})/g) || [];
    if (expiry.length === 1) {
        if (prevExpiry.includes('/')) {
            return expiry[0];
        }
        if (/\d{2}/.test(String(expiry))) {
            return "".concat(expiry[0], " / ");
        }
    }
    if (expiry.length > 2) {
        var _b = expiry.join('').match(/^(\d{2}).*(\d{2})$/) || [], _c = _b[1], month = _c === void 0 ? null : _c, _d = _b[2], year = _d === void 0 ? null : _d;
        return [month, year].join(' / ');
    }
    return expiry.join(' / ');
};

var MONTH_REGEX = /(0[1-9]|1[0-2])/;
var EMPTY_CARD_NUMBER = 'Enter a card number';
var EMPTY_EXPIRY_DATE = 'Enter an expiry date';
var EMPTY_CVC = 'Enter a CVC';
var INVALID_CARD_NUMBER = 'Card number is invalid';
var INVALID_EXPIRY_DATE = 'Expiry date is invalid';
var INVALID_CVC = 'CVC is invalid';
var MONTH_OUT_OF_RANGE = 'Expiry month must be between 01 and 12';
var YEAR_OUT_OF_RANGE = 'Expiry year cannot be in the past';
var DATE_OUT_OF_RANGE = 'Expiry date cannot be in the past';
var hasCardNumberReachedMaxLength = function (currentValue) {
    var cardType = getCardTypeByValue(currentValue);
    return cardType && currentValue.length >= cardType.lengths[cardType.lengths.length - 1];
};
// https://en.wikipedia.org/wiki/Luhn_algorithm
// luhn validation
var validateLuhn = function (cardNumber) {
    return (cardNumber
        .split('')
        .reverse()
        .map(function (digit) { return parseInt(digit, 10); })
        .map(function (digit, idx) { return (idx % 2 ? digit * 2 : digit); })
        .map(function (digit) { return (digit > 9 ? (digit % 10) + 1 : digit); })
        .reduce(function (accum, digit) { return (accum += digit); }) %
        10 ===
        0);
};
/**
 * Validates card number inputs, checking against empty inputs, and validating with the `validateLuhn` method.
 * @param cardNumber
 * @returns string | boolean
 */
var getCardNumberError = function (cardNumber) {
    if (!cardNumber) {
        return EMPTY_CARD_NUMBER;
    }
    var rawCardNumber = cardNumber.replace(/\s/g, '');
    var cardType = getCardTypeByValue(rawCardNumber);
    if (cardType && cardType.lengths) {
        var doesCardNumberMatchLength = cardType.lengths.includes(rawCardNumber.length);
        if (doesCardNumberMatchLength) {
            var isLuhnValid = validateLuhn(rawCardNumber);
            return isLuhnValid;
        }
    }
    return INVALID_CARD_NUMBER;
};
/**
 * Validates expiry date inputs, checking against empty inputs, invalid months / years, or past dates.
 * @param expiryDate
 * @returns string | undefined
 */
var getExpiryDateError = function (expiryDate) {
    if (!expiryDate) {
        return EMPTY_EXPIRY_DATE;
    }
    var rawExpiryDate = expiryDate.replace(' / ', '').replace('/', '');
    if (rawExpiryDate.length === 4) {
        var month = rawExpiryDate.slice(0, 2);
        var year = "20".concat(rawExpiryDate.slice(2, 4));
        if (!MONTH_REGEX.test(month)) {
            return MONTH_OUT_OF_RANGE;
        }
        if (parseInt(year) < new Date().getFullYear()) {
            return YEAR_OUT_OF_RANGE;
        }
        if (parseInt(year) === new Date().getFullYear() && parseInt(month) < new Date().getMonth() + 1) {
            return DATE_OUT_OF_RANGE;
        }
        return;
    }
    return INVALID_EXPIRY_DATE;
};
/**
 * Validates cvc input, checking for empty inputs & incomplete inputs.
 * @param cvc
 * @returns string
 */
var getCVCError = function (cvc) {
    if (!cvc) {
        return EMPTY_CVC;
    }
    if (cvc.length < 3) {
        return INVALID_CVC;
    }
};

function useCreditCardInput() {
    /*===State, Refs & Utility Fns===*/
    var cardNumberField = react.useRef();
    var expiryDateField = react.useRef();
    var cvcField = react.useRef();
    var _a = react.useState(), cardType = _a[0], setCardType = _a[1];
    var _b = react.useState(), error = _b[0], setError = _b[1];
    var _c = react.useState(), focused = _c[0], setFocused = _c[1];
    var _d = react.useState({
        cardNumber: false,
        expiryDate: false,
        cvc: false
    }), touchedInputs = _d[0], setTouchedInputs = _d[1];
    var _e = react.useState({
        cardNumber: undefined,
        expiryDate: undefined,
        cvc: undefined
    }), erroredInputs = _e[0], setErroredInputs = _e[1];
    var setInputTouched = react.useCallback(function (input, value) {
        setTouchedInputs(function (touchedInputs) {
            var _a;
            if (touchedInputs[input] === value)
                return touchedInputs;
            var newTouchedInputs = __assign(__assign({}, touchedInputs), (_a = {}, _a[input] = value, _a));
            return newTouchedInputs;
        });
    }, []);
    var setInputError = react.useCallback(function (input, error) {
        setErroredInputs(function (erroredInputs) {
            var _a;
            if (erroredInputs[input] === error)
                return erroredInputs;
            var newError = error;
            var newErroredInputs = __assign(__assign({}, erroredInputs), (_a = {}, _a[input] = error, _a));
            if (error) {
                setError(error);
            }
            else {
                newError = Object.values(newErroredInputs).find(Boolean);
                setError(newError);
            }
            return newErroredInputs;
        });
    }, []);
    /*===End of State, Refs & Utility Fns===*/
    /*===Card Number ===*/
    var handleBlurCardNumber = react.useCallback(function (props) {
        if (props === void 0) { props = {}; }
        return function (e) {
            setFocused(undefined);
            setInputTouched('cardNumber', false);
            var formattedCardNumber = e.target.value || '';
            var cardNumber = formattedCardNumber.replace(/\s/g, '');
            var cardNumberError = getCardNumberError(cardNumber);
            if (!cardNumberError) {
                expiryDateField.current && expiryDateField.current.focus();
            }
            // update cardNumberError if cardNumber is not currently being edited, and show error message only after blurOut change.
            !touchedInputs['cardNumber'] && setInputError('cardNumber', cardNumberError);
            props.onError && props.onError(cardNumberError);
            props.onBlur && props.onBlur(e);
        };
    }, [setInputTouched]);
    var handleChangeCardNumber = react.useCallback(function (props) {
        if (props === void 0) { props = {}; }
        return function (e) {
            var formattedCardNumber = e.target.value || '';
            var cardNumber = formattedCardNumber.replace(/\s/g, '');
            var cardType = getCardTypeByValue(cardNumber);
            setCardType(cardType);
            if (cardNumberField.current) {
                cardNumberField.current.value = formatCardNumber(cardNumber);
            }
            setInputTouched('cardNumber', true);
            setInputError('cardNumber', undefined);
            props.onChange && props.onChange(e);
        };
    }, [setInputTouched, setInputError]);
    var handleFocusCardNumber = react.useCallback(function (props) {
        if (props === void 0) { props = {}; }
        return function (e) {
            props.onFocus && props.onFocus(e);
            setFocused('cardNumber');
        };
    }, []);
    var handleKeyPressCardNumber = react.useCallback(function (props) {
        if (props === void 0) { props = {}; }
        return function (e) {
            var formattedCardNumber = e.target.value || '';
            var cardNumber = formattedCardNumber.replace(/\s/g, '');
            if (e.key !== 'Enter') {
                if (hasCardNumberReachedMaxLength(cardNumber)) {
                    e.preventDefault();
                    expiryDateField.current && expiryDateField.current.focus();
                }
            }
            props.onKeyPress && props.onKeyPress(e);
        };
    }, []);
    var getCardNumberProps = react.useCallback(function (props) {
        if (props === void 0) { props = {}; }
        return (__assign(__assign({ 'aria-label': 'Card number', autoComplete: 'cc-number', id: 'cardNumber', name: 'cardNumber', placeholder: '0000 0000 0000 0000', type: 'tel', ref: cardNumberField }, props), { maxLength: cardType ? undefined : 19, onChange: handleChangeCardNumber(props), onBlur: handleBlurCardNumber(props), onFocus: handleFocusCardNumber(props), onKeyPress: handleKeyPressCardNumber(props) }));
    }, [cardType, handleChangeCardNumber, handleBlurCardNumber, handleFocusCardNumber, handleKeyPressCardNumber]);
    /*===End of Card Number ===*/
    /*===Card Image ===*/
    var getCardImageProps = react.useCallback(function (props) {
        if (props === void 0) { props = {}; }
        var images = props.images || {};
        return __assign({ 'aria-label': cardType ? cardType.displayName : 'Placeholder card', children: images[cardType ? cardType.type : 'placeholder'] || images.placeholder, width: '1.5em', height: '1em', viewBox: '0 0 24 16' }, props);
    }, [cardType]);
    /*===End of Card Image ===*/
    /*===Expiry Date ===*/
    var handleBlurExpiryDate = react.useCallback(function (props) {
        if (props === void 0) { props = {}; }
        return function (e) {
            setFocused(undefined);
            setInputTouched('expiryDate', false);
            if (expiryDateField.current) {
                var expiryDateError = getExpiryDateError(expiryDateField.current.value);
                // update expiryDateError if expiryDate is not currently being edited, and show error message only after blurOut change.
                !touchedInputs['expiryDate'] && setInputError('expiryDate', expiryDateError);
                props.onError && props.onError(expiryDateError);
            }
            props.onBlur && props.onBlur(e);
        };
    }, [setInputTouched]);
    var handleChangeExpiryDate = react.useCallback(function (props) {
        if (props === void 0) { props = {}; }
        return function (e) {
            if (expiryDateField.current) {
                expiryDateField.current.value = formatExpiry(e);
                var expiryDateError = getExpiryDateError(expiryDateField.current.value);
                if (!expiryDateError) {
                    cvcField.current && cvcField.current.focus();
                }
                setInputTouched('expiryDate', true);
                setInputError('expiryDate', undefined);
            }
            props.onChange && props.onChange(e);
        };
    }, [setInputError]);
    var handleKeyDownExpiryDate = react.useCallback(function (props) {
        if (props === void 0) { props = {}; }
        return function (e) {
            if (e.key !== 'Enter') {
                if (e.key === 'Backspace' && !e.target.value) {
                    cardNumberField.current && cardNumberField.current.focus();
                }
            }
            props.onKeyDown && props.onKeyDown(e);
        };
    }, []);
    var getExpiryDateProps = react.useCallback(function (props) {
        if (props === void 0) { props = {}; }
        return (__assign(__assign({ 'aria-label': 'Expiry date in format MM YY', autoComplete: 'cc-exp', id: 'expiryDate', name: 'expiryDate', placeholder: 'MM/YY', type: 'tel', ref: expiryDateField }, props), { onChange: handleChangeExpiryDate(props), onBlur: handleBlurExpiryDate(props), onKeyDown: handleKeyDownExpiryDate(props) }));
    }, [handleChangeExpiryDate, handleBlurExpiryDate, handleKeyDownExpiryDate]);
    /*===End ofExpiry Date ===*/
    /*===CVC ===*/
    var handleBlurCVC = react.useCallback(function (props) {
        if (props === void 0) { props = {}; }
        return function (e) {
            setFocused(undefined);
            setInputTouched('cvc', false);
            var cvc = e.target.value;
            var cvcError = getCVCError(cvc);
            // update cvcError if cvc is not currently being edited, and show error message only after blurOut change.
            !touchedInputs['cvc'] && setInputError('cvc', cvcError);
            props.onError && props.onError(cvcError);
            props.onBlur && props.onBlur(e);
        };
    }, [setInputTouched]);
    var handleChangeCVC = react.useCallback(function (props) {
        if (props === void 0) { props = {}; }
        return function (e) {
            setInputTouched('cvc', true);
            setInputError('cvc', undefined);
            props.onChange && props.onChange(e);
        };
    }, [setInputError, setInputTouched]);
    var handleFocusCVC = react.useCallback(function (props) {
        if (props === void 0) { props = {}; }
        return function (e) {
            props.onFocus && props.onFocus(e);
            setFocused('cvc');
        };
    }, []);
    var handleKeyDownCVC = react.useCallback(function (props) {
        if (props === void 0) { props = {}; }
        return function (e) {
            if (e.key === 'Backspace' && !e.target.value) {
                expiryDateField.current && expiryDateField.current.focus();
            }
            props.onKeyDown && props.onKeyDown(e);
        };
    }, []);
    var handleKeyPressCVC = react.useCallback(function (props) {
        if (props === void 0) { props = {}; }
        return function (e) {
            var formattedCVC = e.target.value || '';
            var cvc = formattedCVC.replace(' / ', '');
            if (e.key !== 'Enter') {
                if (cvc.length >= 3) {
                    e.preventDefault();
                }
            }
            props.onKeyPress && props.onKeyPress(e);
        };
    }, []);
    var getCVCProps = react.useCallback(function (props) {
        if (props === void 0) { props = {}; }
        return (__assign(__assign({ 'aria-label': 'CVC', autoComplete: 'cc-csc', id: 'cvc', name: 'cvc', placeholder: 'CVC', type: 'tel', ref: cvcField }, props), { onBlur: handleBlurCVC(props), onChange: handleChangeCVC(props), onFocus: handleFocusCVC(props), onKeyDown: handleKeyDownCVC(props), onKeyPress: handleKeyPressCVC(props) }));
    }, [handleBlurCVC, handleChangeCVC, handleFocusCVC, handleKeyDownCVC, handleKeyPressCVC]);
    /*===End of CVC ===*/
    return {
        getCardNumberProps: getCardNumberProps,
        getCardImageProps: getCardImageProps,
        getExpiryDateProps: getExpiryDateProps,
        getCVCProps: getCVCProps,
        meta: {
            cardType: cardType,
            erroredInputs: erroredInputs,
            error: error,
            focused: focused,
            touchedInputs: touchedInputs
        }
    };
}

var mastercard = (jsxRuntime.jsxs("g", __assign({ fill: "none", fillRule: "evenodd" }, { children: [jsxRuntime.jsx("rect", { fill: "#252525", height: "16", rx: "2", width: "24" }), jsxRuntime.jsx("circle", { cx: "9", cy: "8", fill: "#eb001b", r: "5" }), jsxRuntime.jsx("circle", { cx: "15", cy: "8", fill: "#f79e1b", r: "5" }), jsxRuntime.jsx("path", { d: "m12 3.99963381c1.2144467.91220633 2 2.36454836 2 4.00036619s-.7855533 3.0881599-2 4.0003662c-1.2144467-.9122063-2-2.36454837-2-4.0003662s.7855533-3.08815986 2-4.00036619z", fill: "#ff5f00" })] })));

var placeholder = (jsxRuntime.jsxs("svg", __assign({ width: "22", height: "22", viewBox: "0 0 22 22", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, { children: [jsxRuntime.jsxs("g", __assign({ clipPath: "url(#clip0_815_581)" }, { children: [jsxRuntime.jsx("path", { d: "M15.125 7.5625C15.125 7.38016 15.1974 7.2053 15.3264 7.07636C15.4553 6.94743 15.6302 6.875 15.8125 6.875H18.5625C18.7448 6.875 18.9197 6.94743 19.0486 7.07636C19.1776 7.2053 19.25 7.38016 19.25 7.5625V8.9375C19.25 9.11984 19.1776 9.2947 19.0486 9.42364C18.9197 9.55257 18.7448 9.625 18.5625 9.625H15.8125C15.6302 9.625 15.4553 9.55257 15.3264 9.42364C15.1974 9.2947 15.125 9.11984 15.125 8.9375V7.5625Z", fill: "#8B8C8C" }), jsxRuntime.jsx("path", { d: "M2.75 2.75C2.02065 2.75 1.32118 3.03973 0.805456 3.55546C0.289731 4.07118 0 4.77065 0 5.5L0 16.5C0 17.2293 0.289731 17.9288 0.805456 18.4445C1.32118 18.9603 2.02065 19.25 2.75 19.25H19.25C19.9793 19.25 20.6788 18.9603 21.1945 18.4445C21.7103 17.9288 22 17.2293 22 16.5V5.5C22 4.77065 21.7103 4.07118 21.1945 3.55546C20.6788 3.03973 19.9793 2.75 19.25 2.75H2.75ZM20.625 5.5V12.375H1.375V5.5C1.375 5.13533 1.51987 4.78559 1.77773 4.52773C2.03559 4.26987 2.38533 4.125 2.75 4.125H19.25C19.6147 4.125 19.9644 4.26987 20.2223 4.52773C20.4801 4.78559 20.625 5.13533 20.625 5.5ZM19.25 17.875H2.75C2.38533 17.875 2.03559 17.7301 1.77773 17.4723C1.51987 17.2144 1.375 16.8647 1.375 16.5V15.125H20.625V16.5C20.625 16.8647 20.4801 17.2144 20.2223 17.4723C19.9644 17.7301 19.6147 17.875 19.25 17.875Z", fill: "#8B8C8C" })] })), jsxRuntime.jsx("defs", { children: jsxRuntime.jsx("clipPath", __assign({ id: "clip0_815_581" }, { children: jsxRuntime.jsx("rect", { width: "22", height: "22", fill: "white" }) })) })] })));

var visa = (jsxRuntime.jsx("g", __assign({ stroke: "none", strokeWidth: "1", fill: "none", fillRule: "evenodd" }, { children: jsxRuntime.jsx("g", __assign({ id: "New-Icons", transform: "translate(-80.000000, -280.000000)", fillRule: "nonzero" }, { children: jsxRuntime.jsx("g", __assign({ id: "Card-Brands", transform: "translate(40.000000, 200.000000)" }, { children: jsxRuntime.jsx("g", __assign({ id: "Color", transform: "translate(0.000000, 80.000000)" }, { children: jsxRuntime.jsxs("g", __assign({ id: "Visa", transform: "translate(40.000000, 0.000000)" }, { children: [jsxRuntime.jsx("rect", { strokeOpacity: "0.2", stroke: "#000000", strokeWidth: "0.5", fill: "#FFFFFF", x: "0.25", y: "0.25", width: "23.5", height: "15.5", rx: "2" }), jsxRuntime.jsx("path", { d: "M2.78773262,5.91443732 C2.26459089,5.62750595 1.6675389,5.39673777 1,5.23659312 L1.0280005,5.1118821 L3.76497922,5.1118821 C4.13596254,5.12488556 4.43699113,5.23650585 4.53494636,5.63071135 L5.12976697,8.46659052 L5.31198338,9.32072617 L6.97796639,5.1118821 L8.77678896,5.1118821 L6.10288111,11.2775284 L4.30396552,11.2775284 L2.78773262,5.91443732 L2.78773262,5.91443732 Z M10.0999752,11.2840738 L8.39882877,11.2840738 L9.46284763,5.1118821 L11.163901,5.1118821 L10.0999752,11.2840738 Z M16.2667821,5.26277458 L16.0354292,6.59558538 L15.881566,6.53004446 C15.5737466,6.40524617 15.1674138,6.28053516 14.6143808,6.29371316 C13.942741,6.29371316 13.6415263,6.56277129 13.6345494,6.82545859 C13.6345494,7.11441463 13.998928,7.3048411 14.5939153,7.58725177 C15.5740257,8.02718756 16.0286384,8.56556562 16.0218476,9.26818871 C16.0080799,10.5486366 14.8460128,11.376058 13.0610509,11.376058 C12.2978746,11.3694253 11.5627918,11.2180965 11.163808,11.0475679 L11.4018587,9.66204513 L11.6258627,9.76066195 C12.1788958,9.99070971 12.5428092,10.0889775 13.221984,10.0889775 C13.7117601,10.0889775 14.2368857,9.89837643 14.2435835,9.48488392 C14.2435835,9.21565125 14.0198586,9.01850486 13.3617074,8.7164581 C12.717789,8.42086943 11.8568435,7.92848346 11.8707973,7.04197926 C11.8780532,5.84042483 13.0610509,5 14.7409877,5 C15.3990458,5 15.9312413,5.13788902 16.2667821,5.26277458 Z M18.5277524,9.0974856 L19.941731,9.0974856 C19.8717762,8.78889347 19.549631,7.31147374 19.549631,7.31147374 L19.4307452,6.77964104 C19.3467437,7.00942698 19.1998574,7.38373457 19.2069273,7.37055657 C19.2069273,7.37055657 18.6678479,8.74290137 18.5277524,9.0974856 Z M20.6276036,5.1118821 L22,11.2839865 L20.4249023,11.2839865 C20.4249023,11.2839865 20.2707601,10.5748181 20.221922,10.3581228 L18.0377903,10.3581228 C17.9746264,10.5221933 17.6807607,11.2839865 17.6807607,11.2839865 L15.8957988,11.2839865 L18.4226343,5.62399144 C18.5977072,5.22341512 18.9059917,5.1118821 19.3117663,5.1118821 L20.6276036,5.1118821 L20.6276036,5.1118821 Z", id: "Shape", fill: "#171E6C" })] })) })) })) })) })));

var verve = (jsxRuntime.jsx("g", __assign({ id: "Layer_2", "data-name": "Layer 2" }, { children: jsxRuntime.jsx("g", __assign({ id: "Layer_1-2", "data-name": "Layer 1" }, { children: jsxRuntime.jsx("g", __assign({ id: "Page-1" }, { children: jsxRuntime.jsxs("g", __assign({ id: "verve" }, { children: [jsxRuntime.jsx("rect", { id: "Rectangle-path", fill: "#00425f", width: "23.82", height: "14.96", rx: "1.27" }), jsxRuntime.jsx("circle", { id: "Oval", fill: "#ee312a", cx: "4.96", cy: "6.84", r: "3.66" }), jsxRuntime.jsx("path", { id: "Shape", fill: "#fff", d: "M5,8.41C4.14,6.56,3.54,4.82,3.54,4.82H2.29a42.21,42.21,0,0,0,2.18,5h1a43.46,43.46,0,0,0,2.19-5H6.38S5.78,6.56,5,8.41Z" }), jsxRuntime.jsx("path", { fill: "#fff", d: "M22.49,8.18H20s.06.82,1.15.82a4.39,4.39,0,0,0,1.09-.16l.11.87a3.87,3.87,0,0,1-1.31.22A1.89,1.89,0,0,1,19,7.85a1.8,1.8,0,0,1,1.85-2C22.49,5.89,22.6,7.53,22.49,8.18ZM20.8,6.65c-.71,0-.77.77-.77.77h1.53S21.51,6.65,20.8,6.65Z" }), jsxRuntime.jsx("path", { fill: "#fff", d: "M14.05,6.88,14.21,6a2.92,2.92,0,0,0-2.29.33V9.83H13V7A1.25,1.25,0,0,1,14.05,6.88Z" }), jsxRuntime.jsx("path", { fill: "#fff", d: "M11.07,8.18H8.61S8.66,9,9.76,9a4.5,4.5,0,0,0,1.09-.16l.11.87a3.87,3.87,0,0,1-1.31.22A1.9,1.9,0,0,1,7.57,7.85a1.81,1.81,0,0,1,1.86-2C11.07,5.89,11.18,7.53,11.07,8.18ZM9.37,6.65c-.71,0-.76.77-.76.77h1.53S10.08,6.65,9.37,6.65Z" }), jsxRuntime.jsx("path", { fill: "#fff", d: "M16.7,8.52A17.1,17.1,0,0,1,15.88,6H14.79a20.77,20.77,0,0,0,1.47,3.85h.88A20,20,0,0,0,18.61,6H17.52A17.1,17.1,0,0,1,16.7,8.52Z" })] })) })) })) })));

var images = {
    placeholder: placeholder,
    mastercard: mastercard,
    visa: visa,
    verve: verve
};

exports.images = images;
exports.useCreditCardValidator = useCreditCardInput;
//# sourceMappingURL=index.js.map
