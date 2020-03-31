import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getLogged } from "../../redux/modules/login";

class PrivateRoute extends Component {
  render() {
    const { children, logged, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={({ location }) =>
          logged ? (
            children
          ) : (
            <Redirect to={{ pathname: "/login", state: { from: location } }} />
          )
        }
      ></Route>
    );
  }
}

const mapStateToProps = state => ({
  logged: getLogged(state)
});

export default connect(mapStateToProps, null)(PrivateRoute);
