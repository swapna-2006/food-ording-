
# Images Folder for SWATHI's FOODS

This folder contains images for the food ordering platform. The website currently uses high-quality images from Unsplash for food items and restaurant displays.

## Image Sources

All food item images are sourced from Unsplash.com, which provides free high-resolution images:

### Sample Food Images Used:
- **Biryani**: https://images.unsplash.com/photo-1563379091339-03246963d96c
- **Dosa**: https://images.unsplash.com/photo-1587736908446-23ebe0b50bb3
- **Butter Chicken**: https://images.unsplash.com/photo-1588166524941-3bf61a9c41db
- **Paneer Tikka**: https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8
- **Fish Curry**: https://images.unsplash.com/photo-1585032226651-759b368d7246
- **Idli Sambar**: https://images.unsplash.com/photo-1589301760014-d929f3979dbc
- **Mango Lassi**: https://images.unsplash.com/photo-1553909489-cd47e0ef937f
- **Gulab Jamun**: https://images.unsplash.com/photo-1571167364644-3e2b4b3e3d8c

## Adding Your Own Images

To add your own food images:

1. Place image files in this folder
2. Update the `image` property in the product data (in `js/product.js`)
3. Use relative paths like `images/your-image.jpg`

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 400x400px or larger
- **Quality**: High resolution for best display quality
- **Optimization**: Compress images for faster loading

## Folder Structure

```
images/
├── biryani/
│   ├── chicken-biryani.jpg
│   ├── mutton-biryani.jpg
│   └── veg-biryani.jpg
├── tiffin/
│   ├── dosa.jpg
│   ├── idli.jpg
│   └── vada.jpg
├── curries/
│   ├── butter-chicken.jpg
│   ├── fish-curry.jpg
│   └── dal-curry.jpg
├── beverages/
│   ├── mango-lassi.jpg
│   ├── tea.jpg
│   └── coffee.jpg
└── desserts/
    ├── gulab-jamun.jpg
    ├── ice-cream.jpg
    └── kulfi.jpg
```

## Note

The current implementation works perfectly with Unsplash URLs for demonstration purposes. All images load directly from the web, making the website fully functional without requiring local image files.
