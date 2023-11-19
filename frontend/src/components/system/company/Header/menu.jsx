import React, { useState } from 'react'
import {
    Modal, ModalHeader, ModalBody, Button
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { processLogout } from '../../../../store/actions';
import logovn from '../../../../assets/images/logovnheader.png';

import './menu.scss'


const Menu = () => {
    const [modal, setModal] = useState(false);
    const { isLoggedIn, userInfo } = useSelector((state) => state.user);
    const toggle = () => setModal(!modal);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(processLogout());
    };
    return (
        <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/**=========== loge start ============ */}
            <div className="logo flex-grow-1 d-flex align-items-center">
                <Link to='/hoteladmin/home'><span className='logo__titel'
                >Booking.com</span></Link>
                <div className='mr-auto'>
                    {userInfo.companyName}
                </div>
                <div className='detail-acc'>Tài khoản chính</div>


            </div>
            {/**=========== loge end ============ */}

            {/**=========== menu start ============ */}
            <div className="menu d-flex align-items-center gap-2">
                <div className="denominations gap-2">
                    <Button
                        onClick={toggle}
                    >
                        VND
                    </Button>

                </div>

                <div className="language gap-2">
                    <div className='icon_laguage'>
                        <img className='icon_laguage_deatail' src={logovn} alt="" />
                    </div>
                </div>
            </div>
            {/**=========== menu end ============ */}

            <div className="nav__right d-flex align-items-center gap-2">
                <div className="nav__btns d-flex align-items-center gap-2">
                    {isLoggedIn && userInfo && userInfo.accountType === 'company' && (
                        <div className="dropdown">
                            <div className="btn btn-secondary dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <div className='' style={{ marginRight: '5px', backgroundColor: '#febb02', borderRadius: '50%', width: '28px' }}>
                                    <i className="ri-user-fill rounded-circle shadow-4" style={{ fontSize: '18px' }}></i>
                                </div>

                            </div>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item">Quản lí tài khoản</Link></li>
                                <li><Link className="dropdown-item">Thêm chỗ nghỉ mới</Link></li>
                                <li><Link className="dropdown-item" onClick={handleLogout}
                                    to='/login'
                                >Đăng xuất</Link></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div >
        </div >
    )
}

export default Menu
