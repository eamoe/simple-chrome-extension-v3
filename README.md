# simple-chrome-extension-v3

There are 5 major components to building a Chrome extension

## 1. The manifest file

This is the ledger of a chrome extension. It is a JSON file that describes the behavior of a Chrome extension.

In here we define where our **background**, **pop-up**, and **options** components are located in our file directory.

Also, there are two ways of including the foreground script in a Chrome extension:

- through the manifest, and

- programmatically (which is used in this example).

A key function of the manifest file is defining what the Chrome extension is capable of doing. This gets handled in the permissions properties.

These permissions are APIs that let to do things like store data locally, read which urls the user is looking at.

Host permissions tell the browser which urls the Chrome extension is allowed to interact with.

## 2. The background script

This is a JavaScript file and serves as the mainframe or hub of Chrome extension. It acts like a back-end environment.

The background script is a JavaScript service worker.

All service workers go through a lifecycle. The first part of that cycle is the install function. This is where we set up the default state of our Chrome extension.

When the user first installs a Chrome extension, what are the default properties? We handle this in an **onInstalled** listener.

Because the background is a service worker, it's not persistent. So in order to save any sort of state, it is needed to store that state somewhere - locally or remotely.

Once the browser has determined that the user has stopped interacting with the background script for a certain amount of time, the background environment will de-activate until it's needed again. That's why to work with any data past de-activation storing it is required.

## 3. The pop-up page

This is an HTML page that is displayed when one clickes on the extension icon in the menu bar. It is a front-end of the extension.

The pop-up page behaves exactly like any index.html page with one major difference: it is not allowed to write in-line JavaScript in this file; only attach a script. However, it is possible to write in-line CSS styles (or choose to attach a stylesheet).

## 4. The options page

This is an HTML page that is seen when right-clicked on the extension icon.

The comment about in-line JavaScript & CSS is also applied here.

## 5. The content script

It is a JavaScript file that is called a content script because it gets embedded into the tab(s) the user is viewing. Think of it like this:

We can monitor all of the tabs the user is viewing. When they go to a site of our choosing, we can inject our content script into that website giving us the ability to control the DOM of that site.

To get our content script to actually embed into the users tab(s) we need to first monitor their browsing experience with the **tabs** API. We do this monitoring in the backround script with **onUpdated** listener.

## Components' Communication

There are two primary ways of sending message back and forth in a Chrome extension:

### 1. chrome.runtime.sendMessage()

To send a message from the *background*, *options*, *pop-up*, or *content* components to the *background*, *options*, or *pop-up* components, use the **RUNTIME** version of **sendMessage()**:

```js
chrome.runtime.sendMessage("message", function (response));
```

### 2. chrome.runtime.sendMessage()

To send a message from the *background*, *options*, or *pop-up* components to the *content* component we use the **TABS** version of **sendMessage()**:

```js
chrome.tabs.sendMessage(tabId, "message", function (response));
```
