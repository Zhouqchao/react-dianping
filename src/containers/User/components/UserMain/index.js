import React, { Component } from "react";
import "./style.css";
import OrderItem from "../OrderItem";
import Loading from "../../../../components/Loading";

const tabTitles = ["全部订单", "代付款", "可使用", "退款/售后"];

class UserMain extends Component {
  constructor(props) {
    super(props);
  }
  renderOrderList = data => {
    return data.map(item => (
      <OrderItem
        key={item.id}
        data={item}
        orders={data}
        deleteOrder={this.props.deleteOrder}
      ></OrderItem>
    ));
  };
  renderEmpty = () => {
    return (
      <div className="user-main__empty">
        <i className="user-main__icon--empty"></i>
        <div className="user-main__text">
          <p className="user-main__text--1">您还没有相关订单</p>
          <p className="user-main__text--2">去逛逛看还有哪些想买的</p>
        </div>
      </div>
    );
  };
  render() {
    const {
      currentTab,
      setCurrentTab,
      data,
      handleTabClick,
      isFetching
    } = this.props;

    return (
      <div className="user-main">
        <div className="user-main__menu">
          {tabTitles.map((title, index) => (
            <div
              key={index}
              className="user-main__tab"
              onClick={() => handleTabClick(index)}
            >
              <span
                className={
                  currentTab === index
                    ? "user-main__title user-main__title--active"
                    : "user-main__title"
                }
              >
                {title}
              </span>
            </div>
          ))}
        </div>
        <div className="user-main__content">
          {isFetching ? (
            <Loading />
          ) : data && data.length > 0 ? (
            this.renderOrderList(data)
          ) : (
            this.renderEmpty()
          )}
        </div>
      </div>
    );
  }
}

export default UserMain;
