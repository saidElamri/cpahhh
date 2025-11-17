// main.js
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Initialize DOM elements from core script.js and event-listeners.js
        window.initializeDOMElements(); // from script.js
        window.initializeEventListenersDOMElements(); // from event-listeners.js
        window.initializeCartDOMElements(); // from cart.js

        // Initialize event listeners
        window.initializeEventListeners(); // from event-listeners.js

        // Initialize various features
        window.initializeFAQ(); // from faq.js
        window.initializeImageGallery(); // from image-gallery.js
        window.initializeQuantityControls(); // from quantity-controls.js
        window.initializeDeliveryUrgency(); // from delivery-urgency.js
        window.initializeViewerCount(); // from viewer-count.js
        window.initializeRecentPurchases(); // from recent-purchases.js
        window.initializeDynamicStock(); // from dynamic-stock.js
        window.initializeExitIntent(); // from exit-intent.js

        // Update cart display (from cart.js)
        window.updateCartDisplay();
    } catch (error) {
        console.error('Initialization error:', error);
        // showError is defined in utils.js, so it should be available globally
        if (typeof window.showError === 'function') {
            window.showError('Failed to initialize page. Please refresh.');
        } else {
            alert('Failed to initialize page. Please refresh.');
        }
    }
});
