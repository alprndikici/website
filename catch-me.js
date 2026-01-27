// Catch Me Game functionality with Canvas
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

let isEscaping = false;

// Game configuration
const ESCAPE_DISTANCE = 100; // pixels
const MARGIN = 50; // margin from edges
const TEXT = "Catch me!";
const FONT_SIZE = 30;
const FONT = `${FONT_SIZE}px Arial`;

// Text position
let textX = canvas.width / 2;
let textY = canvas.height / 2;

// Measure text dimensions
ctx.font = FONT;
const textMetrics = ctx.measureText(TEXT);
const textWidth = textMetrics.width;
const textHeight = FONT_SIZE;

// Get random position within canvas
function getRandomPosition() {
    const maxX = canvas.width - textWidth - MARGIN;
    const maxY = canvas.height - textHeight - MARGIN;
    
    return {
        x: Math.random() * (maxX - MARGIN) + MARGIN,
        y: Math.random() * (maxY - MARGIN) + MARGIN + textHeight
    };
}

// Calculate distance between two points
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// Draw the game
function draw() {
    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw text
    ctx.font = FONT;
    ctx.fillStyle = '#4ade80';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(74, 222, 128, 0.5)';
    ctx.shadowBlur = 10;
    ctx.fillText(TEXT, textX, textY);
    ctx.shadowBlur = 0;
}

// Move text to new position with animation
function escapeToNewPosition() {
    if (isEscaping) return; // Prevent multiple escapes at once
    
    isEscaping = true;
    const newPos = getRandomPosition();
    
    // Fade out animation
    let opacity = 1;
    const fadeOut = setInterval(() => {
        opacity -= 0.15;
        if (opacity <= 0) {
            clearInterval(fadeOut);
            // Move to new position
            textX = newPos.x;
            textY = newPos.y;
            
            // Fade in animation
            opacity = 0;
            const fadeIn = setInterval(() => {
                opacity += 0.15;
                if (opacity >= 1) {
                    opacity = 1;
                    clearInterval(fadeIn);
                    isEscaping = false;
                }
                drawWithOpacity(opacity);
            }, 30);
        } else {
            drawWithOpacity(opacity);
        }
    }, 30);
}

// Draw with opacity
function drawWithOpacity(opacity) {
    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw text with opacity
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.font = FONT;
    ctx.fillStyle = '#4ade80';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = `rgba(74, 222, 128, ${opacity * 0.5})`;
    ctx.shadowBlur = 10;
    ctx.fillText(TEXT, textX, textY);
    ctx.restore();
}

// Get mouse position relative to canvas
function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

// Check cursor proximity and escape if needed
function checkCursorProximity(e) {
    if (isEscaping) return;
    
    const mousePos = getMousePos(e);
    const distance = getDistance(mousePos.x, mousePos.y, textX, textY);
    
    if (distance < ESCAPE_DISTANCE) {
        escapeToNewPosition();
    }
}

// Initialize game
function init() {
    const initialPos = getRandomPosition();
    textX = initialPos.x;
    textY = initialPos.y;
    draw();
}

// Event listeners
canvas.addEventListener('mousemove', checkCursorProximity);

// Initialize on load
window.addEventListener('load', () => {
    resizeCanvas();
    init();
});

// Handle window resize - maintain aspect ratio
function resizeCanvas() {
    const container = canvas.parentElement;
    const maxWidth = container.offsetWidth;
    const aspectRatio = 800 / 500;
    
    if (maxWidth < 800) {
        canvas.style.width = maxWidth + 'px';
        canvas.style.height = (maxWidth / aspectRatio) + 'px';
    } else {
        canvas.style.width = '800px';
        canvas.style.height = '500px';
    }
    draw();
}

window.addEventListener('resize', resizeCanvas);

// Initial resize
window.addEventListener('load', () => {
    resizeCanvas();
});
