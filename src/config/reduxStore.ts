import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as reducers from './../reducers/'

const middlewares = [
  /* other middlewares */
];

if (__DEV__) {
  const createDebugger = require("redux-flipper").default;
  middlewares.push(createDebugger());
}

const reducer = combineReducers({ ...reducers });
export type RootState = ReturnType<typeof reducer>;
export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);
