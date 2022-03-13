import { useRef, useCallback, useState } from "react";
import { getCardTypeByValue } from "./utils/cardTypes";
import { formatCardNumber } from "./utils/formatter";

type PaymentInputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function usePaymentInput({ onChange }: PaymentInputProps) {
  const cardNumberField = useRef<HTMLInputElement>(null);
  const [cardType, setCardType] = useState({});

  /** ====== START: CARD NUMBER STUFF ====== */
  const handleChangeCardNumber = useCallback(
    (props = {}) => {
      return (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedCardNumber = e.target.value || "";
        const cardNumber = formattedCardNumber.replace(/\s/g, "");

        const cardType = getCardTypeByValue(cardNumber);
        setCardType(cardType);

        // @ts-ignore
        cardNumberField.current.value = formatCardNumber(cardNumber);

        props.onChange && props.onChange(e);
        onChange && onChange(e);
      };
    },
    [onChange]
  );

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
      onChange: handleChangeCardNumber(props),
    }),
    [handleChangeCardNumber]
  );
  /** ====== END: CARD NUMBER STUFF ====== */

  return {
    getCardNumberProps,
    meta: {
      cardType,
    },
  };
}

export default usePaymentInput;
