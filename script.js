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
  expr = resolverParentesis(expr);
  expr = resolverSuma(expr);
  return expr;
}

function resolverParentesis(expr) {
  while (expr.includes("(")) {
    const inicio = expr.lastIndexOf("(");
    const fin = expr.indexOf(")", inicio);
    const subExpresion = expr.substring(inicio + 1, fin);
    console.log("Subexpresión:", subExpresion);
    expr = expr.substring(0, inicio) + evaluate(subExpresion) + expr.substring(fin + 1);
  }
  return expr;
}

function resolverSuma(expr) {
  expr = String(expr);

  while (expr.includes("+")) {
    const index = expr.indexOf("+");
    const left = expr.substring(0, index);
    const right = expr.substring(index + 1);
    expr = String(parseFloat(left) + parseFloat(right));
  }
  return expr;
}

