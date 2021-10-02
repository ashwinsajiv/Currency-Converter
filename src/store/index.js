import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {
  currency: {
    data: {}, //conversion rate
    error: "",
    to: 0,
    from: 0,
    convertFrom: "EUR",
    convertTo: "USD",
    historyDates: [],
    historyValues: [],
    isFetched: false,
    isHistoryFetched: false,
    saved:[]
  }
};
const middleware = [thunk];

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, enhancer);


export default store;
