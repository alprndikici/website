// Area Calculator functionality
let currentShape = null;

const shapeConfigs = {
    square: {
        name: 'Square',
        inputs: [
            { label: 'Side of square:', id: 'side', type: 'number' }
        ],
        calculate: (values) => {
            const side = parseFloat(values.side);
            return side * side;
        }
    },
    rectangle: {
        name: 'Rectangle',
        inputs: [
            { label: 'Length of rectangle:', id: 'length', type: 'number' },
            { label: 'Width of rectangle:', id: 'width', type: 'number' }
        ],
        calculate: (values) => {
            const length = parseFloat(values.length);
            const width = parseFloat(values.width);
            return length * width;
        }
    },
    trapezoid: {
        name: 'Trapezoid',
        inputs: [
            { label: 'Lower base of trapezoid:', id: 'base1', type: 'number' },
            { label: 'Upper base of trapezoid:', id: 'base2', type: 'number' },
            { label: 'Height of trapezoid:', id: 'height', type: 'number' }
        ],
        calculate: (values) => {
            const base1 = parseFloat(values.base1);
            const base2 = parseFloat(values.base2);
            const height = parseFloat(values.height);
            return ((base1 + base2) * height) / 2;
        }
    },
    parallelogram: {
        name: 'Parallelogram',
        inputs: [
            { label: 'Base of parallelogram:', id: 'base', type: 'number' },
            { label: 'Height of parallelogram:', id: 'height', type: 'number' }
        ],
        calculate: (values) => {
            const base = parseFloat(values.base);
            const height = parseFloat(values.height);
            return base * height;
        }
    },
    rhombus: {
        name: 'Rhombus',
        inputs: [
            { label: 'First diagonal of rhombus:', id: 'diagonal1', type: 'number' },
            { label: 'Second diagonal of rhombus:', id: 'diagonal2', type: 'number' }
        ],
        calculate: (values) => {
            const diagonal1 = parseFloat(values.diagonal1);
            const diagonal2 = parseFloat(values.diagonal2);
            return (diagonal1 * diagonal2) / 2;
        }
    }
};

// DOM elements
const shapeButtons = document.querySelectorAll('.shape-btn');
const shapeMenu = document.querySelector('.shape-menu');
const calculatorForm = document.getElementById('calculator-form');
const inputFields = document.getElementById('input-fields');
const calculateBtn = document.getElementById('calculate-btn');
const resultDisplay = document.getElementById('result-display');
const backBtn = document.getElementById('back-btn');

// Show form for selected shape
function showShapeForm(shape) {
    currentShape = shape;
    const config = shapeConfigs[shape];
    
    // Hide menu, show form
    shapeMenu.style.display = 'none';
    calculatorForm.style.display = 'block';
    
    // Clear previous inputs
    inputFields.innerHTML = '';
    resultDisplay.textContent = '';
    
    // Create input fields
    config.inputs.forEach(input => {
        const div = document.createElement('div');
        div.className = 'input-group';
        
        const label = document.createElement('label');
        label.textContent = input.label;
        label.setAttribute('for', input.id);
        
        const inputField = document.createElement('input');
        inputField.type = input.type;
        inputField.id = input.id;
        inputField.name = input.id;
        inputField.required = true;
        inputField.min = '0';
        inputField.step = '0.01';
        
        div.appendChild(label);
        div.appendChild(inputField);
        inputFields.appendChild(div);
    });
}

// Calculate area
function calculateArea() {
    const config = shapeConfigs[currentShape];
    const values = {};
    
    // Get input values
    config.inputs.forEach(input => {
        const inputField = document.getElementById(input.id);
        const value = inputField.value;
        
        if (!value || isNaN(value) || parseFloat(value) <= 0) {
            resultDisplay.textContent = 'Please enter valid positive numbers.';
            resultDisplay.className = 'result-display error';
            return;
        }
        
        values[input.id] = value;
    });
    
    // Calculate
    const area = config.calculate(values);
    resultDisplay.textContent = `Area of ${config.name.toLowerCase()} = ${area.toFixed(2)}`;
    resultDisplay.className = 'result-display success';
}

// Back to menu
function backToMenu() {
    shapeMenu.style.display = 'block';
    calculatorForm.style.display = 'none';
    currentShape = null;
    inputFields.innerHTML = '';
    resultDisplay.textContent = '';
}

// Event listeners
shapeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const shape = button.getAttribute('data-shape');
        showShapeForm(shape);
    });
});

calculateBtn.addEventListener('click', calculateArea);
backBtn.addEventListener('click', backToMenu);

// Allow Enter key to calculate
inputFields.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateArea();
    }
});
