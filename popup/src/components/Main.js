import React from "react";
import PropTypes from "prop-types";

import { humanizeDuration } from "../utils/duration";

class Main extends React.PureComponent {
  render() {
    const { hostname, milliseconds } = this.props;
    const duration = humanizeDuration(milliseconds);

    return (
      <div>
        <div>{duration}</div>
        <div>{hostname}</div>
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
