import React, { useEffect } from "react";

function IndexPopup() {
  useEffect(() => {
    try {
      // Open the tab page
      chrome.tabs
        .create({
          url: chrome.runtime.getURL("tabs/tab-index.html"),
        })
        .catch((error) => {
          console.error("Failed to open tab:", error);
        });
      // Close the popup
      window.close();
    } catch (error) {
      console.error("Error in popup:", error);
    }
  }, []);

  // Return empty div instead of null for better React practices
  return <div />;
}

export default IndexPopup;
