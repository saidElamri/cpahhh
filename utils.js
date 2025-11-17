// utils.js

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
        
        const submitButton = document.querySelector('.btn-add-cart'); // Assuming submitButton is globally accessible or passed
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

// Analytics Tracking
function trackAddToCart(quantity) {
    console.log('Add to Cart Event:', {
        product: window.appConfig.product.name,
        quantity: quantity,
        price: window.appConfig.discounts[quantity] ? window.appConfig.discounts[quantity].price : window.appConfig.discounts['1'].price,
        currency: 'USD'
    });
}

// Make functions globally accessible
window.showFormError = showFormError;
window.showError = showError;
window.scrollToProduct = scrollToProduct;
window.scrollToFeatures = scrollToFeatures;
window.trackAddToCart = trackAddToCart;
