import React, { Component } from "react";
import "./style.css";
import ProductPrice from "../../../../components/ProductPrice";
import BuyButton from "../../../../components/BuyButton";

class ProductOverview extends Component {
  render() {
    const {
      id,
      picture,
      product,
      description,
      currentPrice,
      oldPrice,
      advantages
    } = this.props.data;

    return (
      <div className="product-overview">
        <div className="product-overview__img-wrapper">
          <img className="product-overview__img" src={picture} alt={product} />
          <div className="product-overview__content">
            <h4 className="product-overview__title">{product}</h4>
            <p className="product-overview__description">{description}</p>
          </div>
        </div>
        <div className="product-overview__buy">
          <ProductPrice currentPrice={currentPrice} oldPrice={oldPrice} />
          <BuyButton className="product-overview__btn--buy" productId={id} />
        </div>
        <ul className="product-overview__advantages">
          <li>
            <i />
            <span>随时可退</span>
          </li>
          <li>
            <i />
            <span>过期自动退</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default ProductOverview;
