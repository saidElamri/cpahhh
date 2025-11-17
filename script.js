// Enhanced script.js with all improvements
// Cart state
let cartCount = 0;
let cartItems = [];
let isSubmitting = false;
let exitIntentShown = false;

// DOM Elements
let purchaseForm, modal, cartCountElement, quantitySelect, submitButton;
let cartButton, cartSidebar, cartOverlay, cartClose, cartBody, cartItemsContainer, cartFooter, cartTotal;
let checkoutButton;

// Initialize
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
        showError('Failed to initialize page. Please refresh.');
    }
});

// Initialize DOM Elements
function initializeDOMElements() {
    try {
        purchaseForm = document.getElementById('purchaseForm');
        modal = document.getElementById('successModal');
        cartCountElement = document.getElementById('cartCount');
        quantitySelect = document.getElementById('quantity');
        submitButton = document.querySelector('.btn-add-cart');
        
        cartButton = document.getElementById('cartButton');
        cartSidebar = document.getElementById('cartSidebar');
        cartOverlay = document.getElementById('cartOverlay');
        cartClose = document.getElementById('cartClose');
        cartBody = document.getElementById('cartBody');
        cartItemsContainer = document.getElementById('cartItems');
        cartFooter = document.getElementById('cartFooter');
        cartTotal = document.getElementById('cartTotal');

        checkoutButton = document.getElementById('checkoutButton');
    } catch (error) {
        console.error('Error initializing DOM elements:', error);
        throw error;
    }
}

// Event Listeners
function initializeEventListeners() {
    try {
        if (purchaseForm) {
            purchaseForm.addEventListener('submit', handleAddToCart);
        }
        
        if (cartButton) {
            cartButton.addEventListener('click', toggleCart);
        }
        
        if (cartClose) {
            cartClose.addEventListener('click', closeCart);
        }
        
        if (cartOverlay) {
            cartOverlay.addEventListener('click', closeCart);
        }
        
        const modalClose = document.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (modal && modal.classList.contains('active')) {
                    closeModal();
                }
                if (cartSidebar && cartSidebar.classList.contains('active')) {
                    closeCart();
                }
                const exitModal = document.getElementById('exitIntentModal');
                if (exitModal && exitModal.classList.contains('active')) {
                    closeExitIntent();
                }
            }
        });
        
        if (checkoutButton) {
            checkoutButton.addEventListener('click', handleCheckout);
        }

        const heroCTA = document.querySelector('.hero-cta');
        if (heroCTA) {
            heroCTA.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                if (action === 'scrollToProduct') {
                    scrollToProduct();
                } else if (action === 'scrollToFeatures') {
                    scrollToFeatures();
                }
            });
        }

        const finalCTA = document.querySelector('.final-cta .btn-primary');
        if (finalCTA) {
            finalCTA.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                if (action === 'scrollToProduct') {
                    scrollToProduct();
                }
            });
        }

        const successModalButton = document.querySelector('#successModal .btn-primary');
        if (successModalButton) {
            successModalButton.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                if (action === 'closeModal') {
                    closeModal();
                }
            });
        }

        // Exit Intent Form
        const exitIntentForm = document.getElementById('exitIntentForm');
        if (exitIntentForm) {
            exitIntentForm.addEventListener('submit', handleExitIntentSubmit);
        }
    } catch (error) {
        console.error('Error initializing event listeners:', error);
    }
}

