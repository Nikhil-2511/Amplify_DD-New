import React, { useEffect, useLayoutEffect, useState } from 'react';
import Footer from './Component/Footer';
import { Navigate, Route, Router, Routes } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from "react-redux";
import Header from './Component/Header';
import QuestionScreen from './Container/QuestionScreen';
import store from './Redux';
import Login from './Container/Login';
import Valuation from './Component/Valuation';
import Dashboard from './Container/Dashboard';
// import History from './History';
import AuthenticatedRoute from './Component/AuthenticatedRoute';
import PrivateRoute from './Container/PrivateRoute';
import { globalAlert, handleThemeChanged } from './Redux/slice/CommonSlice';
import { Button, createTheme, Modal, ThemeProvider } from '@mui/material';
import Signup from './Container/Signup';
import CueCard from './Container/CueCard';
import CustomRouter from './CustomRouter';
import history from './history';
import NotFound from './Container/NotFound';
import { isAuthenticated } from './Services';
import AdminListing from './Container/AdminListing';
import Loader from './CommonComponent/Loader';
import RoutesStructure from './RoutesStructure';
import AdminRoutesStruct from './Routes/AdminRoutes';
import BuyerRouteStructure from './Routes/BuyerRouteStructure';
import HomeLayoutContainer from './Container/HomeLayoutContainer';
import { LIGHT_THEME } from './constants';
import { DarkThemeObject, LightThemeObject } from './Theme';

function App() {
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });
  const themeChanged = useSelector((state) => state.commonStore.themeChanged);
  const commonStore = useSelector((state) => state.commonStore);
  const [theme, setTheme] = useState(DarkThemeObject);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    history.listen(setState);
  }, [history]);

  useEffect(() => {
    if(themeChanged) {
      if(commonStore?.theme === LIGHT_THEME) setTheme(LightThemeObject)
      else setTheme(DarkThemeObject);
      dispatch(handleThemeChanged(false));
    }

  }, [themeChanged])

  return (
    <ThemeProvider theme={theme}>
      {/* <Provider store={store}> */}
          <div className='body-content'>
            <HomeLayoutContainer>
              <Routes key={state.history} >
                <Route path='admin/*' element={<AdminRoutesStruct />} />
                <Route path='buyer/*' element={<BuyerRouteStructure />} />
                <Route path='*' element={<RoutesStructure history={history} />} />
              </Routes> 
            </HomeLayoutContainer>
          </div>
      {/* </Provider> */}
    </ThemeProvider>
  );
}

export default App;
