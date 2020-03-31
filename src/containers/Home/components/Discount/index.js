import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class Discount extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="discount">
        <div className="discount__header">
          <h3 className="discount__title">超值特惠</h3>
          <a href="#top" className="discount__more">
            <span>更多优惠</span>
            <span className="discount__arrow"></span>
          </a>
        </div>
        <ul className="discount__list">
          {data.map(({ picture, id, product, url, currentPrice, oldPrice }) => (
            <li key={id} className="discount__item">
              <Link to={`/detail/${id}`} className="discount__item-link">
                <img className="discount__img" src={picture} alt="" />
                <p className="discount__product">{product}</p>
                <div>
                  <span className="discount__current-price">
                    {currentPrice}
                  </span>
                  <span className="discount__old-price">{oldPrice}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Discount;
