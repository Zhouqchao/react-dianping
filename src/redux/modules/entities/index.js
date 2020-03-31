import { combineReducers } from "redux";
import products from "./products";
import shops from "./shops";
import keywords from "./keywords";

export default combineReducers({ products, shops, keywords });
