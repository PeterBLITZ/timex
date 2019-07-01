import React from "react";

const REFRESH_INTERVAL = 1000;

class App extends React.Component {
  state = {
    activeHostname: "",
    timestamp: null
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
      this.setState({ activeHostname, timestamp });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const time = this.state.timestamp ? Date.now() - this.state.timestamp : 0;
    return (
      <div>
        <p>{this.state.activeHostname}</p>
        <p>{time}</p>
      </div>
    );
  }
}

export default App;
