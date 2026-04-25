
function appendToDisplay(input)  {
    const display = document.getElementById('display');

    if(display.innerText =='0') {
        display.innerText = input;
    } else {
        display.innerText += input;
    }

};

function clearDisplay() {
    const display = document.getElementById('display');
    display.innerText = '0';
};

function clearOne(){
    const display = document.getElementById('display');
    if(display.innerText.length > 1) {
        display.innerText = display.innerText.slice(0, -1);
    } else {
        display.innerText = '0';
    }
}



