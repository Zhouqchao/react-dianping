import { get } from "../../utils/request";
import url from "../../utils/url";
import { combineReducers } from "redux";
import { schema as shopSchema, getShopById } from "./entities/shops";
import { schema as productSchema, getProductDetail } from "./entities/products";

// state
const initialState = {
  product: {
    isFetching: false,
    id: null
  },
  relatedShop: {
    isFetching: false,
    id: null
  }
};

// actions
const types = {
  // 获取产品详情
  FETCH_PRODUCT_REQUEST: "DETAIL/FETCH_PRODUCT_REQUEST",
  FETCH_PRODUCT_SUCCESS: "DETAIL/FETCH_PRODUCT_SUCCESS",
  FETCH_PRODUCT_ERROR: "DETAIL/FETCH_PRODUCT_ERROR",
  // 获取附近店铺
  FETCH_SHOP_REQUEST: "DETAIL/FETCH_SHOP_REQUEST",
  FETCH_SHOP_SUCCESS: "DETAIL/FETCH_SHOP_SUCCESS",
  FETCH_SHOP_ERROR: "DETAIL/FETCH_SHOP_ERROR"
};

export const actions = {
  // 获取产品详情
  fetchProduct: id => ({
    types: [
      types.FETCH_PRODUCT_REQUEST,
      types.FETCH_PRODUCT_SUCCESS,
      types.FETCH_PRODUCT_ERROR
    ],
    callAPI: () => get(url.getProductDetail(id)),
    schema: productSchema
  }),
  // 获取附近店铺
  fetchShopById: id => ({
    types: [
      types.FETCH_SHOP_REQUEST,
      types.FETCH_SHOP_SUCCESS,
      types.FETCH_SHOP_ERROR
    ],
    callAPI: () => get(url.getShop(id)),
    schema: shopSchema
  })
};

// reducers
const productReducer = (state = initialState.product, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCT_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_PRODUCT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        id: action.id
      };
    case types.FETCH_PRODUCT_ERROR:
      return {
        ...state,
        isFetching: false,
        id: null
      };
    default:
      return state;
  }
};

const relatedShopReducer = (state = initialState.relatedShop, action) => {
  switch (action.type) {
    case types.FETCH_SHOP_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_SHOP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        id: action.id
      };
    case types.FETCH_SHOP_ERROR:
      return {
        ...state,
        isFetching: false,
        id: null
      };
    default:
      return state;
  }
};

// selectors
export const getProduct = (state, id) => getProductDetail(state, id);

export const getRelatedShop = (state, productId) => {
  const product = state.entities.products[productId];
  const shopId = product ? product.nearestShop : null;
  if (shopId) {
    return getShopById(state, shopId);
  }

  return null;
};

export default combineReducers({
  product: productReducer,
  relatedShop: relatedShopReducer
});
