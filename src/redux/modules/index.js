import { combineReducers } from "redux";
import entities from "./entities";
import app from "./app";
import login from "./login";
import home from "./home";
import detail from "./detail";
import search from "./search";
import user from "./user";

export default combineReducers({
  entities,
  app,
  login,
  user,
  home,
  detail,
  search
});
