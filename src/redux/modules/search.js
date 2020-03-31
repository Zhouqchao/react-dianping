import { combineReducers } from "redux";
import { get } from "../../utils/request";
import url from "../../utils/url";
import { schema as keywordSchema } from "./entities/keywords";
import { schema as shopSchema } from "./entities/shops";

// state
const initialState = {
  text: "",
  histories: [],
  keywords: {
    isFetching: false,
    ids: []
  },
  // {
  //   "火锅": {
  //     isFetching: false,
  //       ids: []
  //   }
  // }
  searchedShopsByKeyword: {}
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
  FETCH_SEARCH_KEYWORDS_FAILURE: "SEARCH/FETCH_SEARCH_KEYWORDS_FAILURE",
  // 根据关键词查询店铺
  FETCH_SEARCHED_SHOPS_REQUEST: "FETCH_SEARCHED_SHOPS_REQUEST",
  FETCH_SEARCHED_SHOPS_SUCCESS: "FETCH_SEARCHED_SHOPS_SUCCESS",
  FETCH_SEARCHED_SHOPS_FAILURE: "FETCH_SEARCHED_SHOPS_FAILURE"
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
    schema: keywordSchema,
    callAPI: () => get(url.getSearchKeywords())
  }),
  // 获取根据关键词搜索的店铺
  fetchSearchedShops: keyword => {
    return {
      types: [
        types.FETCH_SEARCHED_SHOPS_REQUEST,
        types.FETCH_SEARCHED_SHOPS_SUCCESS,
        types.FETCH_SEARCHED_SHOPS_FAILURE
      ],
      schema: shopSchema,
      shouldCallAPI: state => !state.search.searchedShopsByKeyword[keyword],
      callAPI: () => get(url.getSearchedShops(keyword)),
      payload: { text: keyword }
    };
  }
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

const searchedShopsByKeywordReducer = (
  state = initialState.searchedShopsByKeyword,
  action
) => {
  switch (action.type) {
    case types.FETCH_SEARCHED_SHOPS_REQUEST:
    case types.FETCH_SEARCHED_SHOPS_SUCCESS:
    case types.FETCH_SEARCHED_SHOPS_FAILURE:
      return {
        ...state,
        [action.text]: searchedShopsReducer(state[action.text], action)
      };
    default:
      return state;
  }
};

const searchedShopsReducer = (
  state = { isFetching: false, ids: [] },
  action
) => {
  switch (action.type) {
    case types.FETCH_SEARCHED_SHOPS_REQUEST:
      return { ...state, isFetching: true };
    case types.FETCH_SEARCHED_SHOPS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: action.response.ids
      };
    case types.FETCH_SEARCHED_SHOPS_FAILURE:
      return { ...state, isFetching: false };
    default:
      return state;
  }
};

export default combineReducers({
  text: textReducer,
  histories: historiesReducer,
  keywords: keywordsReducer,
  searchedShopsByKeyword: searchedShopsByKeywordReducer
});

// selectors
export const getText = state => state.search.text;
export const getSearchHistories = state => state.search.histories;
export const getSearchKeywords = state =>
  state.search.keywords.ids.map(id => state.entities.keywords[id]);
export const getSearchedShops = state => {
  const currentSearched = state.search.histories[0];
  if (!currentSearched) {
    return [];
  }

  const searchedShopIds =
    state.search.searchedShopsByKeyword[currentSearched.text].ids;

  return searchedShopIds.map(id => state.entities.shops[id]);
};
export const getCurrentKeyword = state => {
  const keyword = state.search.histories[0];
  return keyword ? keyword.text : "";
};
