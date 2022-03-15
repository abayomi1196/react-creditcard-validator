import "./App.css";
import usePayment from "./usePaymentInput";

import images from "./images";

function App() {
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
    meta: { erroredInputs },
  } = usePayment();

  return (
    <div className='App'>
      <h1>react-creditcard-input</h1>

      <div style={{ marginBottom: "1em" }}>
        <input
          type='text'
          {...getCardNumberProps()}
          data-testid='cardNumberEl'
        />
        <small
          style={{ color: "red", display: "block" }}
          data-testid='cardNumberErrorEl'
        >
          {erroredInputs.cardNumber && erroredInputs.cardNumber}
        </small>
      </div>

      <div style={{ marginBottom: "1em" }}>
        <input
          type='text'
          {...getExpiryDateProps()}
          data-testid='expiryDateEl'
        />
        <small
          style={{ color: "red", display: "block" }}
          data-testid='expiryErrorEl'
        >
          {erroredInputs.expiryDate && erroredInputs.expiryDate}
        </small>
      </div>

      <div>
        <input type='text' {...getCVCProps()} data-testid='cvcEl' />
        <small
          style={{ color: "red", display: "block" }}
          data-testid='cvcErrorEl'
        >
          {erroredInputs.cvc && erroredInputs.cvc}
        </small>
      </div>

      <svg {...getCardImageProps({ images })} />
    </div>
  );
}

export default App;
