// Message Cipher - Caesar cipher encrypt/decrypt
function password(text, key) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (/[a-zA-Z]/.test(char)) {
            const base = char === char.toLowerCase() ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            result += String.fromCharCode((char.charCodeAt(0) - base + key + 260) % 26 + base);
        } else {
            result += char;
        }
    }

    return result;
}

const messageInput = document.getElementById('message');
const keyInput = document.getElementById('key');
const cipherBtn = document.getElementById('cipher-btn');
const resultsDiv = document.getElementById('cipher-results');
const encryptedEl = document.getElementById('encrypted');
const decryptedEl = document.getElementById('decrypted');

function runCipher() {
    const message = messageInput.value.trim();
    let key = parseInt(keyInput.value, 10);

    if (!message) {
        alert('Please enter a message.');
        return;
    }

    if (isNaN(key) || key < 0 || key > 25) {
        alert('Please enter a key between 0 and 25.');
        return;
    }

    const encrypted = password(message, key);
    const decrypted = password(encrypted, -key);

    encryptedEl.textContent = encrypted;
    decryptedEl.textContent = decrypted;
    resultsDiv.style.display = 'block';
}

cipherBtn.addEventListener('click', runCipher);

messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') runCipher();
});
keyInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') runCipher();
});
