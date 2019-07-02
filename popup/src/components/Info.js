import React from "react";

import infoSvg from "../assets/info.svg";

class Info extends React.PureComponent {
  render() {
    return (
      <div className="info">
        <img src={infoSvg} className="info-svg" alt="info" fill="gray" />
        <span className="hostname">{this.props.hostname}</span>
      </div>
    );
  }
}

export default Info;
