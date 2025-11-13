// highlight.js is loaded globally from lib/highlight.js
// XML formatter is loaded globally from lib/xml-formatter.js

// Get DOM elements
const codeContent = document.getElementById('code-content');
const codeContainer = document.getElementById('code-container');
const errorMessage = document.getElementById('error-message');
const formatType = document.getElementById('format-type');
const loading = document.getElementById('loading');

// Detect if content is JSON or XML
function detectFormat(text) {
  const trimmed = text.trim();

  // Check if it starts with JSON characters
  if ((trimmed.startsWith('{') && trimmed.endsWith('}')) ||
      (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
    return 'json';
  }

  // Check if it starts with XML declaration or tags
  if (trimmed.startsWith('<?xml') ||
      (trimmed.startsWith('<') && trimmed.includes('>'))) {
    return 'xml';
  }

  // Try to parse as JSON as fallback
  try {
    JSON.parse(trimmed);
    return 'json';
  } catch (e) {
    // If JSON parse fails, assume XML
    return 'xml';
  }
}

// Format JSON content
function formatJSON(text) {
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    throw new Error(`Invalid JSON: ${error.message}`);
  }
}

// Format XML content
function formatXML(text) {
  try {
    // xml-formatter is available as global `xmlFormatter`
    const formatted = xmlFormatter(text, {
      indentation: '  ',
      collapseContent: true,
      lineSeparator: '\n'
    });
    return formatted;
  } catch (error) {
    throw new Error(`Invalid XML: ${error.message}`);
  }
}

// Display error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
  loading.classList.add('hidden');
  codeContainer.classList.add('hidden');
}

// Display formatted content
function displayContent(content, format) {
  try {
    let formattedContent;
    let language;

    if (format === 'json') {
      formattedContent = formatJSON(content);
      language = 'json';
      formatType.textContent = 'JSON';
      formatType.className = 'format-badge json-badge';
    } else if (format === 'xml') {
      formattedContent = formatXML(content);
      language = 'xml';
      formatType.textContent = 'XML';
      formatType.className = 'format-badge xml-badge';
    }

    // Set content and language class for highlight.js
    codeContent.textContent = formattedContent;
    codeContent.className = `language-${language}`;

    // Apply syntax highlighting
    hljs.highlightElement(codeContent);

    // Show the code container and hide loading
    loading.classList.add('hidden');
    codeContainer.classList.remove('hidden');

  } catch (error) {
    showError(error.message);
  }
}

// Main function to load and display content
async function loadContent() {
  try {
    // Retrieve content from storage
    const result = await browser.storage.local.get(['formatterContent']);

    if (!result.formatterContent) {
      showError('No content found. Please select text and try again.');
      return;
    }

    const content = result.formatterContent;

    // Detect format
    const format = detectFormat(content);

    // Display formatted content
    displayContent(content, format);

    // Clear storage after loading
    browser.storage.local.remove('formatterContent');

  } catch (error) {
    showError(`Error loading content: ${error.message}`);
  }
}

// Load content when page loads
document.addEventListener('DOMContentLoaded', loadContent);
