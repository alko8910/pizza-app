import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Menu from './core/Menu';
import Address from './user/Address';
import OrderHistory from './user/OrderHistory';

const MainRouter = () => {
  return (
    <>
      <Menu />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/orderHistory/:userId' component={OrderHistory} />
        <Route path='/user/:userId' component={Address} />
      </Switch>
    </>
  );
};

export default MainRouter;
