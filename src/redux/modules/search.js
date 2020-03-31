import { combineReducers } from "redux";
import { get } from "../../utils/request";
import url from "../../utils/url";
import { schema } from "./entities/keywords";
import { schema as shopSchema } from "./entities/shops";

// state
const initialState = {
  text: "",
  histories: [],
  keywords: {
    isFetching: false,
    ids: []
  }
};

// actions
const types = {
  // 设置搜索文本
  SET_TEXT: "SEARCH/SET_TEXT",
  CLEAR_TEXT: "SEARCH/CLEAR_TEXT",
  // 添加搜索历史
  ADD_SEARCH_HISTORY: "SEARCH/ADD_SEARCH_HISTORY",
  // 清除搜索历史
  CLEAR_SEARCH_HISTORY: "SEARCH/CLEAR_SEARCH_HISTORY",
  // 获取搜索热门关键词
  FETCH_SEARCH_KEYWORDS_REQUEST: "SEARCH/FETCH_SEARCH_KEYWORDS_REQUEST",
  FETCH_SEARCH_KEYWORDS_SUCCESS: "SEARCH/FETCH_SEARCH_KEYWORDS_SUCCESS",
  FETCH_SEARCH_KEYWORDS_FAILURE: "SEARCH/FETCH_SEARCH_KEYWORDS_FAILURE"
};

export const actions = {
  setText: text => ({
    type: types.SET_TEXT,
    text
  }),
  clearText: () => ({
    type: types.CLEAR_TEXT
  }),
  // 添加搜索历史
  addSearchHistory: text => ({
    type: types.ADD_SEARCH_HISTORY,
    text
  }),
  // 清除搜索历史
  clearSearchHistory: () => ({
    type: types.CLEAR_SEARCH_HISTORY
  }),
  // 获取搜索热门关键词
  fetchSearchKeywords: () => ({
    types: [
      types.FETCH_SEARCH_KEYWORDS_REQUEST,
      types.FETCH_SEARCH_KEYWORDS_SUCCESS,
      types.FETCH_SEARCH_KEYWORDS_FAILURE
    ],
    schema,
    callAPI: () => get(url.getSearchKeywords())
  })
};

// reducers
const textReducer = (state = initialState.text, action) => {
  switch (action.type) {
    case types.SET_TEXT:
      return action.text;
    case types.CLEAR_TEXT:
      return "";
    default:
      return state;
  }
};

const historiesReducer = (state = initialState.histories, action) => {
  switch (action.type) {
    case types.ADD_SEARCH_HISTORY:
      // 过滤出与新增的文字不相同的搜索记录
      const histories = state.filter(item => item.text !== action.text);

      return [{ text: action.text, time: Date.now() }, ...histories];
    case types.CLEAR_SEARCH_HISTORY:
      return [];
    default:
      return state;
  }
};

const keywordsReducer = (state = initialState.keywords, action) => {
  switch (action.type) {
    case types.FETCH_SEARCH_KEYWORDS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_SEARCH_KEYWORDS_SUCCESS:
      return { ...state, isFetching: false, ids: [...action.response.ids] };
    case types.FETCH_SEARCH_KEYWORDS_FAILURE:
      return { ...state, isFetching: false, ids: [] };
    default:
      return state;
  }
};

export default combineReducers({
  text: textReducer,
  histories: historiesReducer,
  keywords: keywordsReducer
});

// selectors
export const getText = state => state.search.text;
export const getSearchHistories = state => state.search.histories;
export const getSearchKeywords = state =>
  state.search.keywords.ids.map(id => state.entities.keywords[id]);
