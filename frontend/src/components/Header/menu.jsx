import React, { useState } from 'react'
import {
    Modal, ModalHeader, ModalBody, Button
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { processLogout } from '../../store/actions';
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
            <div className="logo flex-grow-1">
                <Link to='/'><span className='logo__titel'>Booking.com</span></Link>

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
                    <Modal isOpen={modal} toggle={toggle} >
                        <ModalHeader toggle={toggle}>Chọn loại tiền tệ cho bạn</ModalHeader>
                        <ModalBody>
                            cac gia tien te
                        </ModalBody>
                    </Modal>
                </div>

                <div className="language gap-2">
                    <Button
                        onClick={toggle}
                    >
                        VN
                    </Button>
                    <Modal isOpen={modal} toggle={toggle} >
                        <ModalHeader toggle={toggle}>Chọn ngôn ngữ</ModalHeader>
                        <ModalBody>
                            Các loại ngôn ngữ
                        </ModalBody>
                    </Modal>
                </div>

                <div className="customer_service gap-2">
                    <Button>
                        <i className="ri-question-line"></i>
                    </Button>

                </div>

                <div className="post__hotel gap-2">
                    <Button
                        className='btn-menu'
                    ><Link
                        to='/registerCompany'
                        style={{ color: 'white' }}
                    >
                            Đăng chỗ nghỉ của Quý vị
                        </Link>
                    </Button>
                </div>
            </div>
            {/**=========== menu end ============ */}

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
                                <li><a className="dropdown-item" href="#">Quản lí tài khoản</a></li>
                                {
                                    userInfo.accountType === 'guest' ? (
                                        <li><a className="dropdown-item" href="#">Đặt chỗ chuyến đi</a></li>
                                    ) : (
                                        <>
                                            <li><a className="dropdown-item" href="#">Khách sạn của bạn</a></li>
                                            <li><a className="dropdown-item" href="#">Quản lí phiếu đặt</a></li>
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
                            <Button style={{ backgroundColor: 'white' }}>
                                <Link
                                    to={{
                                        pathname: '/register',
                                        search: `?permission=guest`,
                                    }}
                                >Đăng kí</Link>
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
