// image-gallery.js
    
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

// Make functions globally accessible
window.initializeImageGallery = initializeImageGallery;