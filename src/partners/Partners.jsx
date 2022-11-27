import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';

export default function Partners(props) {
  return (
    <>
      <Route
        path="/partners/login"
        exact
        render={() => (
          <Login isLogin={props.isLogin} setLogin={props.setLogin} />
        )}
      ></Route>
    </>
  );
}
