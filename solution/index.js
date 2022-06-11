//****************** SELECTORS ****************************/
const result = document.querySelector(".result");
const inputNumber = document.querySelector(".inputNumber");
const btnContainer = document.querySelector(".buttons-container");
console.log(btnContainer);

let currentOperand = "";
let previousOperand = "";
let operation = "";
let equalOrPercentPresssed = false;

//? Event definition for the container carrying the buttons:

btnContainer.addEventListener("click", (e) => {
  //! for numbers:
  if (e.target.classList.contains("number")) {
    addNumber(e.target.textContent);
    updateResult();
  }

  //! for operators (+, -, *, /):
  if (e.target.classList.contains("operator")) {
    console.log(e.target.classList.contains("operator"));
    selectOperator(e.target.textContent);
    updateResult();
  }

  //! for equal (=) button:
  if (e.target.classList.contains("equal")) {
    calculate();
    updateResult();
    equalOrPercentPresssed = true;
  }

  //! for AC button:
  if (e.target.classList.contains("ac")) {
    previousOperand = "";
    currentOperand = "";
    operation = "";
    updateResult();
  }

  //! for PM (+/-) button:
  if (e.target.classList.contains("sign")) {
    if (!currentOperand) return;
    //? To get the negative of the number, we can multiply by -1:
    currentOperand *= -1;
    updateResult();
  }

  //! for percent (%) button:
  if (e.target.classList.contains("percentage")) {
    if (!currentOperand) return;
    currentOperand = currentOperand / 100;
    updateResult();
    equalOrPercentPressed = true;
  }
});

//************************ FUNCTIONS ***********************/
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
