const operators = document.querySelectorAll('.operator');
const operands = document.querySelectorAll('.number');
const result = document.querySelector('.result');
const display = document.querySelector('.display');

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (num1, num2, operator) => {
    switch (operator) {
        case '+':
            add(num1, num2);
            break;
        case '-':
            subtract(num1, num2);
            break;
        case '*':
            multiply(num1, num2);
            break;
        case '/':
            divide(num1, num2);
            break;
    }
}

operands.forEach(operand => operand.addEventListener('click',function() {
    let currentNum = operand.value;
    display.innerHTML = currentNum;
}))

