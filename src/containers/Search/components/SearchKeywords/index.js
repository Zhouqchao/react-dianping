import React, { Component } from "react";
import "./style.css";

class SearchKeywords extends Component {
  render() {
    const searchKeywords = this.props.data;
    const { handleClick } = this.props;
    return (
      <div className="search-keywords">
        <ul className="search-keywords__list">
          {searchKeywords.map(word => (
            <li
              className="search-keywords__item"
              key={word.id}
              onClick={() => handleClick(word.keyword)}
            >
              {word.keyword}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SearchKeywords;
