import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style.css";
import ErrorToast from "../../components/ErrorToast";
import { actions as appActions, getError } from "../../redux/modules/app";
import Home from "../Home";
import ProductDetail from "../ProductDetail";
import Search from "../Search";
import SearchResult from "../SearchResult";

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
            <Route path="/detail/:id">
              <ProductDetail />
            </Route>
            <Route path="/">
              <Home />
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
