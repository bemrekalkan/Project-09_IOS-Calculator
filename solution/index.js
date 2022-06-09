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

document.querySelector("#ac").addEventListener("click", () => {
  document.querySelector(".result").innerHTML = "0";
});

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
