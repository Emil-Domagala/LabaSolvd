// Helper functions

const compareString = (a, b) => {
  a = a.replace(/^0+/, '') || '0';
  b = b.replace(/^0+/, '') || '0';

  // Compare length
  if (a.length !== b.length) return a.length - b.length;

  // if same length compare digit by digit
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return +a[i] - +b[i];
  }

  // All digits equal
  return 0;
};

const subtract = (num1, num2) => {
  const res = new Array(num1.length);
  let i = num1.length - 1;
  let j = num2.length - 1;
  let borrowed = 0;

  while (i >= 0 || j >= 0) {
    digA = +num1[i];
    digB = j >= 0 ? +num2[j] : 0;
    let temp = digA - borrowed;

    if (temp < digB) {
      temp += 10;
      borrowed = 1;
    } else {
      borrowed = 0;
    }

    res[i] = temp - digB;
    i--;
    j--;
  }
  return res.join('').replace(/^0+/, '');
};

// Exercise

String.prototype.add = function (num2) {
  const num1 = this;
  let overfloat = 0;

  let i = num1.length - 1;
  let j = num2.length - 1;

  let maxLength = Math.max(i, j) + 2;
  let k = maxLength - 1;
  // Allocating enough memory for result
  let res = new Array(maxLength);

  while (i >= 0 || j >= 0 || overfloat > 0) {
    // transforming strings to int
    const digA = i >= 0 ? +num1[i] : 0;
    const digB = j >= 0 ? +num2[j] : 0;
    // calculate current sum
    const sum = digA + digB + overfloat;

    // getting carry
    overfloat = Math.floor(sum / 10);
    // getting current digit ( modulo used bc if sum is 19 i wanna only 9. 1 will go to overfloat)
    res[k] = sum % 10;
    i--;
    j--;
    k--;
  }
  // getting rid of leading zero
  return res.join('').replace(/^0+/, '');
};

// console.log('add');
// console.log('100'.add('1'));
// console.log('99'.add('1'));
// console.log('100'.add('0'));
// console.log('------');

String.prototype.minus = function (num2) {
  const num1 = this;

  const isValid = compareString(num1, num2);
  if (isValid === 0) return '0';
  if (isValid < 0) throw new Error('We are in 1st grade. cannot subrtact larger number from smaller one');

  // Allocating enough memory for result
  let res = new Array(num1.length);

  let i = num1.length - 1;
  let j = num2.length - 1;
  let borrowed = 0;

  while (i >= 0 || j >= 0) {
    const digA = +num1[i];
    const digB = j >= 0 ? +num2[j] : 0;

    // calculate current digit
    let temp = digA - borrowed;

    // check if i can subtract from curr dig or i need to borrow
    if (temp < digB) {
      temp += 10;
      borrowed = 1;
    } else {
      borrowed = 0;
    }

    res[i] = temp - digB;
    i--;
    j--;
  }
  // getting rid of leading zero
  return res.join('').replace(/^0+/, '');
};

// console.log('minus');
// console.log('100'.minus('99'));
// console.log('100'.minus('990'));
// console.log('100'.minus('1'));
// console.log('100'.minus('0'));
// console.log('1000000000000000000000000000000000000'.minus('2347065'));
// console.log('------');

// I read about Karatsuba multiplication but decided not to use it bc there is no chance i would be able to write it on interview
String.prototype.multiply = function (num2) {
  const num1 = this;
  // quick return
  if (num1 === '0' || num2 === '0') return '0';

  // Allocating enough memory for result
  const res = new Array(num1.length + num2.length).fill(0);

  for (let i = num2.length - 1; i >= 0; i--) {
    const digB = +num2[i];
    for (let j = num1.length - 1; j >= 0; j--) {
      // current position
      const pos = i + j + 1;

      const digA = +num1[j];

      // calculate current sum
      let sum = digA * digB + res[pos];

      // getting carry
      let nexDig = Math.floor(sum / 10);
      let currDig = sum % 10;

      res[pos] = currDig;
      res[i + j] += nexDig;
    }
  }

  // getting rid of leading zero
  return res.join('').replace(/^0+/, '');
};

// console.log('multiply');
// console.log('99'.multiply('99'));
// console.log('123'.multiply('20'));
// console.log('100'.multiply('0'));
// console.log('100'.multiply('1'));
// console.log('------');

String.prototype.divide = function (num2) {
  const num1 = this;

  if (num1 === '0') return '0';
  if (num2 == '0') throw new Error('Cannot divide by zero');

  let currNum = '';
  let res = '';

  for (let i = 0; i < num1.length; i++) {
    currNum += num1[i];

    let count = 0;

    while (compareString(currNum, num2) >= 0) {
      // Aint using currentNum.minus(num2) bc i added safe checking there which is redundand here bc i already checked this.
      currNum = subtract(currNum, num2);
      count++;
    }
    res += count;
  }
  return res.replace(/^0+/, '');
};

// console.log('10'.divide('2'));
// console.log('10'.divide('5'));
// console.log('10'.divide('10'));
// console.log('190'.divide('10'));
