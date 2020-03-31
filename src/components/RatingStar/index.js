import React, { Component } from "react";
import "./style.css";

class RatingStar extends Component {
  render() {
    const { score, children } = this.props;
    const width = (score / 50) * 100 + "%";

    return (
      <div className="rating">
        <i className="rating__stars">
          <i className="rating__stars--red" style={{ width }}></i>
        </i>
      </div>
    );
  }
}

export default RatingStar;
