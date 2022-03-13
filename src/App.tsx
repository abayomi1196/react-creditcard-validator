import "./App.css";
import usePayment from "./usePaymentInput";

import images from "./images";

function App() {
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePayment();

  return (
    <div className='App'>
      <h1>react-creditcard-input</h1>

      <input type='text' {...getCardNumberProps()} />

      <input type='text' {...getExpiryDateProps()} />

      <input type='text' {...getCVCProps()} />

      <svg {...getCardImageProps({ images })} />
    </div>
  );
}

export default App;
