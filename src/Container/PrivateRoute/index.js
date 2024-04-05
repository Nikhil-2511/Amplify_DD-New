import React from 'react';
import { Navigate, redirect, Route, Routes } from 'react-router-dom';
import { isAuthenticated } from '../../Services';

function PrivateRoute({Component: Component, ...rest}) {
  function checkAuthentication() {
    if(isAuthenticated()) {

    }
    return true;
  }

  return (
    // <React.Fragment>
      <Route 
        type="route"
        {...rest}
        render={ props => {
          return (
            isAuthenticated() ? <Component {...props} />
            :
            <Navigate to ="/login" replace={true} />
            // <Route to="/login" />
          )
        }}
      />
    // </React.Fragment>
  )
}
export default PrivateRoute;