// Timer functionality
function updateTimer() {
    const now = new Date();
    
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    
    document.getElementById('date-display').textContent = `${day}/${month}/${year}`;
    document.getElementById('time-display').textContent = `${hour}:${minute}:${second}`;
}

// Update timer every second
updateTimer();
setInterval(updateTimer, 1000);
