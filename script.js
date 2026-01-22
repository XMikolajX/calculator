const scoreInput = document.getElementById('score');
const numberButtons = document.querySelectorAll('#numbers button');
const operatorButtons = document.querySelectorAll('#operators button');

let currentValue = '';
let previousValue = '';
let operation = null;

// Obsługa przycisków liczb
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentValue += button.textContent;
        scoreInput.value = currentValue;
    });
});

// Obsługa przycisków operatorów
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        const operator = button.textContent;
        
        if (operator === 'C') {
            currentValue = '';
            previousValue = '';
            operation = null;
            scoreInput.value = '';
        } else if (operator === 'CE') {
            currentValue = '';
            scoreInput.value = '';
        } else if (operator === '=') {
            if (operation && previousValue && currentValue) {
                currentValue = calculate(previousValue, currentValue, operation);
                scoreInput.value = currentValue;
                previousValue = '';
                operation = null;
            }
        } else if (['+', '-', '*', '/', '%'].includes(operator)) {
            if (currentValue) {
                previousValue = currentValue;
                operation = operator;
                currentValue = '';
            }
        }
    });
});

function calculate(prev, curr, op) {
    const a = parseFloat(prev);
    const b = parseFloat(curr);
    
    switch(op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Błąd';
        case '%': return a % b;
        default: return curr;
    }
}