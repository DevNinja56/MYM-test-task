let mainTabId = 0;
var window = window ?? self;

// On Extension Clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.storage.local.set({ mainTabId: tab.id }, () => {
    chrome.tabs.create({
      url: chrome.runtime.getURL("popup.html"),
      selected: true,
    });
  });
});

// On Extension Installed
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({
      url: chrome.runtime.getURL("popup.html"),
      selected: true,
    });
  } else if (details.reason === "update") {
    var thisVersion = chrome.runtime.getManifest().version;
    chrome.storage.local.set({
      version: thisVersion,
      previousVersion: details.previousVersion,
    });
  }
});
