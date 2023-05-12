chrome.runtime.onInstalled.addListener(() => {
    // default state goes here
    // this runs ONE TIME ONLY (unless the user reinstalls your extension)
    chrome.storage.local.set({
        name: "Jack"
    });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Check if the web page is fully loaded and it is the actual web page (http)
    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    }
});