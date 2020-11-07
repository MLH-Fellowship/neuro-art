import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <h1>About Route</h1>
        </Route>
        <Route path="/canvas">
          <h1>Canvas Route</h1>
        </Route>
        <Route exact path="/">
          <h1>Home Route</h1>
        </Route>
        <Route path="*">
          <h1>Not found</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
