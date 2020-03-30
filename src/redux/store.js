import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import callAPIMiddleware from "./middlewares/callAPI";
import rootReducer from "./modules";

let store;
const logger = createLogger();

if (
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(thunkMiddleware, callAPIMiddleware, logger)
    )
  );
} else {
  store = createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware, callAPIMiddleware)
  );
}

export default store;
