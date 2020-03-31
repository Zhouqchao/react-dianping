import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "../../components/Header";
import PurchaseForm from "./components/PurchaseForm";
import Tip from "../../components/Tip";
import {
  getOrderQuantity,
  getIsShowTip,
  getTotalPrice,
  getProduct,
  actions as purchaseActions
} from "../../redux/modules/purchase";
import { getUsername } from "../../redux/modules/login";
import { actions as detailActions } from "../../redux/modules/detail";

class Purchase extends Component {
  handleBack = () => {
    this.props.history.goBack();
  };
  handleConfirm = () => {
    const { hideTip } = this.props.purchaseActions;
    hideTip();
    this.props.history.push("/user");
  };
  handleOrderSubmit = () => {
    const { submitOrder } = this.props.purchaseActions;
    const productId = this.props.match.params.id;
    submitOrder(productId);
  };
  componentDidMount() {
    const { product } = this.props;
    if (!product) {
      this.props.detailActions.fetchProduct(this.props.match.params.id);
    }
  }
  componentWillUnmount() {
    this.props.purchaseActions.setOrderQuantity(1);
  }
  render() {
    const { product, quantity, isShowTip, totalPrice, phone } = this.props;
    const { setOrderQuantity } = this.props.purchaseActions;
    return (
      <div className="purchase">
        <Header title="下单" onBack={this.handleBack} />
        {product && (
          <PurchaseForm
            detail={product.detail}
            quantity={quantity}
            totalPrice={totalPrice}
            phone={phone}
            setOrderQuantity={setOrderQuantity}
            handleOrderSubmit={this.handleOrderSubmit}
          />
        )}
        {isShowTip && <Tip msg="购买成功" handleConfirm={this.handleConfirm} />}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  quantity: getOrderQuantity(state),
  isShowTip: getIsShowTip(state),
  totalPrice: getTotalPrice(state, props.match.params.id),
  product: getProduct(state, props.match.params.id),
  phone: getUsername(state)
});

const mapDispatchToProps = dispatch => ({
  purchaseActions: bindActionCreators(purchaseActions, dispatch),
  detailActions: bindActionCreators(detailActions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Purchase)
);
