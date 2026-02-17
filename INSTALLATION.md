# 🚀 Gmail Glass - Installation Guide

Detailed step-by-step instructions to install the Gmail Glass extension.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
  - [Method 1: Load Unpacked (Development)](#method-1-load-unpacked-development)
  - [Method 2: Chrome Web Store (Coming Soon)](#method-2-chrome-web-store-coming-soon)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)
- [Uninstallation](#uninstallation)

## Prerequisites

- **Google Chrome** (version 76 or higher) or any Chromium-based browser:
  - Microsoft Edge (version 79+)
  - Opera (version 63+)
  - Brave
  - Vivaldi
- **Gmail Account** - You need to be using Gmail at mail.google.com

## Installation Methods

### Method 1: Load Unpacked (Development)

This method is perfect for trying out the extension or making customizations.

#### Step 1: Download the Extension

**Option A: Clone with Git**
```bash
git clone https://github.com/MarcoJ03rgensen/gmail-glass-extension.git
cd gmail-glass-extension
```

**Option B: Download ZIP**
1. Go to [https://github.com/MarcoJ03rgensen/gmail-glass-extension](https://github.com/MarcoJ03rgensen/gmail-glass-extension)
2. Click the green **"Code"** button
3. Select **"Download ZIP"**
4. Extract the ZIP file to a folder on your computer
5. Remember the folder location!

#### Step 2: Open Chrome Extensions Page

**Option A: Using the Menu**
1. Click the three dots menu (⋮) in the top-right corner of Chrome
2. Hover over **"Extensions"**
3. Click **"Manage Extensions"**

**Option B: Direct URL**
1. Type `chrome://extensions/` in your address bar
2. Press Enter

**Option C: Using the Extensions Icon**
1. Click the puzzle piece icon (🧩) in the toolbar
2. Click **"Manage Extensions"** at the bottom

#### Step 3: Enable Developer Mode

1. Look for the **"Developer mode"** toggle in the top-right corner
2. Click to turn it **ON** (it should turn blue/green)
3. You'll see new buttons appear: "Load unpacked", "Pack extension", "Update"

#### Step 4: Load the Extension

1. Click the **"Load unpacked"** button
2. A file browser will open
3. Navigate to and select the `gmail-glass-extension` folder
   - Select the **folder itself**, not any file inside it
   - The folder should contain `manifest.json`, `styles.css`, etc.
4. Click **"Select Folder"** (or "Open" on Mac)

#### Step 5: Verify Installation

You should now see the Gmail Glass extension card appear in your extensions list:
- **Name**: Gmail Glass
- **Version**: 1.0.0
- **Description**: "Transform Gmail with beautiful glassmorphism effects..."
- **Status**: Should show as enabled (toggle switch on)

#### Step 6: Visit Gmail

1. Open a new tab
2. Go to [https://mail.google.com](https://mail.google.com)
3. **Important**: Hard refresh the page
   - Windows/Linux: `Ctrl + Shift + R` or `Ctrl + F5`
   - Mac: `Cmd + Shift + R`
4. The glassmorphism effects should now be visible!

---

### Method 2: Chrome Web Store (Coming Soon)

*This extension will be published to the Chrome Web Store for easy one-click installation. Stay tuned!*

Once published:
1. Visit the Chrome Web Store listing
2. Click "Add to Chrome"
3. Confirm the installation
4. Visit Gmail and enjoy!

---

## Verification

### How to Know It's Working

When the extension is properly installed and active, you should see:

✅ **Frosted glass effect** on the sidebar, email list, and reading pane
✅ **Vibrant gradient colors** on the Compose button (purple to blue)
✅ **Blurred backgrounds** behind UI elements
✅ **Smooth hover effects** when you move your mouse over emails
✅ **Colorful borders** on various UI components
✅ **Glass-styled scrollbars**

### Quick Visual Check

1. **Compose Button**: Should have a purple-to-blue gradient with a shimmer effect
2. **Email List**: Each email should have a frosted glass card appearance
3. **Sidebar**: Navigation items should have a subtle glass effect
4. **Overall**: The background should show a subtle colorful gradient

### If Nothing Changes

If Gmail looks exactly the same:

1. **Check extension is enabled**:
   - Go to `chrome://extensions/`
   - Find "Gmail Glass"
   - Make sure the toggle is ON (blue/green)

2. **Hard refresh Gmail**:
   - Press `Ctrl + Shift + R` (Windows/Linux)
   - Press `Cmd + Shift + R` (Mac)

3. **Check browser console** (for advanced users):
   - Right-click on the page → "Inspect"
   - Go to the "Console" tab
   - Look for any error messages mentioning the extension

4. **Verify the files**:
   - Go to `chrome://extensions/`
   - Click "Details" on Gmail Glass
   - Click "Inspect views: background page" or check for errors

---

## Troubleshooting

### Extension Not Showing Up

**Problem**: After loading unpacked, the extension doesn't appear.

**Solution**:
- Make sure you selected the correct folder (the one containing `manifest.json`)
- Check that `manifest.json` is valid JSON (no syntax errors)
- Look for error messages in the extensions page

### Styling Not Applied

**Problem**: Gmail looks normal, no glass effects.

**Solution**:
1. Hard refresh Gmail (`Ctrl + Shift + R` or `Cmd + Shift + R`)
2. Clear your browser cache:
   - Chrome Settings → Privacy and security → Clear browsing data
   - Select "Cached images and files"
   - Click "Clear data"
3. Disable other Gmail-related extensions temporarily
4. Try incognito mode (right-click extension icon → "Allow in incognito")

### Partial Styling

**Problem**: Some elements look correct, but others don't.

**Solution**:
- Gmail may have updated their HTML structure
- Check the repository for updates
- Open an issue on GitHub with screenshots

### Performance Issues

**Problem**: Gmail feels slower or laggy.

**Solution**:
- `backdrop-filter` can be GPU-intensive
- Try reducing `--blur-amount` in `styles.css`
- Ensure your browser is up to date
- Close unnecessary tabs to free up resources

### Conflicts with Other Extensions

**Problem**: Gmail looks broken or weird.

**Solution**:
- Disable other Gmail customization extensions
- Common conflicts: other theme/styling extensions
- Test with only Gmail Glass enabled

### Browser Not Supported

**Problem**: Effects don't work in older browsers.

**Solution**:
- Update to the latest Chrome version (76+)
- `backdrop-filter` requires modern browser support
- Check [caniuse.com/backdrop-filter](https://caniuse.com/css-backdrop-filter)

---

## Customization

Want to tweak the colors or effects?

1. Open the extension folder
2. Edit `styles.css` in any text editor
3. Find the `:root` section at the top
4. Modify the CSS variables:
   ```css
   :root {
     --glass-bg: rgba(255, 255, 255, 0.15);  /* Change opacity */
     --blur-amount: 12px;                     /* More/less blur */
     --border-radius: 12px;                   /* Rounder corners */
     --accent-purple: rgba(170, 140, 204, 0.85);  /* Different color */
   }
   ```
5. Save the file
6. Go to `chrome://extensions/`
7. Click the **reload icon** (🔄) on Gmail Glass
8. Hard refresh Gmail to see changes

---

## Updating the Extension

### If Installed from GitHub

**Option A: Git Pull**
```bash
cd gmail-glass-extension
git pull origin main
```

**Option B: Manual Download**
1. Download the latest version from GitHub
2. Extract to the same folder (overwrite files)

**Then**:
1. Go to `chrome://extensions/`
2. Click the reload icon on Gmail Glass
3. Hard refresh Gmail

### If Installed from Chrome Web Store

Extensions update automatically! Just restart Chrome occasionally.

---

## Uninstallation

### Remove the Extension

1. Go to `chrome://extensions/`
2. Find "Gmail Glass"
3. Click **"Remove"**
4. Confirm the removal
5. Refresh Gmail - it will return to normal

### Delete Extension Files (Optional)

If you loaded unpacked:
1. You can now safely delete the `gmail-glass-extension` folder
2. It's no longer needed after removal

---

## Additional Resources

- **GitHub Repository**: [https://github.com/MarcoJ03rgensen/gmail-glass-extension](https://github.com/MarcoJ03rgensen/gmail-glass-extension)
- **Report Issues**: [GitHub Issues](https://github.com/MarcoJ03rgensen/gmail-glass-extension/issues)
- **Chrome Extension Docs**: [developer.chrome.com/docs/extensions](https://developer.chrome.com/docs/extensions/)

---

## Need Help?

If you're still having trouble:

1. **Check existing issues**: [GitHub Issues](https://github.com/MarcoJ03rgensen/gmail-glass-extension/issues)
2. **Create a new issue**: Include:
   - Your Chrome version
   - Operating system
   - Screenshots if possible
   - Steps you've already tried
3. **Contact**: Open an issue on GitHub with your question

---

**Happy glassmorphism! 🌟**

Made with 💙 by Marco Birkedahl Jørgensen
