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
    display.innerText = "Error";
  }
}

function evaluate(expr) {
  // Logica de cada operacion aqui
  expr = solveAddition(expr);
  return expr;
}

function solveAddition(expr) {
  const additionRegex =/(-?\d+\.?\d*)\+(-?\d+\.?\d*)/;

  while (additionRegex.test(expr)) {
     expr = expr.replace(additionRegex, function (_, a, b) {
      return (parseFloat(a) + parseFloat(b));
    });
  }
  return expr;
}
