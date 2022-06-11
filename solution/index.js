// numbers = {
//   zero: 0,
//   one: 1,
//   two: 2,
//   three: 3,
//   four: 4,
//   five: 5,
//   six: 6,
//   seven: 7,
//   eight: 8,
//   nine: 9,
// };

//? SELECTORS:
const result = document.querySelector(".result");
const inputNumber = document.querySelector(".inputNumber");
const btnContainer = document.querySelector(".buttons-container");

let currentOperand = "";
let previousOperand = "";
let operation = "";
let equalOrPercentPresssed = false;

//? Event definition for the container carrying the buttons (.buttons-container):

btnContainer.addEventListener("click", (e) => {
  //? for numbers:
  if (e.target.classList.contains("number")) {
    addNumber(e.target.textContent);
    updateResult();
  }

  //? for operators:
  if (e.target.classList.contains("operator")) {
    selectOperator(e.target.textContent);
    updateResult();
  }

  //? for equal button:
  if (e.target.id.contains("equal")) {
    calculate();
    updateResult();
    equalOrPercentPressed = true;
  }
});

//! addNumber() Function:
const addNumber = (num) => {
  //? Return if 0 was entered before and 0 is entered again:
  if (currentOperand === "0" && num === "0") return;

  //? If 0 is entered first and then another number other than the . is entered, just pass the new number entered to the variable:
  if (currentOperand === "0" && num !== ".") {
    currentOperand = num;
    return;
  }

  //? Return if current number is . and previous entered number contains .:
  if (num === "." && currentOperand.includes(".")) return;

  //? to prevent overflow:
  if (currentOperand.length > 10) return;

  //?The flag method is used to prevent overwriting when a new number is entered while there is a number on the screen:
  if (equalOrPercentPresssed) {
    currOperand = num;
    equalOrPercentPresssed = false;
    return;
  }

  //? Concatenate entered numbers:
  currentOperand += num;
};

//! selectOperator() Function:
const selectOperator = (op) => {
  //? after the first number entry:
  if (previousOperand) {
    calculate();
  }

  //? Variable swapping:
  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
};

//! updateResult() Function:
const updateResult = () => {
  //? used toExponential() to fit the result to the screen:
  if (currentOperand.toString().length > 11) {
    currentOperand = Number(currentOperand).toExponential(3);
  }
  inputNumber.textContent = currentOperand;
  result.textContent = `${previousOperand} ${operation}`;
};

//! calculate() Function:
const calculate = () => {
  let calculation = 0;

  const prev = Number(previousOperand);
  const current = Number(currentOperand);

  switch (operation) {
    case "+":
      calculation = prev + current;
      break;
    case "-":
      calculation = prev - current;
      break;
    case "x":
      calculation = prev * current;
      break;
    case "÷":
      calculation = prev / current;
      break;
    default:
      //! We'll say return so that if no operation is pressed but `=` is pressed, the function will return.
      return;
  }

  currentOperand = calculation;

  //? We need to delete the previousOperand and operation so that they do not appear on the screen when the `=` button is clicked.
  previousOperand = "";
  operation = "";
};

document.querySelector("#sign").addEventListener("click", () => {
  if (firstChar() === "-") {
    result = document.querySelector(".result");
    sbstr = result.substring(1, result.length);
    document.querySelector(".result").innerHTML = sbstr;
  } else if (!emptyResult()) {
    prepend("-");
  }
});

document.querySelector("#percentage").addEventListener("click", () => {
  if (emptyResult()) {
    percentage = parseFloat(document.querySelector(".result")) / 100;
    document.querySelector(".result").innerHTML = percentage;
  }
});

document.querySelector(".operator").addEventListener("click", (e) => {
  id = e.target.id;
  if (id === "equal") {
    calculate();
    document.querySelector(".result").innerHTML = finalResult;
    operator = "";
    activeOperator = false;
  } else {
    operator = id;
    activeOperator = true;
  }
});

document.querySelector(".number").addEventListener("click", (e) => {
  id = e.target.id;
  num = numbers[id];

  if (activeOperator) {
    finalResult = parseFloat(document.querySelector(".result"));
    document.querySelector(".result").innerHTML = "";
    activeOperator = false;
  }

  if (firstChar() === "0") {
    if (hasChar(".")) {
      append(num);
    } else {
      append(num);
    }
  }
});

document.querySelector("#point").addEventListener("click", () => {
  if (emptyResult()) {
    append("0.");
  } else if (!hasChar()) {
    append(".");
  }
});

const calculate = () => {
  actResult = parseFloat(document.querySelector(".result"));
  // ???????????????????????????????????????????????????????????????????????????
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

const emptyResult = () => {
  return document.querySelector(".result") === "";
};

const hasChar = (char) => {
  result = document.querySelector(".result");
  return result.indexOf(char) !== -1;
};

const firstChar = () => {
  return document.querySelector(".result").charAt(0);
};

const append = (txt) => {
  result = document.querySelector(".result");
  result += txt;
};

const prepend = (sign) => {
  result = document.querySelector(".result");
  result += sign;
};
