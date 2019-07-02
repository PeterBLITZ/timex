import React from "react";
import PropTypes from "prop-types";

class Main extends React.PureComponent {
  render() {
    const { hostname, milliseconds } = this.props;
    return (
      <div>
        <p>{milliseconds}</p>
        <p>{hostname}</p>
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
