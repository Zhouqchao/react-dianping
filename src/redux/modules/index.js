import { combineReducers } from "redux";
import entities from "./entities";
import app from "./app";
import home from "./home";

export default combineReducers({ entities, app, home });
