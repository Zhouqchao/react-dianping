import React, { Component } from "react";
import "./style.css";

class Header extends Component {
  render() {
    const { className, title, onBack } = this.props;

    return (
      <div className="base-header">
        <span
          className={`base-header__back ${className}`}
          onClick={onBack}
        >
          返回
        </span>
        <h2 className="base-header__title">{title}</h2>
      </div>
    );
  }
}

export default Header;
