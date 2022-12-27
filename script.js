const operators = document.querySelectorAll('.operator');
const numbers = document.querySelectorAll('.number');
const resultKey = document.querySelector('.result');
let display = document.querySelector('.para');
const clearButton = document.getElementById('clear');
let currentNumber;
let previousNumber;
let currentOperator;
//display.textContent = 0;
let operatorClicked = false;
let equalClicked = false;

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

const clear = () => {
    display.textContent = "";
    currentNumber = "";
    previousNumber = "";
    operatorClicked = false;
    equalClicked = false;
}

const getResult = () => {
    currentNumber = display.textContent;
    currentNumber = parseFloat(currentNumber);
    previousNumber = parseFloat(previousNumber);
    if (currentOperator && previousNumber) {
        display.textContent = (operate(previousNumber, currentNumber, currentOperator)).toFixed(10);
    }
    previousNumber = "";
}

numbers.forEach(number => number.addEventListener('click', function (e) {
    let currentDigit = e.target.id;
    if (operatorClicked) {
        previousNumber = currentNumber;
        display.textContent = "";
        operatorClicked = false;
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
}))

resultKey.addEventListener('click', () => {
    if (equalClicked) {
        return;
    }
    getResult();
    equalClicked = true;
});

clearButton.addEventListener('click', clear);