import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Loading from './components/Loading';
import RouterAuth from './components/RouterAuth'
import routes from './config/routerConfig'

export default class App extends Component {
  render() {
    return (
      <div className="box">
        {/* 路由懒加载 */}
        <React.Suspense fallback={<Loading></Loading>}>
          <BrowserRouter>
            <Switch>
              {/* 重定向 */}
              {/* <Redirect exact from="/" to="/login"></Redirect>
              <Route path="/home" component={ React.lazy(() => import("./pages/home/index")) }></Route>
              <Route path="/login" component={ React.lazy(() => import("./pages/login/login")) }></Route>
              <Route path="/register" component={ React.lazy(() => import("./pages/register/register")) }></Route> */}
              <RouterAuth routes={routes}></RouterAuth>
            </Switch>
          </BrowserRouter>
        </React.Suspense>
      </div>
    )
  }
}
