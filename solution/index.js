numbers = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

let finalResult = 0;
let operator = "";
let activeOperator = false;

const calculate = () => {
  actResult = parseFloat($(".result").text());

  switch (operator) {
    case "plus":
      finalResult += actResult;
      break;
    case "substraction":
      finalResult -= actResult;
      break;
    case "multiplication":
      finalResult *= actResult;
      break;
    case "division":
      finalResult /= actResult;
      break;
    default:
      break;
  }
};
