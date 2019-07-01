// Handle load, reload, etc.
function handleUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.status === "complete") {
    updateUrl(tabInfo.url);
  }
}

// Get current URL on tab activated
function handleActivated() {
  getActiveUrl();
}

// Window focus tracker
function handleFocusChanged(windowId) {
  // the browser window is blurred
  if (windowId < 0) {
    return stopCount();
  }

  getActiveUrl();
}

// Get active URL from current tab
async function getActiveUrl() {
  try {
    const data = await browser.tabs.query({
      active: true,
      currentWindow: true
    });

    if (data && data.length > 0 && data[0].url) {
      updateUrl(data[0].url);
    }
  } catch (error) {
    console.error(error);
  }
}

// TODO: stop count time
function stopCount() {
  console.log("Stop count");
}

const isAboutUrl = url => url.startsWith("about:");

// TODO: get hostname & filter duplicates
function updateUrl(url = "") {
  if (isAboutUrl(url)) {
    return stopCount();
  }

  console.log("URL", url);
}

// Add listeners

browser.tabs.onUpdated.addListener(handleUpdated);
browser.tabs.onActivated.addListener(handleActivated);
browser.windows.onFocusChanged.addListener(handleFocusChanged);
