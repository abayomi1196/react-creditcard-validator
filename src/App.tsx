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
        <input type='text' {...getCardNumberProps()} />
        <small style={{ color: "red", display: "block" }}>
          {erroredInputs.cardNumber && erroredInputs.cardNumber}
        </small>
      </div>

      <div style={{ marginBottom: "1em" }}>
        <input type='text' {...getExpiryDateProps()} />
        <small style={{ color: "red", display: "block" }}>
          {erroredInputs.expiryDate && erroredInputs.expiryDate}
        </small>
      </div>

      <div>
        <input type='text' {...getCVCProps()} />
        <small style={{ color: "red", display: "block" }}>
          {erroredInputs.cvc && erroredInputs.cvc}
        </small>
      </div>

      <svg {...getCardImageProps({ images })} />
    </div>
  );
}

export default App;
