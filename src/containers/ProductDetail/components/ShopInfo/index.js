import React, { Component } from "react";
import "./style.css";

class ShopInfo extends Component {
  render() {
    const {
      url,
      shop: name,
      star: rating,
      distance = ">100km",
      phone,
      address,
      shopCount
    } = this.props.data;
    const ratingWidth = (rating / 50) * 100 + "%";

    return (
      <div className="shop-info">
        <div className="shop-info__header">
          <h5 className="shop-info__title">适用商户({shopCount})</h5>
          <span className="shop-info__more"></span>
        </div>
        <div className="shop-info__content">
          <a href={url} className="shop-info__link">
            <div className="shop-info__detail">
              <p className="shop-info__name">{name}</p>
              <div className="shop-info__rating">
                <i className="shop-info__stars">
                  <i
                    className="shop-info__stars--red"
                    style={{ width: ratingWidth }}
                  ></i>
                </i>
              </div>
              <span className="shop-info__distance">{distance}</span>
            </div>
            <a href={`tel:${phone}`} className="shop-info__phone">
              <i></i>
            </a>
          </a>
        </div>
        <div className="shop-info__address-wrapper">
          <i className="shop-info__address-icon"></i>
          <span className="shop-info__address">{address}</span>
        </div>
      </div>
    );
  }
}

export default ShopInfo;
