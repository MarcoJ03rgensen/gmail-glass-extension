# 🌟 Gmail Glass - Glassmorphism Chrome Extension

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Chrome](https://img.shields.io/badge/chrome-extension-orange.svg)

Transform your Gmail interface with stunning glassmorphism effects! This Chrome extension applies modern frosted glass styling with vibrant colors to every element of Gmail, creating a beautiful and professional look.

## ✨ Features

### 🎨 Beautiful Design
- **Frosted Glass Effect**: Real glassmorphism with backdrop blur on all major UI elements
- **Vibrant Color Palette**: Carefully selected gradient colors (purple, blue, pink, green, orange)
- **Smooth Animations**: Elegant hover effects and transitions
- **Custom Scrollbars**: Glass-styled scrollbars that match the theme

### 📧 Comprehensive Coverage
- **Navigation Sidebar**: Glass effect on all navigation items with gradient active states
- **Email List**: Frosted glass cards for each email with hover effects
- **Reading Pane**: Beautiful glass panels for email content
- **Compose Window**: Gradient header with glass body and send button
- **Search Bar**: Glass-styled search with focus effects
- **Modals & Popups**: All dropdown menus and dialogs get the glass treatment
- **Labels & Categories**: Color-coordinated glass chips and badges

### 🎯 Key Highlights
- **Compose Button**: Eye-catching gradient button with shimmer animation
- **Unread Emails**: Visual accent with colored border
- **Hover Effects**: Smooth lift and glow on interactive elements
- **Active States**: Gradient backgrounds for selected items
- **Attachment Cards**: Glass styling for file previews

### ♿ Accessibility
- Maintains readability with proper contrast ratios
- Respects `prefers-reduced-motion` for accessibility
- Visible focus states for keyboard navigation
- Works with dark mode preferences

## 🚀 Installation

### From Source (Developer Mode)

1. **Clone or download this repository**:
   ```bash
   git clone https://github.com/MarcoJ03rgensen/gmail-glass-extension.git
   cd gmail-glass-extension
   ```

2. **Open Chrome Extensions page**:
   - Navigate to `chrome://extensions/`
   - Or click the three dots menu → "Extensions" → "Manage Extensions"

3. **Enable Developer Mode**:
   - Toggle the "Developer mode" switch in the top-right corner

4. **Load the extension**:
   - Click "Load unpacked"
   - Select the `gmail-glass-extension` folder

5. **Done!** Open Gmail and enjoy your new glassmorphism interface

### Future: Chrome Web Store
This extension will be published to the Chrome Web Store soon for easy one-click installation.

## 🎨 Customization

You can customize the colors and effects by editing `styles.css`:

```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.15);        /* Background opacity */
  --blur-amount: 12px;                           /* Blur intensity */
  --border-radius: 12px;                         /* Corner roundness */
  
  /* Accent colors - change these to your preference */
  --accent-purple: rgba(170, 140, 204, 0.85);
  --accent-blue: rgba(100, 181, 246, 0.85);
  --accent-pink: rgba(240, 98, 146, 0.85);
  --accent-green: rgba(129, 199, 132, 0.85);
  --accent-orange: rgba(255, 167, 38, 0.85);
}
```

## 🖼️ Screenshots

*Screenshots will be added soon showcasing the glassmorphism effects on various Gmail interfaces.*

## 🛠️ Technical Details

### Manifest V3
This extension uses the latest Manifest V3 format for optimal performance and security.

### CSS Features Used
- `backdrop-filter` and `-webkit-backdrop-filter` for blur effects
- RGBA colors for transparency
- CSS custom properties (variables) for easy customization
- Gradient backgrounds for vibrant accents
- CSS animations for smooth interactions
- Media queries for responsive design and accessibility

### Browser Compatibility
- **Chrome**: Version 76+ (full support)
- **Edge**: Version 79+ (full support)
- **Opera**: Version 63+ (full support)
- **Safari**: Version 9+ (requires `-webkit-` prefix)

**Note**: `backdrop-filter` is the key feature. Older browsers without support will show solid backgrounds instead.

## 📝 How It Works

1. The extension injects `styles.css` into Gmail pages at document start
2. CSS rules target Gmail's existing class names and elements
3. Glassmorphism effects are applied using modern CSS properties
4. No JavaScript is needed - pure CSS styling!
5. Works seamlessly with Gmail's dynamic loading

## 🔒 Privacy & Permissions

This extension:
- ✅ Only requests access to `mail.google.com`
- ✅ Does NOT collect any data
- ✅ Does NOT track your activity
- ✅ Does NOT modify email content
- ✅ Only applies visual styling via CSS
- ✅ No external connections or analytics

## 🐛 Known Issues

- Gmail occasionally updates their CSS classes, which may break some styling until the extension is updated
- Some third-party Gmail extensions might conflict with the styling
- Extremely old browsers without `backdrop-filter` support will show reduced visual effects

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report bugs**: Open an issue with details about the problem
2. **Suggest features**: Share your ideas for improvements
3. **Submit pull requests**: Fix bugs or add new features
4. **Share feedback**: Let me know what you think!

### Development Setup

```bash
# Clone the repository
git clone https://github.com/MarcoJ03rgensen/gmail-glass-extension.git

# Make your changes to styles.css
# Test by reloading the extension in chrome://extensions/

# Submit a pull request
```

## 📜 License

MIT License - feel free to use, modify, and distribute!

## 👤 Author

**Marco Birkedahl Jørgensen**
- GitHub: [@MarcoJ03rgensen](https://github.com/MarcoJ03rgensen)
- Location: Århus, Denmark

## 🙏 Acknowledgments

- Inspired by the glassmorphism design trend popularized by Apple's macOS Big Sur and Windows 11
- Built with modern CSS techniques and Manifest V3
- Thanks to the web design community for glassmorphism resources and examples

## 📊 Changelog

### Version 1.0.0 (2026-02-17)
- 🎉 Initial release
- ✨ Glassmorphism effects on all major Gmail UI elements
- 🎨 Vibrant gradient color scheme
- 📱 Responsive design support
- ♿ Accessibility features
- 🌙 Dark mode support
- ✅ Manifest V3 compliant

## 🔮 Future Plans

- [ ] Publish to Chrome Web Store
- [ ] Add options page for easy customization
- [ ] Multiple color theme presets
- [ ] Toggle to enable/disable specific effects
- [ ] Support for other browsers (Firefox, etc.)
- [ ] More animation options
- [ ] Custom accent color picker

## 💬 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/MarcoJ03rgensen/gmail-glass-extension/issues) page
2. Create a new issue with detailed information
3. Include screenshots if possible

---

⭐ If you like this extension, please star the repository!

Made with 💙 in Denmark
