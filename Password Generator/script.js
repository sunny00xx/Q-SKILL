const passwordDisplay = document.getElementById('passwordDisplay');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const uppercaseCheck = document.getElementById('uppercase');
const lowercaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const strengthBar = document.getElementById('strengthBar');
const strengthText = document.getElementById('strengthText');
const notification = document.getElementById('notification');

const CHAR_SETS = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]\:;?><,./-='
};

// Update length display
lengthSlider.addEventListener('input', (e) => {
    lengthValue.textContent = e.target.value;
    generatePassword(); // Generate on slide for interactive feel
});

function generatePassword() {
    let charset = '';
    if (uppercaseCheck.checked) charset += CHAR_SETS.uppercase;
    if (lowercaseCheck.checked) charset += CHAR_SETS.lowercase;
    if (numbersCheck.checked) charset += CHAR_SETS.numbers;
    if (symbolsCheck.checked) charset += CHAR_SETS.symbols;

    if (charset === '') {
        passwordDisplay.value = 'SELECT_OPTION';
        updateStrength(0);
        return;
    }

    let password = '';
    const length = parseInt(lengthSlider.value);

    // Use Crypto API for better randomness
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
        password += charset[array[i] % charset.length];
    }

    passwordDisplay.value = password;
    calculateStrength(password);
}

function calculateStrength(password) {
    let score = 0;
    if (password.length > 12) score++;
    if (password.length > 20) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    updateStrength(score);
}

function updateStrength(score) {
    const bar = document.querySelector('.bar');
    bar.classList.remove('strength-weak', 'strength-medium', 'strength-strong');

    if (score < 3) {
        bar.classList.add('strength-weak');
        strengthText.textContent = 'STRENGTH: VULNERABLE';
    } else if (score < 5) {
        bar.classList.add('strength-medium');
        strengthText.textContent = 'STRENGTH: SECURE';
    } else {
        bar.classList.add('strength-strong');
        strengthText.textContent = 'STRENGTH: UNBREAKABLE';
    }
}

async function copyToClipboard() {
    const password = passwordDisplay.value;
    if (!password || password === 'SELECT_OPTION' || password === 'P4S$W0RD_H3R3') return;

    try {
        await navigator.clipboard.writeText(password);
        showNotification();
    } catch (err) {
        console.error('Failed to copy!', err);
    }
}

function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// Event Listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyToClipboard);

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    generatePassword();
});
