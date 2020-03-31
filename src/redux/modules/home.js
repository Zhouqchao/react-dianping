import { get } from "../../utils/request";
import url from "../../utils/url";
import { schema as productSchema } from "../modules/entities/products";
import { combineReducers } from "redux";

export const params = {
  PATH_LIKES: "likes",
  PATH_DISCOUNTS: "discounts",
  PAGE_SIZE_LIKES: 3,
  PAGE_SIZE_DISCOUNTS: 3
};

// state
const initialState = {
  likes: {
    isFetching: false,
    pageCount: 0,
    ids: []
  },
  discounts: {
    isFetching: false,
    ids: []
  }
};

// actions
export const types = {
  // 获取猜你喜欢请求
  FETCH_LIKES_REQUEST: "HOME/FETCH_LIKES_REQUEST",
  // 获取猜你喜欢请求成功
  FETCH_LIKES_SUCCESS: "HOME/FETCH_LIKES_SUCCESS",
  // 获取猜你喜欢请求失败
  FETCH_LIKES_FAILURE: "HOME/FETCH_LIKES_FAILURE",
  // 获取超值特惠请求
  FETCH_DISCOUNTS_REQUEST: "HOME/FETCH_DISCOUNTS_REQUEST",
  // 获取超值特惠请求成功
  FETCH_DISCOUNTS_SUCCESS: "HOME/FETCH_DISCOUNTS_SUCCESS",
  // 获取超值特惠请求失败
  FETCH_DISCOUNTS_FAILURE: "HOME/FETCH_DISCOUNTS_FAILURE"
};

export const homeActions = {
  fetchLikes: () => {
    return (dispatch, getState) => {
      const currentPage = getState().home.likes.pageCount + 1;

      const action = {
        types: [
          types.FETCH_LIKES_REQUEST,
          types.FETCH_LIKES_SUCCESS,
          types.FETCH_LIKES_FAILURE
        ],
        shouldCallAPI: () => true,
        callAPI: () =>
          get(
            url.getProductList(
              params.PATH_LIKES,
              currentPage,
              params.PAGE_SIZE_LIKES
            )
          ),
        schema: productSchema
      };

      return dispatch(action);
    };
  },
  fetchDiscounts: () => {
    return (dispatch, getState) => {
      const action = {
        types: [
          types.FETCH_DISCOUNTS_REQUEST,
          types.FETCH_DISCOUNTS_SUCCESS,
          types.FETCH_DISCOUNTS_FAILURE
        ],
        shouldCallAPI: state => true,
        callAPI: () =>
          get(
            url.getProductList(
              params.PATH_DISCOUNTS,
              1,
              params.PAGE_SIZE_DISCOUNTS
            )
          ),
        schema: productSchema
      };

      return dispatch(action);
    };
  }
};

// reducers
const likesReducer = (state = initialState.likes, action) => {
  switch (action.type) {
    case types.FETCH_LIKES_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_LIKES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pageCount: state.pageCount + 1,
        ids: state.ids.concat(action.response.ids)
      };
    case types.FETCH_LIKES_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

const discountsReducer = (state = initialState.discounts, action) => {
  switch (action.type) {
    case types.FETCH_DISCOUNTS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_DISCOUNTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: action.response.ids
      };
    case types.FETCH_DISCOUNTS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};

export default combineReducers({
  likes: likesReducer,
  discounts: discountsReducer
});

// selectors
export const getLikes = state =>
  state.home.likes.ids.map(id => state.entities.products[id]);
export const getDiscounts = state =>
  state.home.discounts.ids.map(id => state.entities.products[id]);
export const getLikesPageCount = state => state.home.likes.pageCount;
export const getIsFetchingLikes = state => state.home.likes.isFetching;
