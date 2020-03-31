import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  actions as loginActions,
  getUsername,
  getPassword,
  getLogged
} from "../../redux/modules/login";
import "./style.css";
import LoginForm from "./components/LoginForm";
import Header from "../../components/Header";

class Login extends Component {
  handleBack = () => {
    this.props.history.goBack();
  };
  handleInputChange = e => {
    const { setUsername, setPassword } = this.props.loginActions;

    const name = e.target.name;
    const value = e.target.value;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  render() {
    const { username, password, logged, loginActions, location } = this.props;
    const { login } = loginActions;
    const from = location.state || { from: { pathname: "/" } };

    if (logged) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login">
        <Header title="账号密码登录" onBack={this.handleBack} />
        <LoginForm
          username={username}
          password={password}
          handleInputChange={this.handleInputChange}
          login={login}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  username: getUsername(state),
  password: getPassword(state),
  logged: getLogged(state)
});

const mapDispatchToProps = dispatch => ({
  loginActions: bindActionCreators(loginActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
