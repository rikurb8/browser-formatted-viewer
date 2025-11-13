// Format XML content
// Requires xml-formatter library to be loaded globally as `xmlFormatter`
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
