# React CreditCard Validator

A React Custom Hook to provide validation and formatting for payment card input fields. Motivated by [React Payment Inputs](https://github.com/medipass/react-payment-inputs). This package offers a fully typed alternative, written completely in TypeScript.

## Requirements

Requires a hooks-compatible version of React(>= v16.8).

## Installation

```
  npm install react-creditcard-validator --save

  # or, if u prefer Yarn, you can run:

  yarn add react-creditcard-validator

```

## Usage

```
  import React from 'react';
  import { useCreditCardValidator, images } from 'react-creditcard-validator';

  export default function PaymentInputs() {
    const { getCardNumberProps, getExpiryDateProps, getCVCProps, getCardImageProps, meta: {erroredInputs} } = useCreditCardValidator();

    return (
      <div>
        <input {...getCardNumberProps()}  />
        <small>{erroredInputs.cardNumber && erroredInputs.cardNumber}</small>


        <input {...getExpiryDateProps()}  />
        <small>{erroredInputs.expiryDate && erroredInputs.expiryDate}</small>


        <input {...getCVCProps()}  />
        <small>{erroredInputs.cvc && erroredInputs.cvc}</small>


        <svg {...getCardImageProps({images})}/>
      </div>
    );
  }
```

> By Spreading the prop getter functions on the inputs, You get automatic formatting, focus, and validation.

> **Note**: Pass all custom event handlers (e.g onChange) inside the prop getter function e.g (getCardNumberProps({onChange: (e) => console.log(e.target.value)})), so that the default event handlers are not overwritten

### Custom Validation

`` const data = useCreditCardValidator(options); ``

#### options

> `Object({cardNumberValidator, cvcValidator, expiryDateValidator})`

##### options.cardNumberValidator

> `Function(cardNumber: string) => string | undefined`

##### options.cvcValidator

> `Function(cvc: string) => string | undefined`

##### options.expiryDateValidator

> `Function(month: string, year: string) => string | undefined`

##### Example

```
  function expDateValidate(month: string, year: string) {
    if (Number.parseInt(year) > 2035) {
      return "Expiry Date Year cannot be greater than 2035";
    }
    return;
  }

  export default function MyComponent() {
    const { ... } = useCreditCardValidator({cardNumberValidator: cardNumberValidate});
  }

```

## Limitations

Currently only offers formatting and images for MasterCard, Verve & Visa cards.

## Contributions

Please make sure to read the [Contributing Guide](./CONTRIBUTING.md) before making a pull request.
