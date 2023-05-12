# simple-chrome-extension-v3

There are 5 major components to building a Chrome extension

1. The manifest file

This is the ledger of a chrome extension. It is a JSON file that describes the behavior of a Chrome extension.

In here we define where our **background**, **pop-up**, and **options** components are located in our file directory.

Also, there are two ways of including the foreground script in a Chrome extension:

- through the manifest, and

- programmatically (which is used in this example).

A key function of the manifest file is defining what the Chrome extension is capable of doing. This gets handled in the permissions properties.

These permissions are APIs that let to do things like store data locally, read which urls the user is looking at.

Host permissions tell the browser which urls the Chrome extension is allowed to interact with.

2. The background script

This is a JavaScript file and serves as the mainframe or hub of Chrome extension. It acts like a back-end environment.

The background script is a JavaScript service worker.

All service workers go through a lifecycle. The first part of that cycle is the install function. This is where we set up the default state of our Chrome extension.

When the user first installs a Chrome extension, what are the default properties? We handle this in an **onInstalled** listener.

Because the background is a service worker, it's not persistent. So in order to save any sort of state, it is needed to store that state somewhere - locally or remotely.

Once the browser has determined that the user has stopped interacting with the background script for a certain amount of time, the background environment will de-activate until it's needed again. That's why to work with any data past de-activation storing it is required.

3. The pop-up page

This is an HTML page that is displayed when one clickes on the extension icon in the menu bar. It is a front-end of the extension.

4. The options page

This is an HTML page that is seen when right-clicked on the extension icon.

5. The foreground / content scripts

It is a JavaScript file.
