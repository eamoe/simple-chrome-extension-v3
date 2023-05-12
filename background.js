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
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./foreground_styles.css"]
        })
        
        .then(() => {
            console.log("INJECTED THE FOREGROUND STYLES.");

            chrome.scripting.executeScript({
                target: { tabId: tabId },
                files: ["./foreground.js"]
        })
        
        .then(() => {
                        console.log("INJECTED THE FOREGROUND SCRIPT.");
                    });
        })
        .catch(err => console.log(err));
    
    }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_name') {
        chrome.storage.local.get('name', data => {
            if (chrome.runtime.lastError) {
                sendResponse({
                    message: 'fail'
                });

                return;
            }

            sendResponse({
                message: 'success',
                payload: data.name
            });
        });

        return true;
    } else if (request.message === 'change_name') {
        chrome.storage.local.set({
            name: request.payload
        }, () => {
            if (chrome.runtime.lastError) {
                sendResponse({ message: 'fail' });
                return;
            }

            sendResponse({ message: 'success' });
        })

        return true;
    }
});