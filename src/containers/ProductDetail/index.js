import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./style.css";
import ProductOverview from "./components/ProductOverview";
import ShopInfo from "./components/ShopInfo";
import GroupBuyDetail from "./components/GroupBuyDetail";
import PurchaseNotes from "./components/PurchaseNotes";
import Header from "../../components/Header";
import BuyButton from "../../components/BuyButton";
import {
  getProduct,
  getRelatedShop,
  actions
} from "../../redux/modules/detail";
import { bindActionCreators } from "redux";

class ProductDetail extends Component {
  handleBack = e => {
    e.preventDefault();
  };
  componentDidMount() {
    const { product, relatedShop } = this.props;
    const { id } = this.props.match.params;

    if (!product) {
      this.props.detailActions.fetchProduct(id);
    } else if (!relatedShop) {
      this.props.detailActions.fetchShopById(product.nearestShop);
    }
  }
  componentDidUpdate(preProps) {
    const { product } = this.props;
    // 第一次获取到产品详情时，需要继续获取关联的店铺信息
    if (!preProps.product && this.props.product) {
      this.props.detailActions.fetchShopById(product.nearestShop);
    }
  }
  handleBack = () => {
    this.props.history.goBack();
  };
  render() {
    const { product, relatedShop } = this.props;
    const shopCount = product ? product.shopIds.length : 0;

    return (
      <div className="product-detail">
        <Header className="gray" title="团购详情" onBack={this.handleBack} />
        {product && <ProductOverview data={product} />}
        {relatedShop && <ShopInfo data={{ ...relatedShop, shopCount }} />}
        {product && (
          <React.Fragment>
            <GroupBuyDetail data={product} />
            <PurchaseNotes data={product} />
            <BuyButton
              productId={product.id}
              className="product-detail__buy-button"
            />
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { id: productId } = props.match.params;
  return {
    product: getProduct(state, productId),
    relatedShop: getRelatedShop(state, productId)
  };
};

const mapDispatchToProps = dispatch => ({
  detailActions: bindActionCreators(actions, dispatch)
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
);
