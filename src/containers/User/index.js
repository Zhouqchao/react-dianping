import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import UserHeader from "./components/UserHeader";
import UserMain from "./components/UserMain";
import Confirm from "../../components/Confirm";
import { bindActionCreators } from "redux";
import {
  getOrders,
  getIsFetching,
  getCurrentTab,
  getCurrentOrder,
  actions as userActions,
  getShowConfirm
} from "../../redux/modules/user";
import { actions as loginActions } from "../../redux/modules/login";

class User extends Component {
  handleBack = () => {
    this.props.history.push("/");
  };
  handleTabClick = tab => {
    this.props.userActions.setCurrentTab(tab);
  };
  componentDidMount() {
    this.props.userActions.getOrders();
  }
  handleCancel = () => {
    this.props.userActions.setShowConfirm(false);
  };
  handleConfirm = () => {
    const {
      currentOrder: { id }
    } = this.props;
    // 删除订单
    this.props.userActions.deleteOrder(id).then(() => {
      // 请求最新订单数据
      this.props.userActions.getOrders();
    });
    // 隐藏confirm
    this.props.userActions.setShowConfirm(false);
  };
  handleDeleteOrder = orderId => {
    this.props.userActions.setShowConfirm(true);
    this.props.userActions.setCurrentOrderId(orderId);
  };
  render() {
    const { currentTab, orders, isFetching, showConfirm } = this.props;
    const { logout } = this.props.loginActions;

    return (
      <div className="user">
        <UserHeader handleBack={this.handleBack} logout={logout} />
        <UserMain
          data={orders}
          currentTab={currentTab}
          isFetching={isFetching}
          handleTabClick={this.handleTabClick}
          deleteOrder={this.handleDeleteOrder}
        />
        {showConfirm && (
          <Confirm
            title="确认删除该订单吗?"
            handleCancel={this.handleCancel}
            handleConfirm={this.handleConfirm}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentTab: getCurrentTab(state),
  currentOrder: getCurrentOrder(state),
  orders: getOrders(state),
  isFetching: getIsFetching(state),
  showConfirm: getShowConfirm(state)
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
  loginActions: bindActionCreators(loginActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(User));
