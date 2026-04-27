function appendToDisplay(input) {
  const display = document.getElementById("display");

  if (display.innerText == "0") {
    display.innerText = input;
  } else {
    display.innerText += input;
  }

  scrollDisplayToEnd(display);
}

function clearDisplay() {
  const display = document.getElementById("display");
  display.innerText = "0";
  scrollDisplayToEnd(display);
}

function clearOne() {
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
  const display = document.getElementById("display");
  try {
    const result = evaluate(display.innerText);
    display.innerText = result;
  } catch (e) {
    display.innerText = "Error";
  }

  scrollDisplayToEnd(display);
}

function evaluate(expr) {
  // Logica de cada operacion aqui
  expr = resolverResta(expr);
  return expr;
}


function scrollDisplayToEnd(display) {
  requestAnimationFrame(() => {
    display.scrollLeft = display.scrollWidth;
  });
}