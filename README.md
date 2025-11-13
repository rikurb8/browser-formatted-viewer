# Format & View - Firefox Extension

A Firefox extension that formats and syntax-highlights JSON and XML content in a new tab. Simply select text, right-click, and choose "Format and Open in New Tab" to view beautifully formatted and highlighted code.

## Features

- **JSON Formatting**: Automatically detects and formats JSON with proper indentation
- **XML Formatting**: Formats XML with clean structure using xml-formatter
- **Syntax Highlighting**: Uses highlight.js with GitHub Dark theme
- **Context Menu Integration**: Easy access via right-click menu
- **Clean UI**: Modern, dark-themed interface
- **Error Handling**: Clear error messages for invalid JSON/XML

## Installation

### Option 1: Load Temporary Add-on (For Testing)

1. Open Firefox and navigate to `about:debugging`
2. Click "This Firefox" in the left sidebar
3. Click "Load Temporary Add-on..."
4. Navigate to the extension directory and select `manifest.json`
5. The extension is now loaded temporarily (will be removed when Firefox restarts)

### Option 2: Install as Permanent Add-on

1. Package the extension:
   ```bash
   cd browser-formatted-viewer
   zip -r format-and-view.xpi *
   ```

2. In Firefox, go to `about:addons`
3. Click the gear icon ⚙️ and select "Install Add-on From File..."
4. Select the `format-and-view.xpi` file
5. Confirm the installation

**Note**: Firefox requires extensions to be signed for permanent installation. For personal use, you can:
- Use temporary add-on loading for development
- Enable `xpinstall.signatures.required` to `false` in `about:config` (not recommended for security reasons)
- Submit to Mozilla Add-ons for signing

## Usage

1. **Select Text**: Highlight JSON or XML text on any webpage
2. **Right-Click**: Open the context menu
3. **Click "Format and Open in New Tab"**: The extension will:
   - Detect if the content is JSON or XML
   - Format it with proper indentation
   - Apply syntax highlighting
   - Open in a new tab with a clean interface

### Example Content to Test

**JSON:**
```json
{"name":"John Doe","age":30,"city":"New York","hobbies":["reading","coding","gaming"]}
```

**XML:**
```xml
<?xml version="1.0"?><note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>
```

## Technical Details

### Architecture

- **manifest.json**: Extension configuration and permissions
- **background.js**: Handles context menu creation and click events
- **viewer.html**: Display page for formatted content
- **viewer.js**: Formatting and highlighting logic
- **viewer.css**: Styling for the viewer page
- **icons/**: Extension icons (SVG format)

### Libraries Used

- **[highlight.js](https://highlightjs.org/)** (v11.9.0): Syntax highlighting
  - CDN: `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/`
  - Theme: GitHub Dark

- **[xml-formatter](https://www.npmjs.com/package/xml-formatter)** (v3.6.3): XML formatting
  - CDN: `https://cdn.jsdelivr.net/npm/xml-formatter@3.6.3/dist/browser/xml-formatter.min.js`

### Permissions

- `contextMenus`: Create the right-click menu item
- `activeTab`: Access selected text from the current page
- `storage`: Temporarily store content for the viewer page

### How It Works

1. User selects text and clicks the context menu item
2. `background.js` captures the selected text
3. Text is stored in `browser.storage.local`
4. New tab opens with `viewer.html`
5. `viewer.js` retrieves the text from storage
6. Format is detected (JSON or XML)
7. Content is formatted using appropriate library
8. Syntax highlighting is applied with highlight.js
9. Storage is cleared after loading

## File Structure

```
browser-formatted-viewer/
├── manifest.json          # Extension configuration
├── background.js          # Background script for context menu
├── viewer.html           # Viewer page for formatted content
├── viewer.js             # Formatting and highlighting logic
├── viewer.css            # Styling for viewer page
├── icons/                # Extension icons
│   ├── icon-48.svg       # 48x48 icon
│   └── icon-96.svg       # 96x96 icon
└── README.md             # This file
```

## Development

### Prerequisites

- Firefox Browser (version 48+)
- Basic understanding of WebExtensions API

### Testing

1. Make changes to the code
2. If testing with temporary add-on:
   - Go to `about:debugging`
   - Click "Reload" next to the extension
3. Test with various JSON/XML content

### Debugging

- Open the Browser Console: `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Shift+J` (Mac)
- View extension logs and errors
- Use `console.log()` in your code for debugging

## Customization

### Change Highlight.js Theme

Edit `viewer.html` line 11:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
```

Available themes: [Highlight.js Demo](https://highlightjs.org/examples)

### Modify Formatting Options

Edit `viewer.js` to customize formatting:

**JSON** (line 31):
```javascript
return JSON.stringify(parsed, null, 2); // Change '2' for different indentation
```

**XML** (lines 38-42):
```javascript
const formatted = xmlFormatter(text, {
  indentation: '  ',      // Change indentation
  collapseContent: true,  // Collapse empty tags
  lineSeparator: '\n'     // Line separator
});
```

## Troubleshooting

### Extension Not Loading

- Check that all files are in the correct directory
- Verify `manifest.json` syntax is valid
- Check Browser Console for error messages

### Content Not Displaying

- Ensure text is properly selected before right-clicking
- Check if content is valid JSON/XML
- View error message in the viewer page

### Syntax Highlighting Not Working

- Check internet connection (libraries loaded from CDN)
- Verify CDN URLs are accessible
- Check Browser Console for loading errors

## Browser Compatibility

- Firefox 48+ (Manifest V2)
- **Note**: Chrome/Edge require Manifest V3 and different API usage

## License

MIT License - Feel free to use and modify as needed.

## Resources

- [Firefox Extension Documentation](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [highlight.js Documentation](https://highlightjs.org/)
- [xml-formatter on npm](https://www.npmjs.com/package/xml-formatter)
- [Context Menus API](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/menus)

## Contributing

Feel free to submit issues and enhancement requests!
