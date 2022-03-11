import {
  MASTERCARD_PREFIX_LIST,
  VERVE_PREFIX_LIST,
  VISA_PREFIX_LIST,
} from "../constants/creditCards";

let pseudoRandom: any = Math.random;

function strrev(str: string) {
  if (!str) return "";
  let revStr = "";
  for (let i = str.length - 1; i >= 0; i--) revStr += str.charAt(i);
  return revStr;
}

function completedNumber(prefix: string, length: number) {
  let ccnumber = prefix;

  // generate digits

  while (ccnumber.length < length - 1) {
    ccnumber += Math.floor(pseudoRandom() * 10);
  }

  // reverse number and convert to int

  let reversedCCnumberString = strrev(ccnumber);

  let reversedCCnumber = [];
  for (let i = 0; i < reversedCCnumberString.length; i++) {
    reversedCCnumber[i] = parseInt(reversedCCnumberString.charAt(i));
  }

  // calculate sum

  let sum = 0;
  let pos = 0;

  while (pos < length - 1) {
    let odd = reversedCCnumber[pos] * 2;
    if (odd > 9) {
      odd -= 9;
    }

    sum += odd;

    if (pos !== length - 2) {
      sum += reversedCCnumber[pos + 1];
    }
    pos += 2;
  }

  // calculate check digit

  let checkdigit = ((Math.floor(sum / 10) + 1) * 10 - sum) % 10;
  ccnumber += checkdigit;

  return ccnumber;
}

function creditCardNumber(prefixList: [], length: number, howMany: number) {
  let result = [];
  for (let i = 0; i < howMany; i++) {
    let randomArrayIndex = Math.floor(pseudoRandom() * prefixList.length);
    let ccNumber = prefixList[randomArrayIndex];
    result.push(completedNumber(ccNumber, length));
  }

  return result;
}

export const Schemes: any = {
  Verve: {
    prefixList: VERVE_PREFIX_LIST,
    digitCount: 18,
  },
  VISA: {
    prefixList: VISA_PREFIX_LIST,
    digitCount: 16,
  },
  MasterCard: {
    prefixList: MASTERCARD_PREFIX_LIST,
    digitCount: 16,
  },
};

export const GenCC = function (
  CardScheme: string,
  howMany?: number,
  randomGen?: number
) {
  pseudoRandom = randomGen || pseudoRandom;
  var amount = howMany || 1;
  // Try to get configs to the selected Scheme
  if (typeof Schemes[CardScheme] != "undefined") {
    return creditCardNumber(
      Schemes[CardScheme].prefixList,
      Schemes[CardScheme].digitCount,
      amount
    );
  } else {
    // Defaults to MasterCard
    return creditCardNumber(
      Schemes["MasterCard"].prefixList,
      Schemes["MasterCard"].digitCount,
      amount
    );
  }
};
