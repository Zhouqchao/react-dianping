import { createSelector } from "reselect";
import { combineReducers } from "redux";
import { get, post, remove } from "../../utils/request";
import url from "../../utils/url";
import { schema } from "./entities/orders";
import {
  ORDER_TYPES,
  getOrders as getAllOrders
} from "../../redux/modules/entities/orders";

// state
const initialState = {
  currentTab: 0,
  orders: {
    isFetching: false,
    ids: []
  },
  showConfirm: false,
  isShowCommentSection: false,
  currentOrder: {
    id: null,
    isDeleting: false,
    isCommenting: false,
    comment: "",
    star: 0,
    commentId: null
  }
};

// actions
const types = {
  // 获取订单数据
  FETCH_ORDERS_REQUEST: "USER/FETCH_ORDERS_REQUEST",
  FETCH_ORDERS_SUCCESS: "USER/FETCH_ORDERS_SUCCESS",
  FETCH_ORDERS_FAILURE: "USER/FETCH_ORDERS_FAILURE",
  // 设置当前激活的tab
  SET_CURRENT_TAB: "USER/SET_CURRENT_TAB",
  SET_SHOW_CONFIRM: "USER/SET_SHOW_CONFIRM",
  // 删除订单
  DELETE_ORDER_REQUEST: "USER/DELETE_ORDER_REQUEST",
  DELETE_ORDER_SUCCESS: "USER/DELETE_ORDER_SUCCESS",
  DELETE_ORDER_FAILURE: "USER/DELETE_ORDER_FAILURE",
  MOCK_DELETE_ORDER: "USER/MOCK_DELETE_ORDER",
  SET_CURRENT_ORDER_ID: "USER/SET_CURRENT_ORDER_ID",
  SET_CURRENT_ORDER_COMMENT_ID: "USER/SET_CURRENT_ORDER_COMMENT_ID",
  /*** 评价订单 ***/
  // 显示/隐藏评价区域
  SHOW_COMMENT_SECTION: "USER/SHOW_COMMENT_SECTION",
  HIDE_COMMENT_SECTION: "USER/HIDE_COMMENT_SECTION",
  // 设置评价内容
  SET_COMMENT: "USER/SET_COMMENT",
  // 设置评分
  SET_STAR: "USER/SET_STAR",
  // 提交评价
  POST_COMMENT_REQUEST: "USER/POST_COMMENT_REQUEST",
  POST_COMMENT_SUCCESS: "USER/POST_COMMENT_SUCCESS",
  POST_COMMENT_FAILURE: "USER/POST_COMMENT_FAILURE",
  // 重置当前订单
  RESET_CURRENT_ORDER: "USER/RESET_CURRENT_ORDER"
};

export const actions = {
  // 获取订单数据
  getOrders: () => ({
    types: [
      types.FETCH_ORDERS_REQUEST,
      types.FETCH_ORDERS_SUCCESS,
      types.FETCH_ORDERS_FAILURE
    ],
    shouldCallAPI: () => true,
    callAPI: () => get(url.getOrders()),
    schema
  }),
  resetCurrentOrder: () => ({
    type: types.RESET_CURRENT_ORDER
  }),
  // 删除订单
  deleteOrder: id => ({
    types: [
      types.DELETE_ORDER_REQUEST,
      types.DELETE_ORDER_SUCCESS,
      types.DELETE_ORDER_FAILURE
    ],
    callAPI: () => remove(url.deleteOrder(id))
  }),
  // 显示评价区域
  showCommentSection: () => ({
    type: types.SHOW_COMMENT_SECTION,
    isShowCommentSection: true
  }),
  // 隐藏评价区域
  hideCommentSection: () => ({
    type: types.HIDE_COMMENT_SECTION,
    isShowCommentSection: false
  }),
  // 设置评价内容
  setComment: comment => ({
    type: types.SET_COMMENT,
    comment
  }),
  // 设置评价等级
  setStar: star => ({
    type: types.SET_STAR,
    star
  }),
  postCommentRequest: () => ({
    type: types.POST_COMMENT_REQUEST
  }),
  postCommentSuccess: ({ comment, star, id, commentId }) => ({
    type: types.POST_COMMENT_SUCCESS,
    comment,
    star,
    id,
    commentId
  }),

  // 评价订单
  commentOrder: commentObj => ({
    types: [
      types.POST_COMMENT_REQUEST,
      types.POST_COMMENT_SUCCESS,
      types.POST_COMMENT_FAILURE
    ],
    callAPI: () => post(url.addComment(), commentObj)
  }),
  // 设置当前激活的tab
  setCurrentTab: tab => ({
    type: types.SET_CURRENT_TAB,
    tab
  }),
  setShowConfirm: isShow => ({
    type: types.SET_SHOW_CONFIRM,
    showConfirm: isShow
  }),
  setCurrentOrderId: id => ({
    type: types.SET_CURRENT_ORDER_ID,
    id
  }),
  setCurrentOrderCommentId: orders => ({
    type: types.SET_CURRENT_ORDER_COMMENT_ID,
    orders
  })
};

