import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./style.css";
import SearchBox from "./components/SearchBox";
import SearchKeywords from "./components/SearchKeywords";
import SearchHistory from "./components/SearchHistory";
import {
  actions as searchActions,
  getText,
  getSearchHistories,
  getSearchKeywords
} from "../../redux/modules/search";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Search extends Component {
  handleEnter = text => {
    const { addSearchHistory, fetchSearchedShops } = this.props.searchActions;

    addSearchHistory(text);
    fetchSearchedShops(text);
    this.props.history.push("/search_result");
  };
  handleClick = text => {
    const {
      setText,
      addSearchHistory,
      fetchSearchedShops
    } = this.props.searchActions;

    setText(text);
    addSearchHistory(text);
    fetchSearchedShops(text);
    this.props.history.push("/search_result");
  };
  clearSearchHistory = () => {
    const { clearText, clearSearchHistory } = this.props.searchActions;
    clearSearchHistory();
    clearText();
  };
  componentDidMount() {
    if (this.props.searchKeywords.length === 0) {
      this.props.searchActions.fetchSearchKeywords();
    }
  }
  render() {
    const { text, searchHistories, searchKeywords } = this.props;
    const { setText, clearText } = this.props.searchActions;

    return (
      <div className="search">
        <SearchBox
          text={text}
          setText={setText}
          clearText={clearText}
          handleEnter={this.handleEnter}
        />
        <SearchKeywords data={searchKeywords} handleClick={this.handleClick} />
        {searchHistories.length !== 0 && (
          <SearchHistory
            data={searchHistories}
            clearSearchHistory={this.clearSearchHistory}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  text: getText(state),
  searchHistories: getSearchHistories(state),
  searchKeywords: getSearchKeywords(state)
});

const mapDispatchToProps = dispatch => ({
  searchActions: bindActionCreators(searchActions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));
