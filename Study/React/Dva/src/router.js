import React from "react";
import { Router, Route, Switch, Redirect } from "dva/router";
import App from "./App";
import Home from "./routes/Home";
import Center from "./routes/Center";
import Location from "./routes/Location";

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/">
          <App>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/center" component={Center} />
              <Route path="/location" component={Location} />

              <Redirect from="/" to="/home" />
            </Switch>
          </App>
        </Route>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
