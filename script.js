// scripts.js
/*
Purpose: Client-side interactions for Luxe Nipple Pasties landing page
Features: Add to cart simulation, modal handling, smooth scrolling, cart counter
No external dependencies - vanilla JavaScript only
*/

// Cart state
let cartCount = 0;
let cartItems = [];

// DOM Elements
const purchaseForm = document.getElementById('purchaseForm');
const modal = document.getElementById('successModal');
const cartCountElement = document.querySelector('.cart-count');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadCartFromStorage();
    initializeEventListeners();
    updateCartDisplay();
    renderCartDrawer();
    // Start debug polling for locker script/init
    startLockerDebugPolling();
});

// Event Listeners
function initializeEventListeners() {
    // Purchase form submission
    if (purchaseForm) {
        purchaseForm.addEventListener('submit', handleAddToCart);
    }
    
    // Modal close button
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Cart button in nav
    const cartButton = document.querySelector('.cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', handleCartClick);
    }

    // Drawer close
    const cartDrawerClose = document.querySelector('.cart-drawer-close');
    if (cartDrawerClose) {
        cartDrawerClose.addEventListener('click', closeCartDrawer);
    }

    // Wire CTA buttons that used inline onclick
    const scrollProductBtns = document.querySelectorAll('.js-scroll-product');
    scrollProductBtns.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); scrollToProduct(); }));

    const scrollFeaturesBtns = document.querySelectorAll('.js-scroll-features');
    scrollFeaturesBtns.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); scrollToFeatures(); }));

    // Continue shopping buttons (drawer/modal)
    const continueBtns = document.querySelectorAll('.js-continue-shopping');
    continueBtns.forEach(btn => btn.addEventListener('click', (e) => { e.preventDefault(); closeCartDrawer(); closeModal(); }));

    // Checkout button(s) - redirect to content locker placeholder (to be implemented by you)
    const checkoutBtns = document.querySelectorAll('.btn-checkout');
    checkoutBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        // Open the in-page content locker modal (placeholder) instead of navigating away.
        openContentLocker();
    }));
    
    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    // Close content locker on outside click
    const contentLocker = document.getElementById('contentLockerModal');
    if (contentLocker) {
        contentLocker.addEventListener('click', function(e) {
            if (e.target === contentLocker) {
                closeContentLocker();
            }
        });
    }
    
    // Keyboard accessibility for modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (modal && modal.classList.contains('active')) closeModal();
            const locker = document.getElementById('contentLockerModal');
            if (locker && locker.classList.contains('active')) closeContentLocker();
        }
    });
}

// Add to Cart Handler
function handleAddToCart(e) {
    e.preventDefault();
    
    const quantitySelect = document.getElementById('quantity');
    const quantity = parseInt(quantitySelect.value);
    
    // Add item to cartItems
    const item = {
        id: 'NP-LUXE-001',
        name: 'Luxe Reusable Silicone Nipple Pasties',
        price: 29.99,
        quantity: quantity
    };
    cartItems.push(item);

    // Update cart count
    cartCount += quantity;
    updateCartDisplay();

    // Persist and render
    saveCartToStorage();
    renderCartDrawer();
    openCartDrawer();

    // Toast feedback
    showToast('Added to cart');

    // Track conversion (placeholder for analytics)
    trackAddToCart(quantity);
}

// Handle nav cart button clicks
function handleCartClick(e) {
    // If there are items in the cart, open the cart drawer.
    if (cartCount > 0) {
        renderCartDrawer();
        openCartDrawer();
        return;
    }

    // If cart is empty, show a toast message
    showToast('Your cart is empty');
}

// Cart storage helpers
function saveCartToStorage() {
    try {
        localStorage.setItem('wc_cart', JSON.stringify(cartItems));
    } catch (err) { console.warn('Could not save cart', err); }
}

function loadCartFromStorage() {
    try {
        const raw = localStorage.getItem('wc_cart');
        if (raw) {
            cartItems = JSON.parse(raw) || [];
            cartCount = cartItems.reduce((sum, it) => sum + (it.quantity || 0), 0);
        }
    } catch (err) {
        console.warn('Could not load cart', err);
        cartItems = [];
        cartCount = 0;
    }
}