// NEW: Initialize Delivery Urgency Timer
function initializeDeliveryUrgency() {
    try {
        const urgencyTime = document.getElementById('urgencyTime');
        const deliveryDateEl = document.getElementById('deliveryDate');
        
        if (!urgencyTime || !deliveryDateEl) return;
        
        // Set initial time (3 hours 24 minutes)
        let totalMinutes = 3 * 60 + 24;
        
        // Calculate delivery date (4 business days from now)
        const deliveryDate = new Date();
        let daysAdded = 0;
        while (daysAdded < 4) {
            deliveryDate.setDate(deliveryDate.getDate() + 1);
            const dayOfWeek = deliveryDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                daysAdded++;
            }
        }
        
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        deliveryDateEl.textContent = `${monthNames[deliveryDate.getMonth()]} ${deliveryDate.getDate()}`;
        
        // Update countdown every minute
        setInterval(function() {
            totalMinutes--;
            if (totalMinutes < 0) {
                totalMinutes = 3 * 60 + 24; // Reset
            }
            
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            urgencyTime.textContent = `${hours}h ${minutes}m`;
        }, 60000);
    } catch (error) {
        console.error('Error initializing delivery urgency:', error);
    }
}

// NEW: Initialize Dynamic Stock Indicator
function initializeDynamicStock() {
    try {
        const stockLevels = {1: 8, 2: 4, 3: 2, 4: 2, 5: 1};
        
        // Update stock when quantity changes
        const qtyOptions = document.querySelectorAll('.qty-option');
        if (qtyOptions.length > 0) {
            qtyOptions.forEach(option => {
                const originalClick = option.onclick;
                option.addEventListener('click', function() {
                    const qty = parseInt(this.getAttribute('data-qty'));
                    updateStockMessage(qty, stockLevels);
                });
            });
        }
        
        // Set initial stock message
        const activeOption = document.querySelector('.qty-option.active');
        if (activeOption) {
            const initialQty = parseInt(activeOption.getAttribute('data-qty')) || 1;
            updateStockMessage(initialQty, stockLevels);
        }
    } catch (error) {
        console.error('Error initializing dynamic stock:', error);
    }
}

// NEW: Update Stock Message
function updateStockMessage(selectedQty, stockLevels) {
    try {
        const stockMessage = document.getElementById('stockMessage');
        if (!stockMessage) return;
        
        const remaining = stockLevels[selectedQty] || 8;
        const unit = selectedQty > 1 ? 'sets' : 'pair';
        stockMessage.textContent = `Only ${remaining} ${unit} left at this quantity — order soon`;
    } catch (error) {
        console.error('Error updating stock message:', error);
    }
}

// NEW: Initialize Recent Purchases Notification
function initializeRecentPurchases() {
    try {
        const recentPurchase = document.getElementById('recentPurchase');
        if (!recentPurchase) return;
        
        const names = ['Sarah M.', 'Jessica K.', 'Amanda R.', 'Emily T.', 'Olivia W.', 'Sophia L.'];
        const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'Seattle'];
        const timeAgo = ['2 minutes ago', '5 minutes ago', '8 minutes ago', '12 minutes ago'];
        
        function showPurchaseNotification() {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomLocation = locations[Math.floor(Math.random() * locations.length)];
            const randomTime = timeAgo[Math.floor(Math.random() * timeAgo.length)];
            
            const purchaseText = recentPurchase.querySelector('.purchase-text');
            if (purchaseText) {
                purchaseText.textContent = `${randomName} from ${randomLocation} purchased ${randomTime}`;
            }
            
            recentPurchase.style.display = 'flex';
            recentPurchase.classList.add('show');
            
            setTimeout(() => {
                recentPurchase.classList.remove('show');
                setTimeout(() => {
                    recentPurchase.style.display = 'none';
                }, 300);
            }, 5000);
        }
        
        // Show first notification after 8 seconds
        setTimeout(showPurchaseNotification, 8000);
        
        // Then show every 25-35 seconds
        setInterval(showPurchaseNotification, 30000);
    } catch (error) {
        console.error('Error initializing recent purchases:', error);
    }
}

