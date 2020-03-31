import React, { Component } from "react";
import "./style.css";

class UserHeader extends Component {
  render() {
    const { handleBack, logout } = this.props;
    return (
      <div className="user-header__wrapper">
        <div className="user-header">
          <div className="user-header__back" onClick={handleBack}>
            首页
          </div>
          <div className="user-header__tabs">
            <div className="user-header__tab user-header__tab--selected">
              订单
            </div>
            <div className="user-header__tab">抵用券</div>
          </div>
          <span className="user-header__logout" onClick={logout}>
            注销
          </span>
        </div>
      </div>
    );
  }
}

export default UserHeader;
