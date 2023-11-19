
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import logovn from '../../assets/images/logovnheader.png';
// import worldMap from '../assets/images/world-map-gray.png';
import { Button } from "reactstrap";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { processLogout } from '../../store/actions';

const RegisterCompany = () => {
    const { isLoggedIn, userInfo } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(processLogout());
    };
    return (
        <div className="container_registerCompany">
            <div className="wrapper_header">
                <div className='container_header d-flex'>
                    <Link className='title_header' to='/'>Booking.com</Link>
                    <div className='extension_icon d-flex justify-content-center align-items-center'
                        style={{ marginBottom: '5px' }}
                    >
                        <div className='icon_laguage'>
                            <img className='icon_laguage_deatail' src={logovn} alt="" />
                        </div>
                        <div
                            style={{
                                color: 'white',
                                marginRight: '6px'
                            }}
                        >Đã là đối tác?</div>

                        <div className="nav__right d-flex align-items-center gap-2">
                            <div className="nav__btns d-flex align-items-center gap-2">
                                {isLoggedIn && userInfo && userInfo.accountType !== 'admin' ? (
                                    <div className="dropdown">
                                        <div className="btn btn-secondary dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <div className='' style={{ marginRight: '5px', backgroundColor: '#febb02', borderRadius: '50%', width: '28px' }}>
                                                <i className="ri-user-fill rounded-circle shadow-4" style={{ fontSize: '18px' }}></i>
                                            </div>
                                            <div className='mr-auto'>
                                                {userInfo.companyName}
                                            </div>
                                        </div>
                                        <ul className="dropdown-menu">
                                            <li><button className="dropdown-item" >Quản lí tài khoản</button></li>
                                            {
                                                userInfo.accountType === 'company' && (
                                                    <>
                                                        <li><button className="dropdown-item" >Khách sạn của bạn</button></li>
                                                        <li><button className="dropdown-item" >Quản lí phiếu đặt</button></li>
                                                    </>
                                                )
                                            }
                                            <li><Link className="dropdown-item" onClick={handleLogout}
                                                to='/'
                                            >Đăng xuất</Link></li>
                                        </ul>
                                    </div>
                                ) : (
                                    <>
                                        <Button
                                            outline
                                            style={{
                                                color: 'white',
                                                marginRight: '6px'
                                            }}
                                        >
                                            <Link
                                                to='/login'
                                                style={{
                                                    color: 'white',
                                                }}
                                            >
                                                Đăng nhập
                                            </Link>
                                        </Button>
                                        <Button color="primary">
                                            <Link
                                                to='/404'
                                                style={{
                                                    color: 'white',
                                                }}
                                            >
                                                Trợ giúp
                                            </Link>
                                        </Button></>
                                )}
                            </div>
                        </div >
                    </div>
                </div>
            </div>
        </div >
    )
}

export default RegisterCompany;