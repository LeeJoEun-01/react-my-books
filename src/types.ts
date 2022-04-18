import { RouterState } from "connected-react-router";
import { AnyAction, Reducer} from "redux";

export type LoginReqType = {
  email: string;
  password: string;
};

// 인증관리 
export interface AuthState {
  // AuthState의 타입 작성 
  token: string | null;
  loading: boolean;
  error: Error | null;
}

export interface BooksState {
  books: BookType[] | null;
  loading: boolean;
  error: Error | null;
}

export interface RootState {
  auth: AuthState;
  books: BooksState;
  router: Reducer<RouterState<unknown>, AnyAction>;
}

export interface BookType {}