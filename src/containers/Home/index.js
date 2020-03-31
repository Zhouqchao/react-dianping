import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Header from "./components/Header";
import Banner from "../../components/Banner";
import Category from "./components/Category";
import Headline from "./components/Headline";
import Activity from "./components/Activity";
import Discount from "./components/Discount";
import LikeList from "./components/LikeList";
import Footer from "../../components/Footer";
import {
  homeActions,
  getLikes,
  getDiscounts,
  getLikesPageCount,
  getIsFetchingLikes
} from "../../redux/modules/home";

class Home extends Component {
  componentDidMount() {
    this.props.homeActions.fetchDiscounts();
  }
  render() {
    const {
      likes,
      discounts,
      pageCount,
      isFetchingLikes,
      homeActions: { fetchLikes }
    } = this.props;

    return (
      <div className="home">
        <Header />
        <Banner />
        <Category />
        <Headline />
        <Activity />
        <Discount data={discounts} />
        <LikeList
          data={likes}
          pageCount={pageCount}
          isFetching={isFetchingLikes}
          fetchData={fetchLikes}
        />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  likes: getLikes(state),
  discounts: getDiscounts(state),
  pageCount: getLikesPageCount(state),
  isFetchingLikes: getIsFetchingLikes(state)
});

const mapDispatchToProps = dispatch => {
  return {
    homeActions: bindActionCreators(homeActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
