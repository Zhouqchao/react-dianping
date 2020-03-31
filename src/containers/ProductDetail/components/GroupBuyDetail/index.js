import React, { Component } from "react";
import "./style.css";

const dataSource = {
  title: "鸡腿",
  product: {
    name: "新品鸡腿",
    count: 1,
    oldPrice: 6,
    currentPrice: 3.99
  },
  remark: "免费提供餐巾纸"
};

class GroupBuyDetail extends Component {
  render() {
    const {
      detail: { category, products, remark },
      oldPrice,
      currentPrice
    } = this.props.data;

    return (
      <div className="buy-detail">
        <div className="buy-detail__header">
          <span className="buy-detail__title">团购详情</span>
          <i className="buy-detail__title-icon"></i>
        </div>
        <div className="buy-detail__content">
          <table className="buy-detail__table">
            <thead>
              <tr>
                <th colSpan="3">{category}</th>
              </tr>
            </thead>
            <tbody>
              {products.map(({ name, quantity, price }, index) => (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{quantity}</td>
                  <td>{price}</td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td>最高价值</td>
                <td>{oldPrice}元</td>
              </tr>
              <tr>
                <td></td>
                <td>团购价</td>
                <td>{currentPrice}元</td>
              </tr>
            </tbody>
          </table>
          <p className="buy-detail__remark">{remark}</p>
          <div className="buy-detail__more">
            <span>更多图文详情</span>
            <span className="buy-detail__notice">
              （建议Wifi环境下打开,土豪请随意）
            </span>
            <i className="buy-detail__arrow"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default GroupBuyDetail;
