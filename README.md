# React CreditCard Validator

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

A React Custom Hook to provide validation and formatting for payment card input fields. Motivated by [React Payment Inputs](https://github.com/medipass/react-payment-inputs). This package offers a fully typed alternative, written completely in TypeScript.

## Requirements

Requires a hooks-compatible version of React(>= v16.8).

## Installation

```text
  npm install react-creditcard-validator --save

  # or, if u prefer Yarn, you can run:

  yarn add react-creditcard-validator

```

## Usage

```js
import React from 'react';
import { useCreditCardValidator, images } from 'react-creditcard-validator';

export default function PaymentInputs() {
  const {
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
    meta: { erroredInputs }
  } = useCreditCardValidator();

  return (
    <div>
      <input {...getCardNumberProps()} />
      <small>{erroredInputs.cardNumber && erroredInputs.cardNumber}</small>

      <input {...getExpiryDateProps()} />
      <small>{erroredInputs.expiryDate && erroredInputs.expiryDate}</small>

      <input {...getCVCProps()} />
      <small>{erroredInputs.cvc && erroredInputs.cvc}</small>

      <svg {...getCardImageProps({ images })} />
    </div>
  );
}
```

> By Spreading the prop getter functions on the inputs, You get automatic formatting, focus, and validation.
>
> **Note**: Pass all custom event handlers (e.g onChange) inside the prop getter function e.g (getCardNumberProps({onChange: (e) => console.log(e.target.value)})), so that the default event handlers are not overwritten

### Custom Validation

`const data = useCreditCardValidator(options);`

#### options

> `Object({cardNumberValidator, cvcValidator, expiryDateValidator})`

##### options.cardNumberValidator

> `Function(cardNumber: string) => string | undefined`

##### options.cvcValidator

> `Function(cvc: string) => string | undefined`

##### options.expiryDateValidator

> `Function(month: string, year: string) => string | undefined`

##### Example

```js
  function expDateValidate(month: string, year: string) {
    if (Number.parseInt(year) > 2035) {
      return "Expiry Date Year cannot be greater than 2035";
    }
    return;
  }

  export default function MyComponent() {
    const { ... } = useCreditCardValidator({expiryDateValidator: expDateValidate);
  }

```

## Limitations

Currently only offers formatting and images for MasterCard, Verve & Visa cards.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://chijiooke.netlify.app"><img src="https://avatars.githubusercontent.com/u/12538597?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Silva Chijioke Michael</b></sub></a><br /><a href="https://github.com/abayomi1196/react-creditcard-validator/commits?author=chijiooke" title="Code">💻</a></td>
    <td align="center"><a href="http://www.joshx.dev"><img src="https://avatars.githubusercontent.com/u/29876804?v=4?s=100" width="100px;" alt=""/><br /><sub><b>JoshX</b></sub></a><br /><a href="https://github.com/abayomi1196/react-creditcard-validator/commits?author=JCalmCrasher" title="Documentation">📖</a> <a href="https://github.com/abayomi1196/react-creditcard-validator/commits?author=JCalmCrasher" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