// NEW: Initialize Exit Intent Popup
function initializeExitIntent() {
    try {
        document.addEventListener('mouseleave', function(e) {
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

// Make closeExitIntent globally accessible
window.closeExitIntent = closeExitIntent;

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

// Form Validation
function validateForm() {
    try {
        if (!quantitySelect) {
            throw new Error('Quantity selector not found');
        }
        
        const quantity = parseInt(quantitySelect.value);
        
        if (isNaN(quantity) || quantity < 1 || quantity > 10) {
            showFormError('Please select a valid quantity (1-10)');
            return false;
        }
        
        return true;
    } catch (error) {
        console.error('Form validation error:', error);
        showFormError('Validation error. Please try again.');
        return false;
    }
}

// Show form error message
function showFormError(message) {
    try {
        const existingError = document.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        errorDiv.setAttribute('role', 'alert');
        errorDiv.setAttribute('aria-live', 'polite');
        
        if (submitButton && submitButton.parentNode) {
            submitButton.parentNode.insertBefore(errorDiv, submitButton);
        }
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    } catch (error) {
        console.error('Error showing form error:', error);
    }
}

// Show general error message
function showError(message) {
    try {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'page-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #E74C3C; color: white; padding: 1rem; border-radius: 0.5rem; z-index: 10000;';
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    } catch (error) {
        console.error('Error showing error message:', error);
    }
}

// Add to Cart Handler
function handleAddToCart(e) {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
        return;
    }

    setLoadingState(true);

    // Simulate network request
    setTimeout(() => {
        try {
            const quantity = parseInt(quantitySelect.value);
            addToCart(quantity);
            trackAddToCart(quantity);

            // Open cart immediately after adding item
            setTimeout(() => {
                openCart();
            }, 300);
        } catch (error) {
            console.error('Error during cart operation:', error);
            showFormError('Could not add item to cart. Please try again.');
        } finally {
            setLoadingState(false);
        }
    }, 500);
}

// Set loading state for submit button
function setLoadingState(loading) {
    try {
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

// Add to Cart
function addToCart(quantity) {
    try {
        const product = {
            id: 'NP-LUXE-001',
            name: 'Luxe Reusable Silicone Nipple Pasties',
            price: (function() {
                if (quantity === 1) return 14.99;
                if (quantity === 2) return 8.99;
                if (quantity === 3) return 8.99;
                return 14.99; // Default for other quantities, or handle as an error
            })(),
            quantity: quantity,
            image: 'https://m.media-amazon.com/images/I/71O99ewVjJL._AC_SL1500_.jpg'
        };
        
        const existingItem = cartItems.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push(product);
        }
        
        cartCount += quantity;
        updateCartDisplay();
        updateCartItems();
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}

// Update Cart Display
function updateCartDisplay() {
    try {
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            cartCountElement.setAttribute('aria-label', `${cartCount} items in cart`);
            
            if (cartCount > 0) {
                cartCountElement.style.display = 'flex';
                cartCountElement.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    if (cartCountElement) {
                        cartCountElement.style.transform = 'scale(1)';
                    }
                }, 200);
            } else {
                cartCountElement.style.display = 'none';
            }
        }
    } catch (error) {
        console.error('Error updating cart display:', error);
    }
}

// Update Cart Items Display
function updateCartItems() {
    try {
        const cartEmpty = document.getElementById('cartEmpty');
        
        if (cartItems.length === 0) {
            if (cartEmpty) cartEmpty.style.display = 'flex';
            if (cartItemsContainer) cartItemsContainer.style.display = 'none';
            if (cartFooter) cartFooter.style.display = 'none';
        } else {
            if (cartEmpty) cartEmpty.style.display = 'none';
            if (cartItemsContainer) cartItemsContainer.style.display = 'block';
            if (cartFooter) cartFooter.style.display = 'block';
            
            if (cartItemsContainer) {
                cartItemsContainer.innerHTML = cartItems.map((item, index) => `
                    <div class="cart-item" data-item-id="${item.id}" data-index="${index}">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                            <div class="cart-item-quantity">
                                <button class="cart-item-qty-btn minus" aria-label="Decrease quantity">-</button>
                                <input type="number" class="cart-item-qty-input" value="${item.quantity}" min="1" max="10" readonly>
                                <button class="cart-item-qty-btn plus" aria-label="Increase quantity">+</button>
                            </div>
                        </div>
                        <button class="cart-item-remove" aria-label="Remove item">×</button>
                    </div>
                `).join('');

                cartItemsContainer.querySelectorAll('.cart-item').forEach(item => {
                    const index = parseInt(item.dataset.index);
                    item.querySelector('.minus').addEventListener('click', () => updateCartItemQuantity(index, -1));
                    item.querySelector('.plus').addEventListener('click', () => updateCartItemQuantity(index, 1));
                    item.querySelector('.cart-item-remove').addEventListener('click', () => removeCartItem(index));
                });
            }
            
            const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (cartTotal) {
                cartTotal.textContent = `$${total.toFixed(2)}`;
            }
        }
    } catch (error) {
        console.error('Error updating cart items:', error);
    }
}

// Toggle Cart Sidebar
function toggleCart() {
    try {
        if (cartSidebar) {
            const isActive = cartSidebar.classList.contains('active');
            if (isActive) {
                closeCart();
            } else {
                openCart();
            }
        }
    } catch (error) {
        console.error('Error toggling cart:', error);
    }
}

// Open Cart
function openCart() {
    try {
        if (cartSidebar) {
            cartSidebar.classList.add('active');
            cartSidebar.setAttribute('aria-hidden', 'false');
            if (cartButton) {
                cartButton.setAttribute('aria-expanded', 'true');
            }
            document.body.style.overflow = 'hidden';
            updateCartItems();
        }
    } catch (error) {
        console.error('Error opening cart:', error);
    }
}

// Close Cart
function closeCart() {
    try {
        if (cartSidebar) {
            cartSidebar.classList.remove('active');
            cartSidebar.setAttribute('aria-hidden', 'true');
            if (cartButton) {
                cartButton.setAttribute('aria-expanded', 'false');
            }
            document.body.style.overflow = '';
        }
    } catch (error) {
        console.error('Error closing cart:', error);
    }
}

// Update Cart Item Quantity
function updateCartItemQuantity(index, change) {
    try {
        if (cartItems[index]) {
            const newQuantity = cartItems[index].quantity + change;
            if (newQuantity < 1) {
                removeCartItem(index);
            } else if (newQuantity <= 10) {
                const quantityChange = change;
                cartItems[index].quantity = newQuantity;
                cartCount += quantityChange;
                updateCartDisplay();
                updateCartItems();
            }
        }
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
    }
}

// Remove Cart Item
function removeCartItem(index) {
    try {
        if (cartItems[index]) {
            cartCount -= cartItems[index].quantity;
            cartItems.splice(index, 1);
            updateCartDisplay();
            updateCartItems();
        }
    } catch (error) {
        console.error('Error removing cart item:', error);
    }
}

// Handle Buy Now (removed - simplified to single Add to Cart button)
// function handleBuyNow() { }

// Handle Checkout
function handleCheckout() {
    try {
        if (cartItems.length === 0) {
            showError('Your cart is empty');
            return;
        }
        
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        closeCart();
        
        setTimeout(() => {
            try {
                if (typeof xfLock === 'function') {
                    xfLock();
                } else if (typeof CPABuildLock === 'function') {
                    CPABuildLock();
                } else {
                    // If content locker functions are not defined, assume adblocker is active
                    console.log('Adblocker detected, redirecting to adblock-warning.html');
                    window.location.href = 'adblock-warning.html';
                }
            } catch (error) {
                console.error('Error triggering content locker:', error);
                console.log('Error in content locker, redirecting to adblock-warning.html');
                window.location.href = 'adblock-warning.html';
            }
        }, 300);
        
    } catch (error) {
        console.error('Error handling checkout:', error);
        showError('Error processing checkout. Please try again.');
    }
}

// Make functions globally accessible
window.toggleCart = toggleCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.updateCartItemQuantity = updateCartItemQuantity;
window.removeCartItem = removeCartItem;

// Modal Functions
function showModal() {
    try {
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
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    } catch (error) {
        console.error('Error closing modal:', error);
    }
}

// Smooth Scroll Functions
function scrollToProduct() {
    try {
        const productSection = document.getElementById('product');
        if (productSection) {
            productSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    } catch (error) {
        console.error('Error scrolling to product:', error);
    }
}

function scrollToFeatures() {
    try {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    } catch (error) {
        console.error('Error scrolling to features:', error);
    }
}

// Initialize FAQ Accordion
function initializeFAQ() {
    try {
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (faqItems.length === 0) {
            return;
        }
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (!question || !answer) {
                return;
            }
            
            answer.style.display = 'none';
            answer.setAttribute('aria-hidden', 'true');
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('role', 'button');
            question.setAttribute('tabindex', '0');
            question.setAttribute('id', `faq-question-${index}`);
            answer.setAttribute('id', `faq-answer-${index}`);
            answer.setAttribute('aria-labelledby', `faq-question-${index}`);
            
            question.addEventListener('click', function() {
                toggleFAQ(item, question, answer);
            });
            
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleFAQ(item, question, answer);
                }
            });
        });
    } catch (error) {
        console.error('Error initializing FAQ:', error);
    }
}

