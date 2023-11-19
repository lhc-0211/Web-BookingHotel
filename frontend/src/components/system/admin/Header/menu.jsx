import React from 'react'
import {
    Button
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { processLogout } from '../../../../store/actions';
import './menu.scss'

const Menu = () => {
    const { isLoggedIn, userInfo } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(processLogout());
    };
    return (
        <div className="nav_wrapper d-flex align-items-center justify-content-between">
            {/**=========== loge start ============ */}
            <div className="logo flex-grow-1">
                <Link to='/'><span className='logo__titel'>Admin</span></Link>

            </div>
            {/**=========== loge end ============ */}

            {/**=========== menu start ============ */}
            <div className="menu d-flex align-items-center gap-2">
                <div className="Tour gap-2">
                    <Link to='/admin/tour'>
                        <Button>Tour</Button>
                    </Link>
                </div>

                <div className="Hotel gap-2">
                    <div className="btn btn-secondary dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className=''>
                            Hotel
                        </div>
                    </div>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/admin/hotel/detail">Hotel Detail</Link></li>
                        <li><Link className="dropdown-item" to="/admin/hotel/category">Category</Link></li>
                    </ul>
                </div>

                <div className="Room gap-2">
                    <div className="btn btn-secondary dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className=''>
                            Room
                        </div>
                    </div>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/admin/room/detail">Room Detail</Link></li>
                        <li><Link className="dropdown-item" to="/admin/room/type">Room type</Link></li>
                    </ul>
                </div>

                <div className="User gap-2">
                    <div className="btn btn-secondary dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <div className=''>
                            User
                        </div>
                    </div>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/admin/account/company">Company</Link></li>
                        <li><Link className="dropdown-item" to="/admin/account/guest">Guest</Link></li>
                        <li><Link className="dropdown-item" to="/admin/account/manager">Admin</Link></li>
                    </ul>
                </div>

                <div className="customer_service gap-2">
                    <Button>
                        <i className="ri-question-line"></i>
                    </Button>

                </div>
            </div>
            {/**=========== menu end ============ */}

            <div className="nav__right d-flex align-items-center gap-2">
                <div className="nav__btns d-flex align-items-center gap-2">
                    {isLoggedIn && userInfo ? (
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
                                <li><Link className="dropdown-item"
                                    onClick={handleLogout}
                                    to='/login'
                                > Đăng xuất</Link></li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Button style={{ backgroundColor: 'white' }}>
                                <Link to='/register'>Đăng kí</Link>
                            </Button>
                            <Button style={{ backgroundColor: 'white' }}>
                                <Link to='/login'>Đăng nhập</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div >
        </div >
    )
}

export default Menu
