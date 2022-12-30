const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const resultKey = document.querySelector('.result');
const clearButton = document.getElementById('clear');
const float = document.getElementById('float');
const del = document.getElementById('del');
const negativeButton = document.getElementById('negative');
let display = document.querySelector('.main-display');
let operationDisplay = document.querySelector('.operation-display');
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
};

const resetDisplay = () => display.textContent = "";

const clear = () => {
    display.textContent = "0";
    operationDisplay.textContent = "";
    currentNumber = "";
    previousNumber = "";
    operatorClicked = false;
    equalClicked = false;
    floatClicked = false;
};

const backspace = () => display.textContent = display.textContent.slice(0, -1);

const negativeNumber = () => {
    if (display.textContent.charAt(0) == '-') {
        display.textContent = display.textContent.slice(1);
    } else {
        display.textContent = '-' + display.textContent;
    }
};

const getResult = () => {
    currentNumber = display.textContent;
    currentNumber = parseFloat(currentNumber);
    previousNumber = parseFloat(previousNumber);
    if (currentOperator && previousNumber) {
        display.textContent = (operate(previousNumber, currentNumber, currentOperator)).toFixed(10) * 1;
        operationDisplay.textContent += ' ' + currentNumber + ' =';
    }
    previousNumber = "";
};

const setOperand = (currentDigit) => {
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
};

const setOperator = (operator) => {
    if (operatorClicked) {
        return;
    }
    if (equalClicked) {
        operationDisplay.textContent = '';
    }
    if (previousNumber) {
        getResult();
        operationDisplay.textContent = '';
    }
    currentOperator = operator;
    currentNumber = display.textContent;
    operationDisplay.textContent += currentNumber + ' ' + currentOperator;
    operatorClicked = true;
    equalClicked = false;
    floatClicked = false;
};

const getFloatingNumbers = (value) => {
    if (floatClicked) {
        return;
    }
    display.textContent += value;
    floatClicked = true;
};

const pressResultButton = () => { // disables result key after getting the risult
    if (equalClicked) {
        return;
    }
    getResult();
    equalClicked = true;
};

// Event listeners

numbers.forEach(number => number.addEventListener('click', (e) => setOperand(e.target.value)));
operators.forEach(operator => operator.addEventListener('click', (e) => setOperator(e.target.value)));
float.addEventListener('click', (e) => getFloatingNumbers(e.target.value));
resultKey.addEventListener('click', pressResultButton);
negativeButton.addEventListener('click', negativeNumber);
del.addEventListener('click', backspace);
clearButton.addEventListener('click', clear);

// Keyboard support

window.addEventListener('keydown', function (e) {
    switch (e.key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            setOperand(e.key);
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            setOperator(e.key);
            break;
        case '=':
        case 'Enter':
            pressResultButton();
            break;
        case 'Backspace':
            backspace();
            break;
        case 'c':
        case'Escape':
            clear();
            break;
        case '.':
            getFloatingNumbers(e.key);
            break;
        default:
            return;
    }
});