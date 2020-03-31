import React, { Component } from "react";
import "./style.css";

class Tip extends Component {
  render() {
    const { msg, handleConfirm } = this.props;
    return (
      <div className="tip">
        <div className="tip__box">
          <div className="tip__msg">{msg}</div>
          <div className="tip__btns">
            <button
              type="button"
              className="tip__btn tip__btn--confirm"
              onClick={handleConfirm}
            >
              确定
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Tip;
