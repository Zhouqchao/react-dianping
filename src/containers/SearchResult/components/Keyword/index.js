import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class Keyword extends Component {
  render() {
    const currentKeyword = this.props.data;
    return (
      <div className="keyword">
        <Link to="/search">{currentKeyword}</Link>
      </div>
    );
  }
}

export default Keyword;
