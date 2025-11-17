// delivery-urgency.js
    
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

// Make functions globally accessible
window.initializeDeliveryUrgency = initializeDeliveryUrgency;