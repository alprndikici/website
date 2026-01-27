// Catch Me Game functionality
const gameArea = document.getElementById('game-area');
const catchMeText = document.getElementById('catch-me-text');
const attemptsDisplay = document.getElementById('attempts');
const escapesDisplay = document.getElementById('escapes');

let attempts = 0;
let escapes = 0;
let isEscaping = false;

// Game configuration
const ESCAPE_DISTANCE = 100; // pixels
const MARGIN = 50; // margin from edges

// Get random position within game area
function getRandomPosition() {
    const maxX = gameArea.offsetWidth - catchMeText.offsetWidth - MARGIN;
    const maxY = gameArea.offsetHeight - catchMeText.offsetHeight - MARGIN;
    
    return {
        x: Math.random() * (maxX - MARGIN) + MARGIN,
        y: Math.random() * (maxY - MARGIN) + MARGIN
    };
}

// Calculate distance between two points
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Get center position of text element
function getTextCenter() {
    const rect = catchMeText.getBoundingClientRect();
    const areaRect = gameArea.getBoundingClientRect();
    
    return {
        x: rect.left - areaRect.left + rect.width / 2,
        y: rect.top - areaRect.top + rect.height / 2
    };
}

// Move text to new position with animation
function escapeToNewPosition() {
    if (isEscaping) return; // Prevent multiple escapes at once
    
    isEscaping = true;
    escapes++;
    escapesDisplay.textContent = escapes;
    
    const newPos = getRandomPosition();
    
    // Add escape animation
    catchMeText.style.transition = 'transform 0.3s ease-out, opacity 0.2s';
    catchMeText.style.opacity = '0.5';
    catchMeText.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        catchMeText.style.left = newPos.x + 'px';
        catchMeText.style.top = newPos.y + 'px';
        
        setTimeout(() => {
            catchMeText.style.transition = 'transform 0.3s ease-out, opacity 0.2s';
            catchMeText.style.opacity = '1';
            catchMeText.style.transform = 'scale(1)';
            
            setTimeout(() => {
                isEscaping = false;
            }, 300);
        }, 50);
    }, 200);
}

// Check cursor proximity and escape if needed
function checkCursorProximity(e) {
    if (isEscaping) return;
    
    attempts++;
    attemptsDisplay.textContent = attempts;
    
    const areaRect = gameArea.getBoundingClientRect();
    const cursorX = e.clientX - areaRect.left;
    const cursorY = e.clientY - areaRect.top;
    
    const textCenter = getTextCenter();
    const distance = getDistance(cursorX, cursorY, textCenter.x, textCenter.y);
    
    if (distance < ESCAPE_DISTANCE) {
        escapeToNewPosition();
    }
}

// Initialize text position
function initializeTextPosition() {
    const initialPos = getRandomPosition();
    catchMeText.style.left = initialPos.x + 'px';
    catchMeText.style.top = initialPos.y + 'px';
}

// Event listeners
gameArea.addEventListener('mousemove', checkCursorProximity);

// Initialize on load
window.addEventListener('load', () => {
    initializeTextPosition();
});

// Handle window resize
window.addEventListener('resize', () => {
    const textCenter = getTextCenter();
    const maxX = gameArea.offsetWidth - catchMeText.offsetWidth - MARGIN;
    const maxY = gameArea.offsetHeight - catchMeText.offsetHeight - MARGIN;
    
    // Ensure text stays within bounds
    if (textCenter.x > maxX || textCenter.y > maxY) {
        initializeTextPosition();
    }
});