// 删除订单
const currentOrderReducer = (state = initialState.currentOrder, action) => {
  switch (action.type) {
    case types.POST_COMMENT_REQUEST:
      return {
        ...state,
        isCommenting: true
      };
    case types.POST_COMMENT_SUCCESS:
      return {
        ...state,
        isCommenting: false
      };
    case types.POST_COMMENT_FAILURE:
      return {
        ...state,
        isCommenting: false
      };
    case types.SET_CURRENT_ORDER_ID:
      return {
        ...state,
        id: action.id
      };
    case types.SET_CURRENT_ORDER_COMMENT_ID:
      const currentOrderId = state.id;
      const commentId =
        action.orders.find(order => order.id === currentOrderId).commentId ||
        null;
      return {
        ...state,
        commentId
      };
    case types.DELETE_ORDER_REQUEST:
      return {
        ...state,
        isDeleting: true
      };
    case types.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        isDeleting: false
      };
    case types.DELETE_ORDER_FAILURE:
      return {
        ...state,
        isDeleting: false
      };
    case types.SET_STAR:
      return {
        ...state,
        star: action.star
      };
    case types.SET_COMMENT:
      return {
        ...state,
        comment: action.comment
      };
    case types.RESET_CURRENT_ORDER:
      return {
        ...state,
        id: null,
        comment: "",
        star: 0,
        commentId: null
      };
    default:
      return state;
  }
};

// reducers
const ordersReducer = (state = initialState.orders, action) => {
  switch (action.type) {
    case types.FETCH_ORDERS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ids: action.response.ids
      };
    case types.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        isFetching: false,
        ids: []
      };
    case types.MOCK_DELETE_ORDER:
      const newIds = state.ids.filter(id => id !== action.id);
      return {
        ...state,
        ids: newIds
      };
    default:
      return state;
  }
};

const currentTabReducer = (state = initialState.currentTab, action) => {
  switch (action.type) {
    case types.SET_CURRENT_TAB:
      return action.tab;
    default:
      return state;
  }
};

const showConfirmReducer = (state = initialState.showConfirm, action) => {
  switch (action.type) {
    case types.SET_SHOW_CONFIRM:
      return action.showConfirm;
    default:
      return state;
  }
};

const isShowCommentSectionReducer = (
  state = initialState.isShowCommentSection,
  action
) => {
  switch (action.type) {
    case types.SHOW_COMMENT_SECTION:
    case types.HIDE_COMMENT_SECTION:
      return action.isShowCommentSection;
    default:
      return state;
  }
};

export default combineReducers({
  currentTab: currentTabReducer,
  orders: ordersReducer,
  showConfirm: showConfirmReducer,
  currentOrder: currentOrderReducer,
  isShowCommentSection: isShowCommentSectionReducer
});

const orderTypes = [
  ORDER_TYPES.ALL,
  ORDER_TYPES.TO_PAY,
  ORDER_TYPES.AVAILABLE,
  ORDER_TYPES.REFUND
];

// selectors
export const getCurrentTab = state => state.user.currentTab;
export const getCurrentOrder = state => state.user.currentOrder;
export const getIsFetching = state => state.user.orders.isFetching;
export const getOrderIds = state => state.user.orders.ids;
export const getOrders = createSelector(
  [getAllOrders, getOrderIds, getCurrentTab],
  (_orders, ids, currentTab) => {
    const type = orderTypes[currentTab];
    const orders = ids.map(id => _orders[id]);
    return type === 0 ? orders : orders.filter(order => order.type === type);
  }
);

export const getShowConfirm = state => state.user.showConfirm;
export const getIsShowCommentSection = state => state.user.isShowCommentSection;
export const getStar = state => {
  const commentId = state.user.currentOrder.commentId;
  return commentId
    ? state.entities.comments[commentId] &&
        state.entities.comments[commentId].star
    : state.user.currentOrder.star;
};
export const getComment = state => {
  const commentId = state.user.currentOrder.commentId;
  return commentId
    ? state.entities.comments[commentId] &&
        state.entities.comments[commentId].comment
    : state.user.currentOrder.comment;
};
