// main.js
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeDOMElements();
        initializeEventListeners();
        initializeFAQ();
        initializeImageGallery();
        initializeQuantityControls();
        initializeDeliveryUrgency();
        initializeViewerCount();
        initializeRecentPurchases();
        initializeDynamicStock();
        initializeExitIntent();
        updateCartDisplay();
    } catch (error) {
        console.error('Initialization error:', error);
        // showError is defined in script.js, so it should be available globally
        if (typeof showError === 'function') {
            showError('Failed to initialize page. Please refresh.');
        } else {
            alert('Failed to initialize page. Please refresh.');
        }
    }
});