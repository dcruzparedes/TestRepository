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
    while (/(-?[\d.]+)\/(-?[\d.]+)/.test(expr)) {
        expr = expr.replace(/(-?[\d.]+)\/(-?[\d.]+)/, function(_, a, b) {
            if (parseFloat(b) === 0) throw new Error('División entre cero');
            return parseFloat(a) / parseFloat(b);
        });
    }
    return expr;
}