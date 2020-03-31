import React, { Component } from "react";
import "./style.css";
import RatingStar from "../../../../components/RatingStar";

class ShopItem extends Component {
  render() {
    const {
      url,
      pic,
      shop,
      star,
      price,
      quantity,
      region,
      category
    } = this.props.data;
    const score = ((star / 50) * 5).toFixed(2);

    return (
      <li className="shop-item">
        <a href={url} className="shop-item__link">
          <div
            className="shop-item__logo"
            style={{ backgroundImage: "url(" + pic + ")" }}
          ></div>
          <div className="shop-item__content">
            <div className="shop-item__detail">
              <h3 className="shop-item__name">{shop}</h3>
              <div className="shop-item__rating-wrapper">
                <div className="shop-item__rating">
                  <RatingStar score={star} />
                  <span className="shop-item__rating-score">{score}</span>
                </div>
                {quantity && (
                  <span className="shop-item__comment">{quantity}条</span>
                )}
                <span className="shop-item__consumption">{price}元/人</span>
              </div>
              <div className="shop-item__address-wrapper">
                <span className="shop-item__region">{region}</span>
                <span className="shop-item__category">{category}</span>
              </div>
            </div>
          </div>
        </a>
      </li>
    );
  }
}

export default ShopItem;
