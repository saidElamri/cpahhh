// modals.js
    
// DOM Elements (global references for now, will be moved to a dedicated module later)
// let modal; // modal is global from script.js

// Modal Functions
function showModal() {
    try {
        // modal is global from script.js
        if (modal) {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
            
            document.body.style.overflow = 'hidden';
        }
    } catch (error) {
        console.error('Error showing modal:', error);
    }
}

function closeModal() {
    try {
        // modal is global from script.js
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    } catch (error) {
        console.error('Error closing modal:', error);
    }
}

// Make functions globally accessible
window.showModal = showModal;
window.closeModal = closeModal;
