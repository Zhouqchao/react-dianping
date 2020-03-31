import { post } from "../../utils/request";
import url from "../../utils/url";
// state
const initialState = {
  password: "",
  // 读取登录状态
  username: localStorage.getItem("username") || "",
  logged: localStorage.getItem("logged") || false,
  isFetching: false
};

// actions
export const types = {
  // 登录
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: "LOGIN_FAILURE",
  // 退出
  LOGOUT: "LOGOUT",
  // 设置用户名和密码
  SET_USERNAME: "SET_USERNAME",
  SET_PASSWORD: "SET_PASSWORD"
};

export const actions = {
  loginFailure: error => ({ type: types.LOGIN_FAILURE, error }),
  login: () => {
    return (dispatch, getState) => {
      // 表单验证
      const { username, password } = getState().login;
      dispatch({ type: types.LOGIN_REQUEST });

      if (username && password) {
        dispatch({ type: types.LOGIN_REQUEST });

        return post(url.login(), { username, password }).then(
          ({ username }) =>
            dispatch({
              type: types.LOGIN_SUCCESS,
              username: username
            }),
          error => dispatch({ type: types.LOGIN_FAILURE, error })
        );
      } else {
        return dispatch(actions.loginFailure("用户名和密码不能为空！"));
      }
    };
  },
  setUsername: username => ({ type: types.SET_USERNAME, username }),
  setPassword: password => ({ type: types.SET_PASSWORD, password }),
  logout: () => ({ type: types.LOGOUT })
};

// 缓存登录状态
const storeLoginStatus = ({ username, logged }) => {
  localStorage.setItem("logged", logged);
  localStorage.setItem("username", username);
};

// 清除登录状态
const clearLoginStatus = () => {
  localStorage.removeItem("logged");
  localStorage.removeItem("username");
};

// reducers
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case types.LOGIN_SUCCESS:
      storeLoginStatus({ username: action.username, logged: true });
      return {
        ...state,
        isFetching: false,
        logged: true
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        logged: false
      };
    case types.LOGOUT:
      clearLoginStatus();
      return {
        ...state,
        username: "",
        password: "",
        logged: false
      };
    case types.SET_USERNAME:
      return {
        ...state,
        username: action.username
      };
    case types.SET_PASSWORD:
      return {
        ...state,
        password: action.password
      };
    default:
      return state;
  }
};

export default reducer;

// selectors
export const getUsername = state => state.login.username;
export const getPassword = state => state.login.password;
export const getLogged = state => state.login.logged;
