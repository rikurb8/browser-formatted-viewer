// Format JSON content
function formatJSON(text) {
  try {
    const parsed = JSON.parse(text);
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    throw new Error(`Invalid JSON: ${error.message}`);
  }
}
