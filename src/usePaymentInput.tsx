import { useRef, useCallback, useState } from "react";
import { getCardTypeByValue, SINGLE_CARD_TYPE } from "./utils/cardTypes";
import { formatCardNumber, formatExpiry } from "./utils/formatter";
import { hasCardNumberReachedMaxLength, getCVCError } from "./utils/validators";

function usePaymentInput() {
  /*===State, Refs & Utility Fns===*/
  const cardNumberField = useRef<HTMLInputElement>();
  const expiryDateField = useRef<HTMLInputElement>();
  const cvcField = useRef<HTMLInputElement>();

  const [cardType, setCardType] = useState<SINGLE_CARD_TYPE>();
  const [error, setError] = useState();
  const [focused, setFocused] = useState<string | undefined>();

  const [touchedInputs, setTouchedInputs] = useState<{
    [key: string]: boolean;
  }>({
    cardNumber: false,
    expiryDate: false,
    cvc: false,
  });

  const [erroredInputs, setErroredInputs] = useState<{
    [key: string]: string | undefined;
  }>({
    cardNumber: undefined,
    expiryDate: undefined,
    cvc: undefined,
  });

  const setInputTouched = useCallback((input: any, value) => {
    setTouchedInputs((touchedInputs) => {
      if (touchedInputs[input] === value) return touchedInputs;

      const newTouchedInputs = { ...touchedInputs, [input]: value };
      return newTouchedInputs;
    });
  }, []);

  const setInputError = useCallback((input, error) => {
    setErroredInputs((erroredInputs) => {
      if (erroredInputs[input] === error) return erroredInputs;

      let newError = error;

      const newErroredInputs = { ...erroredInputs, [input]: error };
      if (error) {
        setError(error);
      } else {
        newError = Object.values(newErroredInputs).find(Boolean);
        setError(newError);
      }

      return newErroredInputs;
    });
  }, []);
  /*===End of State, Refs & Utility Fns===*/

  /*===Card Number ===*/
  const handleBlurCardNumber = useCallback(
    (props = {}) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        props.onBlur && props.onBlur(e);
        setFocused(undefined);
        setInputTouched("cardNumber", true);
      };
    },
    [setInputTouched]
  );

  const handleChangeCardNumber = useCallback(
    (props = {}) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedCardNumber = e.target.value || "";
        const cardNumber = formattedCardNumber.replace(/\s/g, "");

        const cardType = getCardTypeByValue(cardNumber);

        setCardType(cardType);
        setInputTouched("cardNumber", false);

        if (cardNumberField.current) {
          cardNumberField.current.value = formatCardNumber(cardNumber);
        }

        props.onChange && props.onChange(e);
      };
    },
    [setInputTouched]
  );

  const handleFocusCardNumber = useCallback((props = {}) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      props.onFocus && props.onFocus(e);
      setFocused("cardNumber");
    };
  }, []);

  const handleKeyPressCardNumber = useCallback((props = {}) => {
    return (e: any) => {
      const formattedCardNumber = e.target.value || "";
      const cardNumber = formattedCardNumber.replace(/\s/g, "");

      props.onKeyPress && props.onKeyPress(e);

      if (e.key !== "Enter") {
        if (hasCardNumberReachedMaxLength(cardNumber)) {
          e.preventDefault();
          expiryDateField.current && expiryDateField.current.focus();
        }
      }
    };
  }, []);

  const getCardNumberProps = useCallback(
    ({ refKey, ...props } = {}) => ({
      "aria-label": "Card number",
      autoComplete: "cc-number",
      id: "cardNumber",
      name: "cardNumber",
      placeholder: "0000 0000 0000 0000",
      type: "tel",
      [refKey || "ref"]: cardNumberField,
      ...props,
      maxLength: cardType ? null : 19,
      onChange: handleChangeCardNumber(props),
      onBlur: handleBlurCardNumber(props),
      onFocus: handleFocusCardNumber(props),
      onKeyPress: handleKeyPressCardNumber(props),
    }),
    [
      cardType,
      handleChangeCardNumber,
      handleBlurCardNumber,
      handleFocusCardNumber,
      handleKeyPressCardNumber,
    ]
  );
  /*===End of Card Number ===*/

  /*===Card Image ===*/
  const getCardImageProps = useCallback(
    (props = {}) => {
      const images = props.images || {};
      return {
        "aria-label": cardType ? cardType.displayName : "Placeholder card",
        children:
          images[cardType ? cardType.type : "placeholder"] ||
          images.placeholder,
        width: "1.5em",
        height: "1em",
        viewBox: "0 0 24 16",
        ...props,
      };
    },
    [cardType]
  );
  /*===End of Card Image ===*/

  /*===Expiry Date ===*/
  const handleBlurExpiryDate = useCallback(
    (props = {}) => {
      return (e: any) => {
        props.onBlur && props.onBlur(e);

        setFocused(undefined);
        setInputTouched("expiryDate", true);
      };
    },
    [setInputTouched]
  );

  const handleChangeExpiryDate = useCallback((props = {}) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      //@ts-ignore
      expiryDateField.current.value = formatExpiry(e);

      props.onChange && props.onChange(e);
    };
  }, []);

  const handleKeyDownExpiryDate = useCallback((props = {}) => {
    return (e: any) => {
      props.onKeyDown && props.onKeyDown(e);

      if (e.key !== "Enter") {
        if (e.key === "Backspace" && !e.target.value) {
          cardNumberField.current && cardNumberField.current.focus();
        }

        if (e.target.value.length === 7) {
          cvcField.current && cvcField.current.focus();
        }
      }
    };
  }, []);

  const getExpiryDateProps = useCallback(
    ({ refKey, ...props } = {}) => ({
      "aria-label": "Expiry date in format MM YY",
      autoComplete: "cc-exp",
      id: "expiryDate",
      name: "expiryDate",
      placeholder: "MM/YY",
      type: "tel",
      [refKey || "ref"]: expiryDateField,
      ...props,
      onChange: handleChangeExpiryDate(props),
      onBlur: handleBlurExpiryDate(props),
      onKeyDown: handleKeyDownExpiryDate(props),
    }),
    [handleChangeExpiryDate, handleBlurExpiryDate, handleKeyDownExpiryDate]
  );
  /*===End ofExpiry Date ===*/

  /*===CVC ===*/
  const handleBlurCVC = useCallback(
    (props = {}) => {
      return (e: any) => {
        props.onBlur && props.onBlur(e);

        setFocused(undefined);
        setInputTouched("cvc", true);
      };
    },
    [setInputTouched]
  );

  const handleChangeCVC = useCallback(
    (props = {}) => {
      return (e: any) => {
        const cvc = e.target.value;
        console.log(cvc);

        setInputTouched("cvc", false);

        props.onChange && props.onChange(e);

        const cvcError = getCVCError(cvc);

        setInputError("cvc", cvcError);
        props.onError && props.onError(cvcError);
      };
    },
    [setInputError, setInputTouched]
  );

  const handleFocusCVC = useCallback((props = {}) => {
    return (e: any) => {
      props.onFocus && props.onFocus(e);
      setFocused("cvc");
    };
  }, []);

  const handleKeyDownCVC = useCallback((props = {}) => {
    return (e: any) => {
      props.onKeyDown && props.onKeyDown(e);

      if (e.key === "Backspace" && !e.target.value) {
        expiryDateField.current && expiryDateField.current.focus();
      }
    };
  }, []);

  const handleKeyPressCVC = useCallback((props = {}) => {
    return (e: any) => {
      const formattedCVC = e.target.value || "";
      console.log(formattedCVC, e.target.value);
      const cvc = formattedCVC.replace(" / ", "");

      props.onKeyPress && props.onKeyPress(e);

      if (e.key !== "Enter") {
        if (cvc.length >= 3) {
          e.preventDefault();
        }
      }
    };
  }, []);

  const getCVCProps = useCallback(
    ({ refKey, ...props } = {}) => ({
      "aria-label": "CVC",
      autoComplete: "cc-csc",
      id: "cvc",
      name: "cvc",
      placeholder: "CVC",
      type: "tel",
      [refKey || "ref"]: cvcField,
      ...props,
      onBlur: handleBlurCVC(props),
      onChange: handleChangeCVC(props),
      onFocus: handleFocusCVC(props),
      onKeyDown: handleKeyDownCVC(props),
      onKeyPress: handleKeyPressCVC(props),
    }),
    [
      handleBlurCVC,
      handleChangeCVC,
      handleFocusCVC,
      handleKeyDownCVC,
      handleKeyPressCVC,
    ]
  );
  /*===End of CVC ===*/

  return {
    getCardNumberProps,
    getCardImageProps,
    getExpiryDateProps,
    getCVCProps,
    meta: {
      cardType,
      erroredInputs,
      error,
      focused,
      touchedInputs,
    },
  };
}

export default usePaymentInput;
