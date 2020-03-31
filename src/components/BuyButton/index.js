import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class BuyButton extends Component {
  render() {
    const { className, productId } = this.props;
    return (
      <Link to={`/purchase/${productId}`} className={`buy-button ${className}`}>
        立即购买
      </Link>
    );
  }
}

export default BuyButton;
