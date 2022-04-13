import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from './pages/Home';
import Edit from './pages/Edit';
import Detail from './pages/Detail';
import Add from './pages/Add';
import Signin from './pages/Signin';
import NotFound from './pages/Notfound';
import Error from './pages/Error';
import { ErrorBoundary } from 'react-error-boundary';

function App() {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <BrowserRouter>
      <Switch>
        <Route exact path="/edit/:id" component={Edit} />
        {/* 상세 페이지 */}
        <Route exact path="/book/:id" component={Detail} />
        <Route exact path="/add" component={Add} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/" component={Home} />
        {/* 위의 경우가 아닌 경로로 갔을 때 Not Found 띄워주는 페이지 */}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
