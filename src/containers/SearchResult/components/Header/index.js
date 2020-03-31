import React, { Component } from "react";
import "./style.css";

class Header extends Component {
  render() {
    const { goBack } = this.props;

    return (
      <div className="header">
        <div className="header__arrow--left" onClick={goBack}></div>
        <div className="header__tabs">
          <span className="header__tab header__tab--selected">商户</span>
          <span className="header__tab">闪惠团购</span>
        </div>
        <div className="header__icon--search" onClick={goBack}></div>
      </div>
    );
  }
}

export default Header;
