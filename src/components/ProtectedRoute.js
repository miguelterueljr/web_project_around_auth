
/*
function ProtectedRoute ({ children, ...rest}) {
  return (
    <Route {...rest} render={() => {
      return fakeAuth.isAuthenticated ? children : <Redirect to='/login' />
      }} 
    />
  )
}

export default ProtectedRoute;
*/

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ children, loggedIn, ...props }) {
  return (
    <Route {...props}>
      {loggedIn ? children : <Redirect to={"/login"} />}
    </Route>
  );
}

export default ProtectedRoute;