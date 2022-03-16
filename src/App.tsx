import "./App.css";
import useCreditCardInput from "./hooks/useCreditCardInput";

import images from "./images";

function App() {
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
    meta: { erroredInputs },
  } = useCreditCardInput();

  return (
    <div className='App'>
      <h1>react-creditcard-input</h1>

      <div>
        <input
          type='text'
          {...getCardNumberProps()}
        />
        <small data-testid='cardNumberErrorEl'>
          {erroredInputs.cardNumber && erroredInputs.cardNumber}
        </small>
      </div>

      <div>
        <input
          type='text'
          {...getExpiryDateProps()}
          data-testid='expiryDateEl'
        />
        <small data-testid='expiryErrorEl'>
          {erroredInputs.expiryDate && erroredInputs.expiryDate}
        </small>
      </div>

      <div>
        <input type='text' {...getCVCProps()} data-testid='cvcEl' />
        <small data-testid='cvcErrorEl'>
          {erroredInputs.cvc && erroredInputs.cvc}
        </small>
      </div>

      <svg {...getCardImageProps({ images })} />
    </div>
  );
}

export default App;
