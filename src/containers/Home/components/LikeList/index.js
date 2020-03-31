import React, { Component } from "react";
import "./style.css";
import LikeItem from "../LikeItem";
import Loading from "../../../../components/Loading";

class LikeList extends Component {
  constructor(props) {
    super(props);
    this.likeListRef = React.createRef();
    this.removeListener = false;
  }
  componentDidMount() {
    document.addEventListener("scroll", this.handleScroll);

    if (this.props.pageCount === 0) {
      this.props.fetchData();
    }
  }
  componentWillUnmount() {
    if (!this.removeListener) {
      document.removeEventListener("scroll", this.handleScroll);
    }
  }
  componentDidUpdate() {
    if (this.props.pageCount >= 3 && !this.removeListener) {
      document.removeEventListener("scroll", this.handleScroll);
      this.removeListener = true;
    }
  }
  handleScroll = () => {
    // 获取屏幕可视区域高度
    const clientHeight = document.documentElement.clientHeight;
    // 获取元素内容的高度
    const likeListHeight = this.likeListRef.current.offsetHeight;
    // 获取元素顶部距离页面顶部的距离
    const offsetTop = this.likeListRef.current.offsetTop;
    // 获取页面滚动的距离
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const unseenHeight = likeListHeight + offsetTop - clientHeight;
    if (scrollTop >= unseenHeight && !this.props.isFetching) {
      this.props.fetchData();
    }
  };
  render() {
    const { data, pageCount } = this.props;

    return (
      <div className="like-list" ref={this.likeListRef}>
        <div className="like-list__header">猜你喜欢</div>
        <div className="like-list__content">
          {data.map(item => (
            <LikeItem key={item.id} data={item} />
          ))}
        </div>
        {pageCount < 3 ? (
          <Loading />
        ) : (
          <a href="#view-more" className="like-list__view-more">
            查看更多
          </a>
        )}
      </div>
    );
  }
}

export default LikeList;
