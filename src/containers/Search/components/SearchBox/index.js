import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./style.css";

class SearchBox extends Component {
  constructor(props) {
    super(props);
  }
  handleInputChange = e => {
    const text = e.target.value.trim();
    this.props.setText(text);
  };
  handleCancel = () => {
    this.props.clearText();
    this.props.history.goBack();
  };
  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.props.handleEnter(this.props.text);
    }
  };
  render() {
    const { text, clearText } = this.props;

    return (
      <div className="search-box">
        <div className="search-box__container">
          <input
            className="search-box__input"
            type="text"
            value={text}
            placeholder="输入商户名、地点"
            onChange={this.handleInputChange}
            onKeyUp={this.handleKeyUp}
          />
          {text && (
            <i className="search-box__icon--clear" onClick={clearText}></i>
          )}
          <button
            className="search-box__btn--cancel"
            type="button"
            onClick={this.handleCancel}
          >
            取消
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchBox);
