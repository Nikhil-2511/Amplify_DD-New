import React from 'react';
import { Button, Modal } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Loader from "./CommonComponent/Loader";
import Signup from "./Container/Signup";
import Valuation from "./Component/Valuation";
import AdminListing from "./Container/AdminListing";
import CueCard from "./Container/CueCard";
import NotFound from "./Container/NotFound";
import QuestionScreen from "./Container/QuestionScreen";
import { globalAlert } from "./Redux/slice/CommonSlice";
import Dashboard from './Container/Dashboard';
import AuthenticatedRoute from './Component/AuthenticatedRoute';
import PrivateRoute from './Container/PrivateRoute';
import { RouteData } from './Container/PrivateRoute/RouteData';
import { isAdminUser } from './Services';

const CustomRouter = ({ history, ...props }) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Routes
      {...props}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {props.children}
    </Routes>
    // <Router
    //   {...props}
    //   location={state.location}
    //   navigationType={state.action}
    //   navigator={history}
    // >
    //   <Routes
    //     location={state.location}
    //     navigationType={state.action}
    //     navigator={history}
    //   >
    //     <Route exact path="/valq" element={<QuestionScreen />} />
    //     <Route exact path="/login" element={<Signup />} />
    //     <Route exact path="/signup" element={<Signup />} />
    //     <Route exact path="/not-found" element={<NotFound />} />
    //     {/* {
    //         RouteData.content.map((routeList, index) => {
    //           if(isAdminUser()) {
    //             if(routeList.admin) {
    //               return <Route key={index} exact path={routeList.route} component={routeList.page} />
    //             }
    //             return '';
    //           }
    //           else {
    //             if(routeList.endUser) {
    //               return <Route key={index} exact path={routeList.route} component={routeList.page} />
    //             }
    //           }
    //         })
    //       } */}
    //     <Route exact path="/valuation" element={<Valuation />} />

    //     <Route path="/dashboard" element={<Dashboard />} />
    //     <Route exact path="/cue-card/:companyId" element={<CueCard />} />
    //     <Route exact path="/admin-listing" element={<AdminListing />} />
    //     {/* <PrivateRoute path ="/" component={AuthenticatedRoute} /> */}
    //     <Route path="*" element={<NotFound />}/>
    //   </Routes>
    // </Router>
  );
};

export default CustomRouter;