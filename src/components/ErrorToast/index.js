import React, { Component } from "react";
import "./style.css";

class ErrorToast extends Component {
  render() {
    const { msg } = this.props;
    return (
      <div className="error-toast">
        <div className="error-toast__text">{msg}</div>
      </div>
    );
  }
  componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.clearError();
    }, 3000);
  }
  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
}

export default ErrorToast;
