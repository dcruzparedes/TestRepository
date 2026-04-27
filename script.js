function appendToDisplay(input) {
  const display = document.getElementById("display");

  if (display.innerText == "0") {
    display.innerText = input;
  } else {
    display.innerText += input;
  }
}

function clearDisplay() {
  const display = document.getElementById("display");
  display.innerText = "0";
}

function clearOne() {
  const display = document.getElementById("display");
  if (display.innerText.length > 1) {
    display.innerText = display.innerText.slice(0, -1);
  } else {
    display.innerText = "0";
  }
}

// Logica

function calculate() {
  const display = document.getElementById("display");
  try {
    const result = evaluate(display.innerText);
    display.innerText = result;
  } catch (e) {
    display.innerText = e.message || "Error";
  }
}

function evaluate(expr) {
  // Logica de cada operacion aqui
  expr = resolverDivision(expr);
  return expr;
}

function resolverDivision(expr) {
  while (expr.includes("/")) {
    const divisionIndex = expr.indexOf("/");
    const left = expr.slice(0, divisionIndex);
    const right = expr.slice(divisionIndex + 1);
    const leftNum = parseFloat(left);
    const rightNum = parseFloat(right);
    if (rightNum === 0) {
      throw new Error("Division by zero");
    }
    const result = leftNum / rightNum;
    expr = result.toString();
  }
  return expr;
}
