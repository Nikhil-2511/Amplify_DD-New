import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../../Container/NotFound';
import { RouteData } from '../../Container/PrivateRoute/RouteData';
import { isAdminUser, isAuthenticated, reRouteUser } from '../../Services';

function AuthenticatedRoute() {
  useEffect(() => {
    if(isAuthenticated()) {
      // reRouteUser();
    }
  }, [])

  return (
      <div>
        <Routes>
          {
            RouteData.content.map((routeList, index) => {
              if(routeList.admin) {
                if(isAdminUser()) {
                  return <Route key={index} exact path={routeList.route} component={routeList.page} />
                }
                return '';
              }
              else {
                <Route key={index} exact path={routeList.route} component={routeList.page} />
              }
            })
          }
          <Route path="*" element={ <NotFound />}/>
        </Routes>
      </div>
  )
}

export default AuthenticatedRoute;