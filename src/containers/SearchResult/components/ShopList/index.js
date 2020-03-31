import React, { Component } from "react";
import "./style.css";
import ShopItem from "../ShopItem";

class ShopList extends Component {
  render() {
    const shops = this.props.data;

    return (
      <div className="shop-list">
        <ul className="shop-list__header">
          <li className="shop-list__filter-item">全部商圈</li>
          <li className="shop-list__filter-item">全部分类</li>
          <li className="shop-list__filter-item">智能排序</li>
        </ul>
        <ul className="shop-list__content">
          {shops.map(shop => (
            <ShopItem data={shop} key={shop.id} />
          ))}
        </ul>
      </div>
    );
  }
}

export default ShopList;
