import { createSelector } from "reselect";
import { getProductDetail } from "../modules/entities/products";
import { ORDER_TYPES } from "../modules/entities/orders";
import { post } from "../../utils/request";
import url from "../../utils/url";
// state
const initialState = {
  // 订单购买数量
  quantity: 1,
  // 是否显示提示框
  isShowTip: false,
  isLoading: false
};

// actions
const types = {
  SET_ORDER_QUANTITY: "PURCHASE/SET_ORDER_QUANTITY",
  SHOW_TIP: "PURCHASE/SHOW_TIP",
  HIDE_TIP: "PURCHASE/HIDE_TIP",
  // 提交订单
  SUBMIT_ORDER_REQUEST: "PURCHASE/SUBMIT_ORDER_REQUEST",
  SUBMIT_ORDER_SUCCESS: "PURCHASE/SUBMIT_ORDER_SUCCESS",
  SUBMIT_ORDER_FAILURE: "PURCHASE/SUBMIT_ORDER_REQUEST"
};

export const actions = {
  setOrderQuantity: quantity => ({
    type: types.SET_ORDER_QUANTITY,
    quantity
  }),
  hideTip: () => ({
    type: types.HIDE_TIP
  }),
  submitOrder: productId => {
    return (dispatch, getState) => {
      dispatch({ type: types.SUBMIT_ORDER_REQUEST });
      const product = getProductDetail(getState(), productId);
      const quantity = getState().purchase.quantity;
      const totalPrice = (product.currentPrice * quantity).toFixed(1);
      const text1 = `${quantity}张 | 总价：￥${totalPrice}`;
      const text2 = product.validityPeriod;

      const order = {
        statusText: "待消费",
        orderPicUrl: product.picture,
        channel: product.detail.category,
        title: `${product.shop}:${product.product}`,
        text: [text1, text2],
        type: ORDER_TYPES.AVAILABLE,
        time: Date.now()
      };

      return post(url.addOrder(), order)
        .then(() => {
          dispatch({
            type: types.SUBMIT_ORDER_SUCCESS
          });
        })
        .catch(() => {
          dispatch({
            type: types.SUBMIT_ORDER_FAILURE
          });
        });
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_ORDER_QUANTITY:
      return {
        ...state,
        quantity: action.quantity
      };
    case types.HIDE_TIP:
      return {
        ...state,
        isShowTip: false
      };
    case types.SUBMIT_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case types.SUBMIT_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isShowTip: true
      };
    case types.SUBMIT_ORDER_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getOrderQuantity = state => state.purchase.quantity;
export const getIsShowTip = state => state.purchase.isShowTip;
export const getProduct = (state, productId) =>
  getProductDetail(state, productId);

export const getTotalPrice = createSelector(
  [getProduct, getOrderQuantity],
  (product, quantity) => {
    return product ? (product.currentPrice * quantity).toFixed(1) : 0;
  }
);
