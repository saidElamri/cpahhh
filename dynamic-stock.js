// dynamic-stock.js
    
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

// Make functions globally accessible
window.initializeDynamicStock = initializeDynamicStock;
window.updateStockMessage = updateStockMessage;
