import "./App.css";
import usePayment from "./usePaymentInput";

function App() {
  const { getCardNumberProps, getExpiryDateProps, getCVCProps } = usePayment();

  return (
    <div className='App'>
      <h1>react-creditcard-input</h1>

      <input type='text' {...getCardNumberProps()} />

      <input type='text' {...getExpiryDateProps()} />

      <input type='text' {...getCVCProps()} />
    </div>
  );
}

export default App;
