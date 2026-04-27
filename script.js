const clickSound = new Audio("click.mp3");

function appendToDisplay(input) {
  clickSound.currentTime = 0;
  clickSound.play();
  const display = document.getElementById("display");

  if (display.innerText == "0") {
    display.innerText = input;
  } else {
    display.innerText += input;
  }

  scrollDisplayToEnd(display);
}

function clearDisplay() {
  clickSound.currentTime = 0;
  clickSound.play();
  const display = document.getElementById("display");
  display.innerText = "0";
  scrollDisplayToEnd(display);
}

function clearOne() {
  clickSound.currentTime = 0;
  clickSound.play();
  const display = document.getElementById("display");
  if (display.innerText.length > 1) {
    display.innerText = display.innerText.slice(0, -1);
  } else {
    display.innerText = "0";
  }

  scrollDisplayToEnd(display);
}

// Logica

function calculate() {
  clickSound.currentTime = 0;
  clickSound.play();
  const display = document.getElementById("display");
  try {
    const result = evaluate(display.innerText);
    display.innerText = result;
  } catch (e) {
    display.innerText = e.message || "Error";
  }

  scrollDisplayToEnd(display);
}

function evaluate(expr) {
  // Logica de cada operacion aqui
   expr = resolverParentesis(expr);
  expr = resolverExponente(expr);
  expr = solveMultiplication(expr);
  expr = resolverDivision(expr);
  return expr;
}


function resolverParentesis(expr) {
  while (expr.includes("(")) {
    const inicio = expr.lastIndexOf("(");
    const fin = expr.indexOf(")", inicio);
    const subExpresion = expr.substring(inicio + 1, fin);
    console.log("Subexpresión:", subExpresion);
    expr =
      expr.substring(0, inicio) +
      evaluate(subExpresion) +
      expr.substring(fin + 1);
  }
  return expr;
}

function resolverExponente(expr) {
  while (/(-?[\d.]+)\^(-?[\d.]+)/.test(expr)) {
    expr = expr.replace(/(-?[\d.]+)\^(-?[\d.]+)/, function (_, base, exp) {
      return Math.pow(parseFloat(base), parseFloat(exp));
    });
  }
  return expr;
}

function solveMultiplication(expr) {
  const multiplicationRegex = /(-?\d+\.?\d*)\*(-?\d+\.?\d*)/;

  while (multiplicationRegex.test(expr)) {
    expr = expr.replace(multiplicationRegex, function (_, a, b) {
      return parseFloat(a) * parseFloat(b);
    });
  }
  return expr;
}

function resolverDivision(expr) {
    while (/(-?[\d.]+)\/(-?[\d.]+)/.test(expr)) {
        expr = expr.replace(/(-?[\d.]+)\/(-?[\d.]+)/, function(_, a, b) {
            if (parseFloat(b) === 0) throw new Error('División entre cero');
            return parseFloat(a) / parseFloat(b);
        });
    }
    return expr;
}
}

function scrollDisplayToEnd(display) {
  requestAnimationFrame(() => {
    display.scrollLeft = display.scrollWidth;
  });
}
