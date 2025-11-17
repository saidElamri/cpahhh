// cart.js

// Cart state
let cartCount = 0;
let cartItems = [];

// DOM Elements (assuming they are initialized globally or passed)
let cartCountElement, cartItemsContainer, cartFooter, cartTotal;
let quantitySelect, submitButton; // Needed for handleAddToCart

// Initialize DOM Elements (these will be called from main.js)
function initializeCartDOMElements() {
    cartCountElement = document.getElementById('cartCount');
    cartItemsContainer = document.getElementById('cartItems');
    cartFooter = document.getElementById('cartFooter');
    cartTotal = document.getElementById('cartTotal');
    purchaseForm = document.getElementById('purchaseForm');
    quantitySelect = document.getElementById('quantity');
    submitButton = document.querySelector('.btn-add-cart');
}

// Add to Cart Handler
function handleAddToCart(e) {
    e.preventDefault();
    if (isSubmitting) return; // isSubmitting is global in script.js

    if (!validateForm()) { // validateForm is global from utils.js
        return;
    }

    setLoadingState(true); // setLoadingState is global in script.js

    // Simulate network request
    setTimeout(() => {
        try {
            const quantity = parseInt(quantitySelect.value);
            addToCart(quantity); // addToCart is defined below
            trackAddToCart(quantity); // trackAddToCart is global from utils.js

            // Open cart immediately after adding item
            setTimeout(() => {
                openCart(); // openCart is defined below
            }, 300);
        } catch (error) {
            console.error('Error during cart operation:', error);
            showFormError('Could not add item to cart. Please try again.'); // showFormError is global from utils.js
        } finally {
            setLoadingState(false); // setLoadingState is global in script.js
        }
    }, 500);
}

// Add to Cart
function addToCart(quantity) {
    try {
        const product = {
            id: window.appConfig.product.id,
            name: window.appConfig.product.name,
            price: window.appConfig.discounts[quantity] ? window.appConfig.discounts[quantity].price : window.appConfig.discounts['1'].price, // Fallback to 1-pair price if quantity not found
            quantity: quantity,
            image: window.appConfig.product.image
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

// Handle Checkout
function handleCheckout() {
    try {
        if (cartItems.length === 0) {
            showError('Your cart is empty');
            return;
        }
        
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        closeCart();
        
        // Attempt to trigger content locker
        try {
            if (typeof xfLock === 'function' && xfLock) {
                xfLock();
            } else if (typeof CPABuildLock === 'function' && CPABuildLock) {
                CPABuildLock();
            } else {
                // Fallback if content locker functions are not available (e.g., blocked or not loaded)
                console.log('Content locker functions not available, redirecting to adblock-warning.html as fallback.');
                window.location.href = window.appConfig.adblockWarningPage;
            }
        } catch (error) {
            console.error('Error attempting to trigger content locker:', error);
            console.log('Error in content locker execution, redirecting to adblock-warning.html as fallback.');
            window.location.href = window.appConfig.adblockWarningPage;
        }
        
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
window.handleAddToCart = handleAddToCart;
window.handleCheckout = handleCheckout;
window.updateCartDisplay = updateCartDisplay;
window.updateCartItems = updateCartItems;
window.addToCart = addToCart;
window.initializeCartDOMElements = initializeCartDOMElements;