// Toggle FAQ item
function toggleFAQ(item, question, answer) {
    try {
        const isExpanded = question.getAttribute('aria-expanded') === 'true';
        
        const allFaqItems = document.querySelectorAll('.faq-item');
        allFaqItems.forEach(otherItem => {
            if (otherItem !== item) {
                const otherQuestion = otherItem.querySelector('.faq-question');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                if (otherQuestion && otherAnswer) {
                    otherAnswer.style.display = 'none';
                    otherAnswer.setAttribute('aria-hidden', 'true');
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    otherItem.classList.remove('active');
                }
            }
        });
        
        if (isExpanded) {
            answer.style.display = 'none';
            answer.setAttribute('aria-hidden', 'true');
            question.setAttribute('aria-expanded', 'false');
            item.classList.remove('active');
        } else {
            answer.style.display = 'block';
            answer.setAttribute('aria-hidden', 'false');
            question.setAttribute('aria-expanded', 'true');
            item.classList.add('active');
        }
    } catch (error) {
        console.error('Error toggling FAQ:', error);
    }
}

// Make functions globally accessible for onclick attributes
window.closeModal = closeModal;
window.scrollToProduct = scrollToProduct;
window.scrollToFeatures = scrollToFeatures;

// Analytics Tracking
function trackAddToCart(quantity) {
    console.log('Add to Cart Event:', {
        product: 'Luxe Reusable Silicone Nipple Pasties',
        quantity: quantity,
        price: 29.99,
        currency: 'USD'
    });
}

