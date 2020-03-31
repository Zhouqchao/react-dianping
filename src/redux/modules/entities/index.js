import { combineReducers } from "redux";
import products from "./products";
import shops from "./shops";
import keywords from "./keywords";
import orders from "./orders";
import comments from "./comments";

export default combineReducers({ products, shops, keywords, orders, comments });
