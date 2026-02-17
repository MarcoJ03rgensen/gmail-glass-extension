# Extension Icons

This folder contains the extension icons for Gmail Glass.

## Required Sizes
- `icon16.png` - 16x16 pixels (toolbar icon)
- `icon48.png` - 48x48 pixels (extension management page)
- `icon128.png` - 128x128 pixels (Chrome Web Store)

## Creating Icons

You can create simple placeholder icons using any image editor, or use the following SVG as a starting point:

```svg
<svg width="128" height="128" xmlns="http://www.w3.org/2000/svg">
  <!-- Gradient background -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(170,140,204);stop-opacity:1" />
      <stop offset="50%" style="stop-color:rgb(100,181,246);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(240,98,146);stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="64" cy="64" r="60" fill="url(#grad)" opacity="0.9"/>
  
  <!-- Glass effect overlay -->
  <circle cx="64" cy="64" r="60" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
  
  <!-- Gmail 'M' letter -->
  <text x="64" y="84" font-family="Arial" font-size="72" font-weight="bold" 
        fill="white" text-anchor="middle" opacity="0.95">G</text>
</svg>
```

## Quick Icon Generation

You can use online tools like:
- [Canva](https://www.canva.com/) - Create custom icons
- [Figma](https://www.figma.com/) - Design professional icons
- [GIMP](https://www.gimp.org/) - Free image editor
- [SVG to PNG converters](https://svgtopng.com/) - Convert SVG to required sizes

## Temporary Solution

For development, you can use solid color PNG files:
1. Create a 128x128 PNG with a gradient background
2. Add a white "G" letter in the center
3. Resize to create 48x48 and 16x16 versions
4. Save all three in this folder

The extension will work without icons, but Chrome will show a default placeholder.
