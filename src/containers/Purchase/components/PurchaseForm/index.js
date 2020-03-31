import React, { Component } from "react";
import "./style.css";

class PurchaseForm extends Component {
  handleOrderSubtract = () => {
    const { quantity, setOrderQuantity } = this.props;
    if (quantity <= 1) {
      setOrderQuantity(1);
    } else {
      setOrderQuantity(quantity - 1);
    }
  };
  handleOrderAdd = () => {
    const { quantity, setOrderQuantity } = this.props;
    setOrderQuantity(quantity + 1);
  };
  handleInputChange = e => {
    const value = parseInt(e.target.value);
    const { setOrderQuantity } = this.props;

    if (value <= 1) {
      setOrderQuantity(1);
    } else {
      setOrderQuantity(value);
    }
  };
  render() {
    const {
      detail: { products },
      quantity,
      totalPrice,
      phone,
      handleOrderSubmit
    } = this.props;

    return (
      <div className="purchase-form">
        <ul className="purchase-form__products">
          {products.map(({ name, quantity }, index) => (
            <li key={index} className="purchase-form__product">
              <span className="purchase-form__product-name">{name}</span>
              <span className="purchase-form__product-quantity">
                x{parseInt(quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="purchase-form__group">
          <div className="purchase-form__item">
            <label htmlFor="" className="purchase-form__label">
              数量
            </label>
            <div className="purchase-form__value purchase-form__input-wrapper">
              <span
                className="purchase-form__btn--subtract"
                onClick={this.handleOrderSubtract}
              >
                -
              </span>
              <input
                type="number"
                value={quantity}
                className="purchase-form__input"
                onChange={this.handleInputChange}
              />
              <span
                className="purchase-form__btn--add"
                onClick={this.handleOrderAdd}
              >
                +
              </span>
            </div>
          </div>
          <div className="purchase-form__item">
            <span className="purchase-form__label">小计</span>
            <span className="purchase-form__value purchase-form__price">
              ¥{totalPrice}
            </span>
          </div>
          <div className="purchase-form__item">
            <label htmlFor="" className="purchase-form__label">
              手机号码
            </label>
            <span className="purchase-form__value purchase-form__phone">
              {phone}
            </span>
          </div>
        </div>
        <ul className="purchase-form__advantages">
          <li className="purchase-form__advantage">
            <i className="purchase-form__icon"></i>
            <span>支持随时退</span>
          </li>
          <li className="purchase-form__advantage">
            <i className="purchase-form__icon"></i>
            <span>支持过期退</span>
          </li>
        </ul>
        <span className="purchase-form__submit" onClick={handleOrderSubmit}>
          提交订单
        </span>
      </div>
    );
  }
}

export default PurchaseForm;
