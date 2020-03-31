import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "./style.css";
import Header from "./components/Header";
import Keyword from "./components/Keyword";
import Banner from "../../components/Banner";
import ShopList from "./components/ShopList";
import {
  getSearchedShops,
  getCurrentKeyword
} from "../../redux/modules/search";

class SearchResult extends Component {
  goBack = () => {
    this.props.history.goBack();
  };
  render() {
    const { shops, keyword } = this.props;

    return (
      <div className="search-result">
        <Header goBack={this.goBack} />
        <Keyword data={keyword} />
        <Banner dark />
        <ShopList data={shops} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    shops: getSearchedShops(state),
    keyword: getCurrentKeyword(state)
  };
};

export default withRouter(connect(mapStateToProps, null)(SearchResult));
