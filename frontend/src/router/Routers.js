import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

//admin routes
import HomeSystem from '../components/system/admin/home'
import DetailTourSystem from '../components/system/admin/detailTour'
import DetailCategorySystem from '../components/system/admin/detailCategory'
import DetailHotelSystem from '../components/system/admin/detailHotel'

//hotel admin routes
import HomeSystemHotel from '../components/system/company/home'


// import Hotel from '../pages/hotel'
// import Login from '../pages/login'

//client routes
import Home from '../pages/home'
import Tour from '../pages/home/tour'
import DetailTour from '../pages/detail/detailTour'
import Hotel from '../pages/hotel'
import DetailHotel from '../pages/detail/hotel/detailHotel'
import Register from '../pages/logIO/register'
import Login from '../pages/logIO/login'
import Error from '../pages/error/404'
import RegisterCompany from '../pages/logIO/registerCompany'
import CreateHotel from '../pages/createHotel/createHotel'
import CreateHotelDetail from '../pages/createHotel/detailCreateHotel'

const Routers = () => {
  const { isLoggedIn, userInfo } = useSelector((state) => state.user);

  return (
    <Routes>
      {/* Trang chủ */}
      {isLoggedIn && userInfo.accountType === 'admin' && (
        <Route path='/' element={<Navigate to='/admin/home' />} />
      )}
      {isLoggedIn && userInfo.accountType === 'company' && (
        <Route path='/' element={<Navigate to='/hoteladmin/home' />} />
      )}

      <Route path='/' element={<Navigate to='/home' />} />
      {/* Trang client */}
      <Route path='/home' element={<Home />} />
      <Route path='/tour' element={<Tour />} />
      <Route path='/tour/:id' element={<DetailTour />} />
      <Route path='/hotel' element={<Hotel />} />
      <Route path='/hotel/:id' element={<DetailHotel />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/404' element={<Error />} />
      <Route path='/registerCompany' element={<RegisterCompany />} />


      {/* Trang admin */}
      {isLoggedIn && userInfo.accountType === 'admin' && (
        <>
          <Route path='/admin/home' element={<HomeSystem />} />
          <Route path='/admin/tour' element={<DetailTourSystem />} />
          <Route path='/admin/hotel/category' element={<DetailCategorySystem />} />
          <Route path='/admin/hotel/detail' element={<DetailHotelSystem />} />
        </>
      )}
      {/* Trang hotel admin */}
      {isLoggedIn && userInfo.accountType === 'company' && (
        <>
          <Route path='/hoteladmin/home' element={<HomeSystemHotel />} />
          <Route path='/become-a-host' element={<CreateHotel />} />
          <Route path='/become-a-host/create-detail' element={<CreateHotelDetail />} />
          {/* <Route path='/admin/tour' element={<DetailTourSystem />} />
          <Route path='/admin/hotel/category' element={<DetailCategorySystem />} />
          <Route path='/admin/hotel/detail' element={<DetailHotelSystem />} /> */}
        </>
      )}

      {/* Điều kiện để ngăn tài khoản admin hoặc company truy cập trang client */}
      {isLoggedIn && (userInfo.accountType === 'admin' || userInfo.accountType === 'company') && (
        <Route path='/home' element={<Navigate to='/404' />} />
      )}
    </Routes>
  )
}
export default Routers


