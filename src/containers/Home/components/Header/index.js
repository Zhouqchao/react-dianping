import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";

class HomeHeader extends Component {
  render() {
    return (
      <div className="home-header">
        <header>
          <Link to="/" className="home-header__location">
            上海
          </Link>
          <Link to="/search" className="home-header__search">
            输入商户名、地点
          </Link>
          <Link to="/user" className="home-header__self">
            <div className="home-header__portrait"></div>
          </Link>
        </header>
      </div>
    );
  }
}

export default HomeHeader;
