chrome.webNavigation.onCompleted.addListener(function (details) {
  if (details.frameId === 0 && details.url.includes("172.22.2.6")) {
    chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: ["content.js"]
    });
  }
});
