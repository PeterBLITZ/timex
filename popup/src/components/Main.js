import React from "react";
import PropTypes from "prop-types";

import { humanizeDuration } from "../utils/duration";
import Info from "./Info";

class Main extends React.PureComponent {
  render() {
    const { hostname, milliseconds } = this.props;
    const duration = humanizeDuration(milliseconds);

    return (
      <div className="main">
        <div>{duration}</div>
        <Info hostname={hostname} />
      </div>
    );
  }
}

Main.defaultProps = {
  hostname: "",
  milliseconds: 0
};

Main.propTypes = {
  hostname: PropTypes.string,
  milliseconds: PropTypes.number
};

export default Main;
