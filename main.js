// main.js
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize DOM elements from core script.js and event-listeners.js
        initializeDOMElements(); // from script.js
        initializeEventListenersDOMElements(); // from event-listeners.js
        initializeCartDOMElements(); // from cart.js

        // Initialize event listeners
        initializeEventListeners(); // from event-listeners.js

        // Initialize various features
        initializeFAQ(); // from faq.js
        initializeImageGallery(); // from image-gallery.js
        initializeQuantityControls(); // from quantity-controls.js
        initializeDeliveryUrgency(); // from delivery-urgency.js
        initializeViewerCount(); // from viewer-count.js
        initializeRecentPurchases(); // from recent-purchases.js
        initializeDynamicStock(); // from dynamic-stock.js
        initializeExitIntent(); // from exit-intent.js

        // Update cart display (from cart.js)
        updateCartDisplay();
    } catch (error) {
        console.error('Initialization error:', error);
        // showError is defined in utils.js, so it should be available globally
        if (typeof showError === 'function') {
            showError('Failed to initialize page. Please refresh.');
        } else {
            alert('Failed to initialize page. Please refresh.');
        }
    }
});
