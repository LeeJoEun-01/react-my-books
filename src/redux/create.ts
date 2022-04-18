import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import reducer from "./modules/reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./modules/rootSaga";
import { routerMiddleware } from "connected-react-router";
import history from "../history";
import TokenService from "../services/TokenService";

// store 만드는 역할을 한다.
const create = () => {
  const token = TokenService.get();

  const sagaMiddleware = createSagaMiddleware();

  // createastore의 인자로는 reducer이 들어와야한다. 
  const store = createStore(
    reducer(history),
    {
      auth: {
        token,
        loading: false,
        error: null,
      },
    },
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, routerMiddleware(history))
    )
  );

    sagaMiddleware.run(rootSaga);

  return store;
};

export default create; 