// exit-intent.js
    
// Global State (from script.js)
// let exitIntentShown = false; // This will be managed by script.js
    
// NEW: Initialize Exit Intent Popup
function initializeExitIntent() {
    try {
        document.addEventListener('mouseleave', function(e) {
            // exitIntentShown is global from script.js
            // cartItems is global from cart.js
            if (e.clientY < 10 && !exitIntentShown && cartItems.length === 0) {
                exitIntentShown = true;
                showExitIntent();
            }
        });
        
        const exitOverlay = document.getElementById('exitIntentOverlay');
        if (exitOverlay) {
            exitOverlay.addEventListener('click', closeExitIntent);
        }
    } catch (error) {
        console.error('Error initializing exit intent:', error);
    }
}

// NEW: Show Exit Intent Popup
function showExitIntent() {
    try {
        const exitModal = document.getElementById('exitIntentModal');
        const exitOverlay = document.getElementById('exitIntentOverlay');
        
        if (exitModal && exitOverlay) {
            exitModal.classList.add('active');
            exitOverlay.classList.add('active');
            exitModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    } catch (error) {
        console.error('Error showing exit intent:', error);
    }
}

// NEW: Close Exit Intent Popup
function closeExitIntent() {
    try {
        const exitModal = document.getElementById('exitIntentModal');
        const exitOverlay = document.getElementById('exitIntentOverlay');
        
        if (exitModal && exitOverlay) {
            exitModal.classList.remove('active');
            exitOverlay.classList.remove('active');
            exitModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    } catch (error) {
        console.error('Error closing exit intent:', error);
    }
}

// NEW: Handle Exit Intent Form Submit
function handleExitIntentSubmit(e) {
    e.preventDefault();
    
    try {
        const emailInput = e.target.querySelector('input[type="email"]');
        if (!emailInput) return;
        
        const email = emailInput.value;
        console.log('Email captured:', email);
        
        // Show success message
        const exitModal = document.getElementById('exitIntentModal');
        const exitContent = exitModal.querySelector('.exit-intent-content');
        
        if (exitContent) {
            exitContent.innerHTML = `
                <button class="modal-close" aria-label="Close" onclick="closeExitIntent()">&times;</button>
                <div class="modal-icon">✓</div>
                <h3>Success!</h3>
                <p>Check your email for your <strong>10% discount code</strong></p>
                <button class="btn btn-primary" onclick="closeExitIntent()">Start Shopping</button>
            `;
        }
        
        // Close after 3 seconds
        setTimeout(closeExitIntent, 3000);
    } catch (error) {
        console.error('Error handling exit intent submit:', error);
    }
}

// Make functions globally accessible
window.initializeExitIntent = initializeExitIntent;
window.showExitIntent = showExitIntent;
window.closeExitIntent = closeExitIntent;
window.handleExitIntentSubmit = handleExitIntentSubmit;