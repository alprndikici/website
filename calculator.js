// Calculator functionality
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const operationSelect = document.getElementById('operation');
const calculateBtn = document.getElementById('calculate-btn');
const resultDisplay = document.getElementById('result-display');

// Calculator functions
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "Error: Division by zero is not allowed";
    }
    return num1 / num2;
}

// Calculate result
function calculate() {
    const num1 = parseFloat(num1Input.value);
    const num2 = parseFloat(num2Input.value);
    const operation = operationSelect.value;
    
    // Validate inputs
    if (isNaN(num1) || isNaN(num2)) {
        resultDisplay.textContent = 'Please enter valid numbers.';
        resultDisplay.className = 'result-display error';
        return;
    }
    
    if (!operation) {
        resultDisplay.textContent = 'Please select an operation.';
        resultDisplay.className = 'result-display error';
        return;
    }
    
    let result;
    let operationSymbol;
    
    switch(operation) {
        case 'add':
            result = add(num1, num2);
            operationSymbol = '+';
            break;
        case 'subtract':
            result = subtract(num1, num2);
            operationSymbol = '-';
            break;
        case 'multiply':
            result = multiply(num1, num2);
            operationSymbol = '×';
            break;
        case 'divide':
            if (num2 === 0) {
                resultDisplay.textContent = 'Error: Division by zero is not allowed';
                resultDisplay.className = 'result-display error';
                return;
            }
            result = divide(num1, num2);
            operationSymbol = '÷';
            break;
        default:
            resultDisplay.textContent = 'Invalid operation selected.';
            resultDisplay.className = 'result-display error';
            return;
    }
    
    // Display result
    if (typeof result === 'string') {
        resultDisplay.textContent = result;
        resultDisplay.className = 'result-display error';
    } else {
        // Format result to avoid unnecessary decimal places
        const formattedResult = result % 1 === 0 ? result : parseFloat(result.toFixed(10));
        resultDisplay.textContent = `Result: ${num1} ${operationSymbol} ${num2} = ${formattedResult}`;
        resultDisplay.className = 'result-display success';
    }
}

// Event listeners
calculateBtn.addEventListener('click', calculate);

// Allow Enter key to calculate
[num1Input, num2Input, operationSelect].forEach(element => {
    element.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculate();
        }
    });
});
