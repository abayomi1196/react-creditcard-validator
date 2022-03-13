import "./App.css";
import usePayment from "./usePaymentInput";

function App() {
  function handleChange() {}

  const {
    getCardNumberProps,
    meta: { cardType },
  } = usePayment({ onChange: handleChange });

  console.log(cardType);

  return (
    <div className='App'>
      <h1>react-creditcard-input</h1>

      <input type='text' {...getCardNumberProps()} />
    </div>
  );
}

export default App;
