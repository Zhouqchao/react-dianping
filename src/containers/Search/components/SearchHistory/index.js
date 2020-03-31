import React, { Component } from "react";
import "./style.css";

class SearchHistory extends Component {
  render() {
    const searchHistories = this.props.data;
    const { clearSearchHistory } = this.props;

    return (
      <div className="search-history">
        <h3 className="search-history__title">搜索记录</h3>
        <ul className="search-history__list">
          {searchHistories.map((item, index) => (
            <li className="search-history__item" key={index}>
              {item.text}
            </li>
          ))}
        </ul>
        <p className="search-history__btn--clear" onClick={clearSearchHistory}>
          清除搜索记录
        </p>
      </div>
    );
  }
}

export default SearchHistory;
