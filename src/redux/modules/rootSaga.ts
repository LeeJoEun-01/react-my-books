import { all } from "redux-saga/effects";
import { authSaga } from "./auth";
import { booksSaga } from "./books";

export default function* rootSaga() {
  // all안에서 하위 사가 가져오기 
  yield all([authSaga(), booksSaga()]);
}
