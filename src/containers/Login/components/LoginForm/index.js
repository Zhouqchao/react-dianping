import React, { Component } from "react";
import "./style.css";

class LoginForm extends Component {
  render() {
    const { username, password, handleInputChange, login } = this.props;

    return (
      <div className="login-form">
        <div className="login-form__item">
          <label
            htmlFor=""
            className="login-form__label login-form__label--phone"
          >
            86
          </label>
          <input
            type="number"
            className="login-form__input login-form__phone"
            placeholder="手机号"
            name="username"
            value={username}
            onChange={handleInputChange}
          />
        </div>
        <div className="login-form__item">
          <label htmlFor="" className="login-form__label">
            密码
          </label>
          <input
            type="password"
            name="password"
            className="login-form__input"
            placeholder="密码"
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <button type="button" className="login-form__submit" onClick={login}>
          登录
        </button>
      </div>
    );
  }
}

export default LoginForm;
