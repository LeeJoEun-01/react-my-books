import { createActions, handleActions, Action } from "redux-actions";
import { put, takeEvery, call, select } from 'redux-saga/effects';
import TokenService from "../../services/TokenService";
import UserService from "../../services/UserService";
import { AuthState, LoginReqType } from "../../types";
import { push } from 'connected-react-router';

// 초기값 세팅 
const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

// prefix 설정 (namspace, 경로 설정)
const options = {
  prefix: 'my-books/auth',
};

// 액션 생성 함수 {엑션 생성 함수가 들어감} , (타입 지정)
export const { pending, success, fail } = createActions(
  "PENDING",
  "SUCCESS",
  "FAIL",
  options,
);

// reducer 만들기 (handleactions)로 + Generic 추가 <AuthState, patload 타입>
const reducer = handleActions<AuthState, string>(
  {
    // 이 위에 적힌 액션의 타입을 바탕으로 리듀서 로직이 만들어진다.
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    // token을 받아야하기 때문에 action을 받음
    SUCCESS: (state, action) => ({
      ...state,
      token: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  }, initialState,
  options,
);

export default reducer;

//saga 
export const { login, logout } = createActions("LOGIN", "LOGOUT", options);

function* loginSaga(action: Action<LoginReqType>) {
  try {
    yield put(pending());
    const token: string = yield call(UserService.login, action.payload);
    // 받아온 토큰은 localstorage에 넣는다.
    TokenService.set(token);
    yield put(success(token));
    //push
    yield put(push('/'));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN_ERROR')));
  }
}

function* logoutSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    yield call(UserService.logout, token);
    // 받아온 토큰은 localstorage에 넣는다.
    TokenService.set(token);
  } catch (error) {
  } finally {
    TokenService.remove();
    yield put(success(null));
  }
}

export function* authSaga() {
  yield takeEvery(`${ options.prefix }/LOGIN`, loginSaga);
  yield takeEvery(`${ options.prefix }/LOGOUT`, logoutSaga);
}