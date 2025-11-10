# Image Replacement Guide

## Current Status

All image placeholders have been replaced with Unsplash Source API images using beauty/fashion keywords. **These are temporary generic images** and should be replaced with actual product photos of nipple pasties as soon as possible.

## Current Image Placeholders (Temporary - Replace ASAP)

### 1. Hero Image
- **Location:** Hero section
- **Current:** `https://source.unsplash.com/1920x1080/?beauty,product,fashion,elegant`
- **Status:** ⚠️ Generic beauty/fashion image - NOT product-specific
- **Dimensions:** 1920x1080px
- **Required:** High-quality product hero shot of nipple pasties on elegant background

### 2. Product Main Image
- **Location:** Product section (main display)
- **Current:** `https://source.unsplash.com/800x800/?beauty,product,closeup,detail`
- **Status:** ⚠️ Generic product closeup - NOT nipple pasties
- **Dimensions:** 800x800px
- **Required:** Close-up detail shot of actual nipple pasties showing texture and quality

### 3. Thumbnail Images
- **Lifestyle:** `https://source.unsplash.com/400x400/?fashion,woman,elegant,dress`
- **Packaging:** `https://source.unsplash.com/400x400/?packaging,luxury,box,product`
- **Application:** `https://source.unsplash.com/400x400/?beauty,skincare,application,care`
- **Status:** ⚠️ All generic images - NOT product-specific
- **Dimensions:** 400x400px each
- **Required:** 
  - Lifestyle: Woman wearing nipple pasties under elegant dress (or similar product in use)
  - Packaging: Actual premium packaging and storage case for nipple pasties
  - Application: Step-by-step application guide showing nipple pasties

### 4. Social Media Images
- **Open Graph:** `https://source.unsplash.com/1200x630/?beauty,product,fashion`
- **Twitter Card:** `https://source.unsplash.com/1200x630/?beauty,product,fashion`
- **Status:** ⚠️ Generic images - NOT product-specific
- **Dimensions:** 1200x630px
- **Required:** Branded hero image with actual nipple pasties product

## How to Replace Placeholders

### Option 1: Use Your Own Product Photos (Recommended)
1. Take professional product photos:
   - Hero: Product on elegant background (1920x1080px)
   - Detail: Close-up showing texture (800x800px)
   - Lifestyle: Product in use (400x400px)
   - Packaging: Premium packaging shot (400x400px)
   - Application: How-to guide image (400x400px)

2. Optimize images:
   - Compress for web (use tools like TinyPNG or ImageOptim)
   - Maintain quality while reducing file size
   - Save as JPG or WebP format

3. Upload to your server:
   - Place images in `/images/` directory
   - Update HTML src attributes to point to your images

### Option 2: Use Free Stock Photos

#### Unsplash (Free, High Quality)
- **Website:** https://unsplash.com
- **Search Terms:** "beauty product", "fashion photography", "elegant background"
- **How to Use:**
  1. Search for appropriate images
  2. Download high-resolution versions
  3. Crop/resize to required dimensions
  4. Upload to your server

#### Pexels (Free, High Quality)
- **Website:** https://www.pexels.com
- **Search Terms:** "beauty", "fashion", "product photography"
- **How to Use:**
  1. Search for appropriate images
  2. Download free versions
  3. Optimize and upload

#### Pixabay (Free, High Quality)
- **Website:** https://pixabay.com
- **Search Terms:** "beauty product", "fashion", "elegant"
- **How to Use:**
  1. Search and download
  2. Optimize for web
  3. Upload to server

### Option 3: Use Stock Photo Services (Paid)
- **Shutterstock:** https://www.shutterstock.com
- **Getty Images:** https://www.gettyimages.com
- **Adobe Stock:** https://stock.adobe.com

## Image Optimization Tips

1. **File Size:**
   - Hero image: < 500KB
   - Product images: < 200KB
   - Thumbnails: < 100KB

2. **Formats:**
   - Use JPG for photos
   - Use WebP for better compression (with JPG fallback)
   - Use PNG only for images with transparency

3. **Dimensions:**
   - Hero: 1920x1080px (16:9 aspect ratio)
   - Product: 800x800px (1:1 aspect ratio)
   - Thumbnails: 400x400px (1:1 aspect ratio)
   - Social: 1200x630px (1.91:1 aspect ratio)

4. **Alt Text:**
   - Always include descriptive alt text
   - Helps with SEO and accessibility
   - Current alt text is already optimized

## Quick Replacement Steps

1. **Prepare Images:**
   - Take or source product photos
   - Optimize for web
   - Name files descriptively (e.g., `hero-image.jpg`)

2. **Upload to Server:**
   - Place in `/images/` directory
   - Ensure proper file permissions

3. **Update HTML:**
   - Open `index.html`
   - Find image src attributes
   - Replace placeholder URLs with your image paths
   - Example: `src="images/hero-image.jpg"`

4. **Update Meta Tags:**
   - Update Open Graph image URL
   - Update Twitter Card image URL
   - Update structured data image URLs

5. **Test:**
   - Check all images load correctly
   - Verify on different devices
   - Test social media sharing previews

## Example Replacement

**Before:**
```html
<img src="https://via.placeholder.com/1920x1080/2C2C2C/FFFFFF?text=Luxe+Nipple+Pasties+Hero+Image" 
     alt="Premium silicone nipple covers displayed elegantly on soft fabric background">
```

**After:**
```html
<img src="images/nipple-pasties-hero.jpg" 
     alt="Premium silicone nipple covers displayed elegantly on soft fabric background">
```

## ⚠️ IMPORTANT: Get Actual Product Images

**The current images are generic beauty/fashion stock photos and do NOT show nipple pasties.** You MUST replace them with actual product images.

### Best Options for Product Images:

#### Option 1: Take Your Own Product Photos (RECOMMENDED)
1. **Hero Image:** Product on elegant fabric/background (1920x1080px)
2. **Detail Shot:** Close-up of nipple pasties showing texture (800x800px)
3. **Lifestyle:** Product in use (if appropriate) or elegant styling (400x400px)
4. **Packaging:** Premium packaging and case (400x400px)
5. **Application:** Step-by-step guide images (400x400px)

#### Option 2: Source from Similar Products (With Permission)
These retailers have product images you can reference (contact for licensing):

1. **Boob-eez:** https://boob-eez.com
   - Product images with packaging
   - Lifestyle shots
   - Color variations

2. **Go Nipless:** https://gonipless.com
   - Product detail shots
   - Packaging images
   - Application guides

3. **Luxmery:** https://theluxmery.com
   - Product photography
   - Lifestyle images
   - Packaging shots

4. **Princess Pasties:** https://princesspasties.com
   - Product images
   - Packaging shots

**⚠️ CRITICAL:** Always ensure you have proper licensing/permission to use any images from external sources. Never use copyrighted images without permission.

#### Option 3: Hire a Photographer
- Professional product photography
- Lifestyle shots
- Packaging photography
- Application guide photography

## Next Steps

1. ✅ Placeholders are now working and displaying
2. 📸 Source or create actual product images
3. 🔄 Replace placeholders with real images
4. ✅ Test all images load correctly
5. ✅ Verify social media previews work

---

**Last Updated:** 2025-01-27  
**Status:** Placeholders active, ready for replacement

