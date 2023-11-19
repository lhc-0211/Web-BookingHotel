import "./App.css";
import Layout from "./components/Layout/Layout";
import LayoutAdmin from './components/system/admin/Layout/Layout'
import LayoutCompany from './components/system/company/Layout/layoutHotelAdmin'

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginSuccess, processLogout } from './store/actions';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userInfo = localStorage.getItem('userInfo');

    if (isLoggedIn === 'true' && userInfo) {
      dispatch(userLoginSuccess(JSON.parse(userInfo)));
    } else {
      dispatch(processLogout());
    }
  }, [dispatch]);


  const { isLoggedIn, userInfo } = useSelector((state) => state.user);

  return (
    <>
      {isLoggedIn && userInfo.accountType === 'admin' ? <LayoutAdmin /> :
        isLoggedIn && userInfo.accountType === 'company' ? <LayoutCompany /> : <Layout />}

    </>
  );
}

export default App;
