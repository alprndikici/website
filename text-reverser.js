// Text Reverser functionality

// Reverse text function
function reverseText(text) {
    let reversed = "";
    for (let i = text.length - 1; i >= 0; i--) {
        reversed += text[i];
    }
    return reversed;
}

// DOM elements
const inputText = document.getElementById('input-text');
const reverseBtn = document.getElementById('reverse-btn');
const results = document.getElementById('results');
const originalTextDisplay = document.getElementById('original-text');
const completelyReversedDisplay = document.getElementById('completely-reversed');
const wordReversedDisplay = document.getElementById('word-reversed');

// Reverse text function
function reverseInputText() {
    const input = inputText.value.trim();
    
    if (!input) {
        alert('Please enter some text.');
        return;
    }
    
    // Completely reversed
    const completelyReversed = reverseText(input);
    
    // Word by word reversed
    const words = input.split(' ');
    const reversedWords = words.map(word => reverseText(word));
    const wordByWordReversed = reversedWords.join(' ');
    
    // Display results
    originalTextDisplay.textContent = input;
    completelyReversedDisplay.textContent = completelyReversed;
    wordReversedDisplay.textContent = wordByWordReversed;
    
    // Show results
    results.style.display = 'block';
}

// Event listeners
reverseBtn.addEventListener('click', reverseInputText);

inputText.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        reverseInputText();
    }
});
