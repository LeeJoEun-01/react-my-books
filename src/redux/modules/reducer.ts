import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import auth from "./auth";
import books from "./books";
import { History } from "history";

// 여러개의 reducer 모듈을 하나로 합칠 수 있는 root reducer 
const reducer = (history: History<unknown>) =>
  combineReducers({
    // 하위 reducer
    auth,
    books,
    router: connectRouter(history),
  });

export default reducer;