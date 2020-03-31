import React, { Component } from "react";
import "./style.css";

class ProductPrice extends Component {
  render() {
    const { currentPrice, oldPrice } = this.props;

    return (
      <div className="product-price">
        <span className="product__current-price">{currentPrice}</span>
        <span className="product__old-price">{oldPrice}</span>
      </div>
    );
  }
}

export default ProductPrice;
