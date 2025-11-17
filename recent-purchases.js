// recent-purchases.js
    
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

// Make functions globally accessible
window.initializeRecentPurchases = initializeRecentPurchases;