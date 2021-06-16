import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from '../pages/login/login.jsx';

const App = () => (
  <div className="d-flex flex-column h-100">
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a></div>
    </nav>
    <Switch>
      <Route exact path="/" render={() => <div>main</div>} />
      <Route path="/login" component={Login} />
      <Route path="/not-found" render={() => <div>not-found</div>} />
      <Redirect to="/not-found" />
    </Switch>
  </div>
);

export default App;
