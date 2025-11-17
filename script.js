// script.js - Core UI and Global State

// Global State
let isSubmitting = false;
let exitIntentShown = false;

// DOM Elements (global references for now, will be moved to a dedicated module later)
let modal; // Used by setLoadingState and modal functions

// Initialize DOM Elements (called from main.js)
function initializeDOMElements() {
    try {
        // These are now initialized in their respective modules or passed as arguments
        // For now, we'll keep modal here as it's used by setLoadingState
        modal = document.getElementById('successModal');
    } catch (error) {
        console.error('Error initializing core DOM elements:', error);
        // showError is defined in utils.js, so it should be available globally
        if (typeof showError === 'function') {
            showError('Failed to initialize core elements. Please refresh.');
        } else {
            alert('Failed to initialize core elements. Please refresh.');
        }
    }
}

// Set loading state for submit button
function setLoadingState(loading) {
    try {
        const submitButton = document.querySelector('.btn-add-cart'); // Assuming submitButton is globally accessible or passed
        if (!submitButton) return;
        
        isSubmitting = loading;
        
        if (loading) {
            submitButton.disabled = true;
            submitButton.setAttribute('aria-busy', 'true');
            submitButton.textContent = 'Adding to Cart...';
            submitButton.classList.add('loading');
        } else {
            submitButton.disabled = false;
            submitButton.removeAttribute('aria-busy');
            submitButton.textContent = 'Get My Luxe Pasties Now';
            submitButton.classList.remove('loading');
        }
    } catch (error) {
        console.error('Error setting loading state:', error);
    }
}

// Make functions globally accessible
window.initializeDOMElements = initializeDOMElements;
window.setLoadingState = setLoadingState;
