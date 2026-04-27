const clickSound = new Audio("click.mp3");

function appendToDisplay(input) {
  clickSound.currentTime = 0;
  clickSound.play();
  const display = document.getElementById("display");

  if (display.innerText == "0") {
    display.innerText = input === "." ? "0." : input;
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
    const validation = validateExpression(display.innerText);
    if (!validation.valid) {
      throw new Error(validation.message);
    }

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
  expr = solveAddition(expr);
  expr = resolverResta(expr);
  return expr;
}

function validateExpression(expr) {
  const syntaxErrorMessage = "syntax error";
  const compactExpr = expr.replace(/\s+/g, "");

  if (!compactExpr) {
    return { valid: false, message: syntaxErrorMessage };
  }

  if (!/^[0-9+\-*/^().]+$/.test(compactExpr)) {
    return {
      valid: false,
      message: syntaxErrorMessage,
    };
  }

  let balance = 0;
  let previousType = "start";
  let currentNumberHasDot = false;

  for (let index = 0; index < compactExpr.length; index++) {
    const character = compactExpr[index];

    if (/\d|\./.test(character)) {
      if (previousType === ")") {
        return {
          valid: false,
          message: syntaxErrorMessage,
        };
      }

      if (previousType !== "number") {
        currentNumberHasDot = false;
      }

      if (character === ".") {
        if (currentNumberHasDot) {
          return { valid: false, message: syntaxErrorMessage };
        }

        currentNumberHasDot = true;
      }

      previousType = "number";
      continue;
    }

    if (character === "(") {
      if (previousType === "number" || previousType === ")") {
        return { valid: false, message: syntaxErrorMessage };
      }

      balance++;
      previousType = "(";
      currentNumberHasDot = false;
      continue;
    }

    if (character === ")") {
      if (balance === 0) {
        return {
          valid: false,
          message: syntaxErrorMessage,
        };
      }

      if (
        previousType === "start" ||
        previousType === "operator" ||
        previousType === "("
      ) {
        return {
          valid: false,
          message: syntaxErrorMessage,
        };
      }

      balance--;
      previousType = ")";
      currentNumberHasDot = false;
      continue;
    }

    if (isOperator(character)) {
      if (
        previousType === "start" ||
        previousType === "operator" ||
        previousType === "("
      ) {
        if (character !== "-") {
          return {
            valid: false,
            message: syntaxErrorMessage,
          };
        }

        previousType = "operator";
        currentNumberHasDot = false;
        continue;
      }

      if (previousType === ")") {
        previousType = "operator";
        currentNumberHasDot = false;
        continue;
      }

      previousType = "operator";
      currentNumberHasDot = false;
    }
  }

  if (balance !== 0) {
    return { valid: false, message: syntaxErrorMessage };
  }

  if (previousType === "operator") {
    return { valid: false, message: syntaxErrorMessage };
  }

  return { valid: true, message: "" };
}

function isOperator(character) {
  return ["+", "-", "*", "/", "^"].includes(character);
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
    expr = expr.replace(/(-?[\d.]+)\/(-?[\d.]+)/, function (_, a, b) {
      if (parseFloat(b) === 0) throw new Error("Cannot divide by zero");
      return parseFloat(a) / parseFloat(b);
    });
  }
  return expr;
}

function solveAddition(expr) {
  const additionRegex = /(-?\d+\.?\d*)\+(-?\d+\.?\d*)/;

  while (additionRegex.test(expr)) {
    expr = expr.replace(additionRegex, function (_, a, b) {
      return parseFloat(a) + parseFloat(b);
    });
  }
  return expr;
}

function resolverResta(expr) {
  while (/(-?[\d.]+)-(-?[\d.]+)/.test(expr)) {
    expr = expr.replace(/(-?[\d.]+)-(-?[\d.]+)/, function (_, a, b) {
      return parseFloat(a) - parseFloat(b);
    });
  }
  return expr;
}

function scrollDisplayToEnd(display) {
  requestAnimationFrame(() => {
    display.scrollLeft = display.scrollWidth;
  });
}
