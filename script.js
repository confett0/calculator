const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const resultKey = document.querySelector('.result');
let display = document.querySelector('.para');
const clearButton = document.getElementById('clear');
const float = document.getElementById('float');
const del = document.getElementById('del');
let currentNumber;
let previousNumber;
let currentOperator;
let operatorClicked = false;
let equalClicked = false;
let floatClicked = false;
display.textContent = '0';

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b === 0 ? display.textContent = "Error" : a / b;

const operate = (num1, num2, operator) => {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

const resetDisplay = () => display.textContent = "";

const clear = () => {
    display.textContent = "0";
    currentNumber = "";
    previousNumber = "";
    operatorClicked = false;
    equalClicked = false;
    floatClicked = false;
}

const backspace = () => display.textContent = display.textContent.slice(0, -1);

const getResult = () => {
    currentNumber = display.textContent;
    currentNumber = parseFloat(currentNumber);
    previousNumber = parseFloat(previousNumber);
    if (currentOperator && previousNumber) {
        display.textContent = (operate(previousNumber, currentNumber, currentOperator)).toFixed(10) * 1;
    }
    previousNumber = "";
}

float.addEventListener('click',(e) => {
    if (floatClicked) {
        return;
    }
    display.textContent += e.target.value;
    floatClicked = true;
});

numbers.forEach(number => number.addEventListener('click', function (e) {
    let currentDigit = e.target.id;
    if (operatorClicked) {
        previousNumber = currentNumber;
        resetDisplay();
        operatorClicked = false;
    }
    if (display.textContent == "0") {
        resetDisplay();
    }
    display.textContent += currentDigit;
    equalClicked = false;
}))

operators.forEach(operator => operator.addEventListener('click', function (e) {
    if (operatorClicked) {
        return;
    }
    if (previousNumber) {
        getResult();
    }
    currentOperator = e.target.id;
    currentNumber = display.textContent;
    operatorClicked = true;
    equalClicked = false;
    floatClicked = false;
}))

resultKey.addEventListener('click', () => {
    if (equalClicked) {
        return;
    }
    getResult();
    equalClicked = true;
});

del.addEventListener('click', backspace);
clearButton.addEventListener('click', clear);