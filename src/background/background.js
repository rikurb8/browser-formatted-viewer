// Create context menu item when extension is installed
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "format-and-view",
    title: "Format and Open in New Tab",
    contexts: ["selection"]
  });
});

// Handle context menu clicks
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "format-and-view" && info.selectionText) {
    const selectedText = info.selectionText;

    // Store the text in browser storage for the viewer page to access
    // Using storage instead of URL to handle large content
    browser.storage.local.set({
      formatterContent: selectedText,
      timestamp: Date.now()
    }).then(() => {
      // Open viewer page in a new tab
      browser.tabs.create({
        url: browser.runtime.getURL("src/ui/viewer.html")
      });
    }).catch(error => {
      console.error("Error storing content:", error);
    });
  }
});
