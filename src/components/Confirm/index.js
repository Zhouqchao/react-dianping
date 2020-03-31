import React, { Component } from "react";
import "./style.css";

class Confirm extends Component {
  render() {
    const { title, handleCancel, handleConfirm } = this.props;
    return (
      <div className="confirm">
        <div className="confirm__box">
          <div className="confirm__title">{title}</div>
          <div className="confirm__btns">
            <button
              type="button"
              className="confirm__btn confirm__btn--cancel"
              onClick={handleCancel}
            >
              取消
            </button>
            <button
              type="button"
              className="confirm__btn confirm__btn--confirm"
              onClick={handleConfirm}
            >
              确认
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;
