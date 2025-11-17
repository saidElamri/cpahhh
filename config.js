// config.js
window.appConfig = {
    product: {
        id: 'NP-LUXE-001',
        name: 'Luxe Reusable Silicone Nipple Pasties',
        image: 'https://m.media-amazon.com/images/I/71O99ewVjJL._AC_SL1500_.jpg',
        basePrice: 29.99 // Original price before any discounts
    },
    discounts: {
        '1': { price: 14.99, savePercentage: 50 }, // 50% off basePrice
        '2': { price: 8.99, savePercentage: 70 },  // 70% off basePrice
        '3': { price: 8.99, savePercentage: 70 }   // 70% off basePrice
    },
    alternativeCurrencies: {
        gbp: { basePrice: 24.99, discountedPrice: 12.49 },
        eur: { basePrice: 27.99, discountedPrice: 13.99 }
    },
    // Other configurable values can go here
    adblockWarningPage: 'adblock-warning.html'
};
