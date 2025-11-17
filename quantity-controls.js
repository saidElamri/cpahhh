// quantity-controls.js
    
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

// Make functions globally accessible
window.initializeQuantityControls = initializeQuantityControls;