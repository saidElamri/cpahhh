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

        // Persistent Adblocker Check for Content Locker
        let adblockerModalShown = false;
        const checkContentLockerInterval = setInterval(() => {
            if (!adblockerModalShown) {
                if (typeof window.xfLock !== 'function' && typeof window.CPABuildLock !== 'function') {
                    console.log('Content locker functions not detected, showing adblocker warning modal.');
                    window.showAdblockWarningModal();
                    adblockerModalShown = true; // Show only once
                    clearInterval(checkContentLockerInterval); // Stop checking once shown
                }
            }
        }, 2000); // Check every 2 seconds
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
