import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class LikeItem extends Component {
  render() {
    const {
      id,
      picture,
      tag,
      shop,
      product,
      currentPrice,
      oldPrice,
      saleDesc
    } = this.props.data;

    return (
      <Link to={`/detail/${id}`} className="like-item">
        <div className="like-item__img-wrapper">
          <img src={picture} alt="" className="like-item__img" />
          <span className="like-item__tag">{tag}</span>
        </div>
        <div className="like-item__content">
          <p className="like-item__shop">{shop}</p>
          <p className="like-item__product">{product}</p>
          <p className="like-item__price">
            <span className="like-item__current-price">{currentPrice}</span>
            <span className="like-item__old-price">{oldPrice}</span>
          </p>
          <span className="like-item__sale">{saleDesc}</span>
        </div>
      </Link>
    );
  }
}

export default LikeItem;
