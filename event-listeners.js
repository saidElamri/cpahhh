// event-listeners.js
    
// DOM Elements (global references for now, will be moved to a dedicated module later)
let purchaseForm, cartButton, cartSidebar, cartOverlay, cartClose, checkoutButton;
let heroCTA, finalCTA, successModalButton;
let exitIntentForm;

// Initialize DOM Elements (called from main.js)
function initializeEventListenersDOMElements() {
    purchaseForm = document.getElementById('purchaseForm');
    cartButton = document.getElementById('cartButton');
    cartSidebar = document.getElementById('cartSidebar');
    cartOverlay = document.getElementById('cartOverlay');
    cartClose = document.getElementById('cartClose');
    checkoutButton = document.getElementById('checkoutButton');
    heroCTA = document.querySelector('.hero-cta');
    finalCTA = document.querySelector('.final-cta .btn-primary');
    successModalButton = document.querySelector('#successModal .btn-primary');
    exitIntentForm = document.getElementById('exitIntentForm');
}

// Event Listeners
function initializeEventListeners() {
    try {
        if (purchaseForm) {
            purchaseForm.addEventListener('submit', handleAddToCart); // handleAddToCart is global from cart.js
        }
        
        if (cartButton) {
            cartButton.addEventListener('click', toggleCart); // toggleCart is global from cart.js
        }
        
        if (cartClose) {
            cartClose.addEventListener('click', closeCart); // closeCart is global from cart.js
        }
        
        if (cartOverlay) {
            cartOverlay.addEventListener('click', closeCart); // closeCart is global from cart.js
        }
        
        const modalClose = document.querySelector('.modal-close'); // modal is global from script.js
        if (modalClose) {
            modalClose.addEventListener('click', closeModal); // closeModal is global from modals.js
        }
        
        if (modal) { // modal is global from script.js
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal(); // closeModal is global from modals.js
                }
            });
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (modal && modal.classList.contains('active')) { // modal is global from script.js
                    closeModal(); // closeModal is global from modals.js
                }
                if (cartSidebar && cartSidebar.classList.contains('active')) { // cartSidebar is global from cart.js
                    closeCart(); // closeCart is global from cart.js
                }
                const exitModal = document.getElementById('exitIntentModal');
                if (exitModal && exitModal.classList.contains('active')) {
                    closeExitIntent(); // closeExitIntent is global from exit-intent.js
                }
            }
        });
        
        if (checkoutButton) {
            checkoutButton.addEventListener('click', handleCheckout); // handleCheckout is global from cart.js
        }

        if (heroCTA) {
            heroCTA.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                if (action === 'scrollToProduct') {
                    scrollToProduct(); // scrollToProduct is global from utils.js
                } else if (action === 'scrollToFeatures') {
                    scrollToFeatures(); // scrollToFeatures is global from utils.js
                }
            });
        }

        if (finalCTA) {
            finalCTA.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                if (action === 'scrollToProduct') {
                    scrollToProduct(); // scrollToProduct is global from utils.js
                }
            });
        }

        if (successModalButton) {
            successModalButton.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                if (action === 'closeModal') {
                    closeModal(); // closeModal is global from modals.js
                }
            });
        }

        // Exit Intent Form
        if (exitIntentForm) {
            exitIntentForm.addEventListener('submit', handleExitIntentSubmit); // handleExitIntentSubmit is global from exit-intent.js
        }
    } catch (error) {
        console.error('Error initializing event listeners:', error);
    }
}

// Make functions globally accessible
window.initializeEventListeners = initializeEventListeners;
window.initializeEventListenersDOMElements = initializeEventListenersDOMElements;