import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Canvas from "./views/Canvas";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <h1>About Route</h1>
        </Route>
        <Route path="/canvas">
          <Canvas />
        </Route>
        <Route path="/showcase">
          <h1>showcase Route</h1>
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <h1>Not found</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
