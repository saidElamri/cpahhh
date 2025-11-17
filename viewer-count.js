// viewer-count.js
    
// Initialize Viewer Count
function initializeViewerCount() {
    try {
        const viewerCountElement = document.getElementById('viewerCount');
        if (!viewerCountElement) return;
        
        setInterval(function() {
            const current = parseInt(viewerCountElement.textContent);
            const change = Math.floor(Math.random() * 3) - 1;
            const newCount = Math.max(15, Math.min(35, current + change));
            viewerCountElement.textContent = newCount;
        }, 8000);
    } catch (error) {
        console.error('Error initializing viewer count:', error);
    }
}

// Make functions globally accessible
window.initializeViewerCount = initializeViewerCount;