// Image Gallery Enhancement
function initializeImageGallery() {
    try {
        const thumbnails = document.querySelectorAll('.product-thumbnails .thumbnail');
        const mainImage = document.getElementById('mainProductImage');
        
        if (thumbnails.length > 0 && mainImage) {
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', function() {
                    changeImage(this, thumbnails, mainImage);
                });

                thumbnail.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        changeImage(this, thumbnails, mainImage);
                    }
                });
            });
        }
    } catch (error) {
        console.error('Error initializing image gallery:', error);
    }
}

function changeImage(selectedThumbnail, allThumbnails, mainImage) {
    // Remove active class from all thumbnails
    allThumbnails.forEach(t => t.classList.remove('active'));
    
    // Add active class to the clicked thumbnail
    selectedThumbnail.classList.add('active');
    
    // Change the main image src
    mainImage.src = selectedThumbnail.dataset.full;
}

function initializeQuantityControls() {
    try {
        const qtyInput = document.getElementById('quantity');
        const qtyOptions = document.querySelectorAll('.qty-option');

        if (!qtyInput) return;

        qtyOptions.forEach(option => {
            option.addEventListener('click', function() {
                const qty = this.dataset.qty;
                qtyInput.value = qty;

                qtyOptions.forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');
            });
        });
    } catch (error) {
        console.error('Error initializing quantity controls:', error);
    }
}