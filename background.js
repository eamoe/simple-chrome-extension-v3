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
        // Inject content script using the "scripting" API
        // To insert CSS: chrome.scripting.insertCSS({...
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./foreground.js"]
        })
        .then(() => {
            console.log("INJECTED THE FOREGROUND SCRIPT.");
        })
        .catch(err => console.log(err));
    }
});