import createReducer from "../../../utils/createReducer";
import { patch } from "../../../utils/request";
import url from "../../../utils/url";

export const schema = {
  id: "id",
  name: "orders"
};

export const ORDER_TYPES = {
  ALL: 0,
  CONSUMED: 1, // 已消费
  TO_PAY: 2, // 待付款
  AVAILABLE: 3, // 可使用
  REFUND: 4 // 退款
};

// actions
const types = {
  // 修改订单（给订单添加评论id）
  PATCH_ORDER_REQUEST: "ORDERS/patch_ORDER_REQUEST",
  PATCH_ORDER_SUCCESS: "ORDERS/patch_ORDER_SUCCESS",
  PATCH_ORDER_FAILURE: "ORDERS/patch_ORDER_FAILURE"
};

export const actions = {
  // 添加评价到订单中
  patchOrder: (orderId, commentId) => ({
    types: [
      types.PATCH_ORDER_REQUEST,
      types.PATCH_ORDER_SUCCESS,
      types.PATCH_ORDER_FAILURE
    ],
    callAPI: () => patch(url.patchOrder(orderId), { commentId })
  })
};

// reducers
const mainReducer = createReducer(schema.name);

const reducer = (state = {}, action) => {
  switch (action.type) {
    case types.ADD_COMMENT:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          commentId: action.commentId
        }
      };
    case types.ADD_ORDER:
      return {
        ...state,
        [action.id]: {
          ...action.order,
          id: action.id
        }
      };
    case types.PATCH_ORDER_REQUEST:
    case types.PATCH_ORDER_SUCCESS:
    case types.PATCH_ORDER_FAILURE:
      return state;
    default:
      return mainReducer(state, action);
  }
};

export default reducer;

// selectors
export const getOrders = state => state.entities.orders;
