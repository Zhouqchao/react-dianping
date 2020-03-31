import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./style.css";
import ErrorToast from "../../components/ErrorToast";
import { actions as appActions, getError } from "../../redux/modules/app";

class App extends React.Component {
  render() {
    const {
      error,
      appActions: { clearError }
    } = this.props;

    return (
      <div className="App">
        React仿大众点评
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
