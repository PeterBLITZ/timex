// Handle listeners
class Timex {
  constructor(hostnameTime) {
    this.hostnameTime = hostnameTime;
    this.handleUpdated = this.handleUpdated.bind(this);
    this.handleActivated = this.handleActivated.bind(this);
    this.handleFocusChanged = this.handleFocusChanged.bind(this);
  }

  // Get and update active URL from current tab
  async _updateUrlAsync() {
    try {
      const data = await browser.tabs.query({
        active: true,
        currentWindow: true
      });

      if (data && data.length > 0 && data[0].url) {
        this.hostnameTime.update(data[0].url);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Handle load, reload, etc.
  handleUpdated(tabId, changeInfo, tabInfo) {
    if (changeInfo.status === "complete") {
      this.hostnameTime.update(tabInfo.url);
    }
  }

  // Get current URL on tab activated
  handleActivated() {
    this._updateUrlAsync();
  }

  // Window focus tracker
  handleFocusChanged(windowId) {
    // the browser window is blurred
    if (windowId < 0) {
      this.hostnameTime.stopCount();
      return;
    }

    this._updateUrlAsync();
  }
}

// Calculate time
class HostnameTime {
  constructor() {
    this.activeHostname = null;
    this.timestamp = null;
  }

  _isAboutUrl(url) {
    return url.startsWith("about:");
  }

  _getHostnameFromUrl(url) {
    return new URL(url).hostname;
  }

  _calcTime() {
    if (this.activeHostname === null) {
      return;
    }

    const prevMilliseconds = Date.now() - this.timestamp;
    const prevHostname = this.activeHostname;

    console.log("prev time", prevMilliseconds, prevHostname);
  }

  _updateActive() {
    console.log("activeHostname:", this.activeHostname, "timestamp:", this.timestamp);
  }

  stopCount() {
    this._calcTime();

    this.activeHostname = null;
    this.timestamp = Date.now();

    this._updateActive();
  }

  update(url = "") {
    if (!url || this._isAboutUrl(url)) {
      this.stopCount();
      return;
    }

    const hostname = this._getHostnameFromUrl(url);

    if (hostname !== this.activeHostname) {
      this._calcTime();

      this.activeHostname = hostname;
      this.timestamp = Date.now();

      this._updateActive();
    }
  }
}

const hostnameTime = new HostnameTime();
const timex = new Timex(hostnameTime);

// Add listeners
browser.tabs.onUpdated.addListener(timex.handleUpdated);
browser.tabs.onActivated.addListener(timex.handleActivated);
browser.windows.onFocusChanged.addListener(timex.handleFocusChanged);
