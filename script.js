const operators = document.querySelectorAll('.operator');
const operands = document.querySelectorAll('.number');
const resultKey = document.querySelector('.result');
let display = document.querySelector('.para');
const clearButton = document.getElementById('clear');
let currentNumber;
let previousNumber;
let currentOperator;
let operatorClicked = false;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;


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
}

operands.forEach(operand => operand.addEventListener('click',function(e) {
    let currentDigit = e.target.id;
    if (operatorClicked) {
        display.textContent = "";
        operatorClicked = false;
    }
    display.textContent += currentDigit;
}))

operators.forEach(operator => operator.addEventListener('click',function(e) {
    currentOperator = e.target.id;
    currentNumber = display.textContent;
    previousNumber = currentNumber;
    currentNumber = "";
    operatorClicked = true;
}))

resultKey.addEventListener('click',function() {
    currentNumber = display.textContent;
    currentNumber = parseFloat(currentNumber);
    previousNumber = parseFloat(previousNumber);
    let result = (operate(previousNumber,currentNumber,currentOperator));
    display.textContent = result;
})

clearButton.addEventListener('click',clear);

