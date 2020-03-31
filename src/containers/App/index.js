import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { actions as appActions, getError } from "../../redux/modules/app";
import "./style.css";
import ErrorToast from "../../components/ErrorToast";
import PrivateRoute from "../../components/PrivateRoute";
import AsyncComponent from "../../components/AsyncComponent";

const Home = AsyncComponent(() => import("../Home"));
const ProductDetail = AsyncComponent(() => import("../ProductDetail"));
const Search = AsyncComponent(() => import("../Search"));
const SearchResult = AsyncComponent(() => import("../SearchResult"));
const Login = AsyncComponent(() => import("../Login"));
const User = AsyncComponent(() => import("../User"));
const Purchase = AsyncComponent(() => import("../Purchase"));

class App extends React.Component {
  render() {
    const {
      error,
      appActions: { clearError }
    } = this.props;

    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/search_result">
              <SearchResult />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <PrivateRoute path="/purchase/:id">
              <Purchase />
            </PrivateRoute>
            <Route path="/detail/:id">
              <ProductDetail />
            </Route>
            <PrivateRoute path="/user">
              <User />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
        {error && <ErrorToast msg={error} clearError={clearError} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: getError(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    appActions: bindActionCreators(appActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
