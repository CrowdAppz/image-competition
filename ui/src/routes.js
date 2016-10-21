import React from 'react';
import { Router, Route } from 'react-router';

import Main from './main/Main';
import About from './about/About';
import Detail from './detail/Detail';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={Main} />
    <Route path="/about" component={About} />
    <Route path="/detail" component={Detail} />
  </Router>
);

export default Routes;