// Render cart drawer contents
function renderCartDrawer() {
    const list = document.querySelector('.cart-items');
    const empty = document.querySelector('.cart-empty');
    const totalEl = document.querySelector('.cart-total-value');
    if (!list || !totalEl) return;

    list.innerHTML = '';
    if (cartItems.length === 0) {
        empty.style.display = 'block';
        totalEl.textContent = '$0.00';
        return;
    }

    empty.style.display = 'none';
    let total = 0;
    cartItems.forEach((it, idx) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-name">${it.name}</div>
                <div class="cart-item-qty">Qty: ${it.quantity}</div>
            </div>
            <div class="cart-item-price">$${(it.price * it.quantity).toFixed(2)}</div>
            <button class="cart-item-remove" data-idx="${idx}" aria-label="Remove item">Remove</button>
        `;
        list.appendChild(li);
        total += it.price * it.quantity;
    });

    totalEl.textContent = `$${total.toFixed(2)}`;

    // Hook up remove buttons
    const removeBtns = list.querySelectorAll('.cart-item-remove');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const i = parseInt(this.dataset.idx, 10);
            if (!isNaN(i)) {
                // subtract from cartCount
                cartCount -= cartItems[i].quantity;
                cartItems.splice(i, 1);
                saveCartToStorage();
                updateCartDisplay();
                renderCartDrawer();
            }
        });
    });
}

function openCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    if (drawer) {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
}

function closeCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    if (drawer) {
        drawer.classList.remove('open');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
}

// Toast
function showToast(message, timeout = 2000) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    setTimeout(() => {
        toast.classList.remove('visible');
    }, timeout);
}

// Update Cart Display
function updateCartDisplay() {
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.setAttribute('aria-label', `${cartCount} items in cart`);
        
        // Animation on update
        if (cartCount > 0) {
            cartCountElement.style.transform = 'scale(1.3)';
            setTimeout(() => {
                cartCountElement.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// Modal Functions
function showModal() {
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
}

function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

// Content Locker functions
function openContentLocker() {
    const locker = document.getElementById('contentLockerModal');
    if (!locker) return;
    
    const loading = locker.querySelector('.locker-loading');
    if (loading) loading.style.display = 'flex';
    
    locker.classList.add('active');
    locker.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (window.updateLockerDebug) window.updateLockerDebug('modal-open', true);

    // Check if the locker script is loaded
    if (window.initContentLocker) {
        try {
            window.initContentLocker();
            // Hide loading after content is initialized
            setTimeout(() => {
                if (loading) loading.style.display = 'none';
            }, 1000);
        } catch (error) {
            console.error('Error initializing content locker:', error);
            if (loading) {
                loading.innerHTML = `
                    <div class="locker-error">
                        <p>Error initializing checkout. Please try again.</p>
                        <button class="btn btn-primary" onclick="location.reload()">Reload Page</button>
                    </div>
                `;
            }
        }
    } else {
        // Script not loaded yet, error will be handled by script's onerror handler
        console.log('Content locker script not yet loaded');
    }
    
                    if (window.updateLockerDebug) window.updateLockerDebug('modal-open', false);
    // focus first focusable

                // Debug helpers for locker initialization tracing
                function updateLockerDebugUI(key, value) {
                    try {
                        const map = {
                            'script-appended': 'dbg-script-appended',
                            'script-loaded': 'dbg-script-loaded',
                            'init-present': 'dbg-init-present',
                            'modal-open': 'dbg-modal-open'
                        };
                        const id = map[key];
                        if (!id) return;
                        const el = document.getElementById(id);
                        if (!el) return;
                        const span = el.querySelector('.dbg-val');
                        if (span) span.textContent = value ? 'yes' : 'no';
                    } catch (e) { console.error(e); }
                }

                window.updateLockerDebug = function(key, value) {
                    console.log('[locker-debug]', key, value);
                    updateLockerDebugUI(key, value);
                };

                function startLockerDebugPolling() {
                    // If script element exists already, mark appended
                    const scriptEl = document.getElementById('locker-external');
                    if (scriptEl) window.updateLockerDebug('script-appended', true);

                    // Poll for initContentLocker presence for up to 10s
                    let checks = 0;
                    const interval = setInterval(() => {
                        checks++;
                        if (typeof window.initContentLocker === 'function') {
                            window.updateLockerDebug('script-loaded', true);
                            window.updateLockerDebug('init-present', true);
                            clearInterval(interval);
                            // If modal was already opened and waiting, initialize
                            if (window.initLockerOnLoad) {
                                try { window.initContentLocker(); } catch(e) { console.error(e); }
                            }
                            return;
                        }
                        // If the script tag exists but no init yet, mark appended
                        if (scriptEl) window.updateLockerDebug('script-appended', true);
                        if (checks > 20) { // ~10s
                            clearInterval(interval);
                            // mark not found
                            window.updateLockerDebug('script-loaded', false);
                        }
                    }, 500);

                    // Wire clear button on debug panel
                    document.addEventListener('click', function(e) {
                        if (e.target && e.target.id === 'dbg-clear') {
                            const spans = document.querySelectorAll('#locker-debug .dbg-val');
                            spans.forEach(s => s.textContent = 'no');
                        }
                    });
                }
    const focusable = locker.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length) focusable[0].focus();
}

function closeContentLocker() {
    const locker = document.getElementById('contentLockerModal');
    if (!locker) return;
    locker.classList.remove('active');
    locker.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Smooth Scroll Functions
function scrollToProduct() {
    const productSection = document.getElementById('product');
    if (productSection) {
        productSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToFeatures() {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
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

// Image Gallery Enhancement (Optional)
function initImageGallery() {
    const thumbnails = document.querySelectorAll('.product-thumbnails img');
    const mainImage = document.querySelector('.product-main-image');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                mainImage.src = this.src;
                mainImage.alt = this.alt;
                
                // Update active state
                thumbnails.forEach(t => t.style.borderColor = 'transparent');
                this.style.borderColor = 'var(--color-accent)';
            });
        });
    }
}

// Initialize image gallery if needed
initImageGallery();

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