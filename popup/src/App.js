import React from "react";

const REFRESH_INTERVAL = 1000;

class App extends React.Component {
  state = {
    activeHostname: "",
    timestamp: null,
    timer: 0
  };

  componentDidMount() {
    this.getActiveInterval = setInterval(this._getActive, REFRESH_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.getActiveInterval);
  }

  _get = keys => global.browser.storage.local.get(keys);

  _getActive = async () => {
    try {
      const { activeHostname } = await this._get("activeHostname");
      const { timestamp } = await this._get("timestamp");

      const activeHostnameData = await this._get(activeHostname);

      if (activeHostnameData[activeHostname]) {
        const { time } = activeHostnameData[activeHostname];
        const timer = time + this._timestampToMilliseconds(timestamp);

        this.setState({ activeHostname, timestamp, timer });
      } else {
        this.setState({ activeHostname, timestamp });
      }
    } catch (error) {
      console.error(error);
    }
  };

  _timestampToMilliseconds = timestamp =>
    timestamp ? Date.now() - timestamp : 0;

  render() {
    const { timer, timestamp, activeHostname } = this.state;

    // use timestamp on first hostname load
    const renderMilliseconds = timer ? timer : this._timestampToMilliseconds(timestamp)

    return (
      <div>
        <p>{activeHostname}</p>
        <p>{renderMilliseconds}</p>
      </div>
    );
  }
}

export default App;
