
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleLoginApi } from '../../services/userService';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginSuccess } from '../../store/actions';
import HeaderLogRes from '../../components/Header/headerLogRes';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap'
import './login.scss'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { isLoggedIn, userInfo } = useSelector((state) => state.user);

    // // const [showPassword, setShowPassword] = useState(false);
    const [errMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnchangeUsername = (e) => {
        setUsername(e.target.value)
    }

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value)
    }

    // const handleOnChangeShowPassword = (e) => {
    //     setShowPassword(!showPassword)
    // }

    useEffect(() => {
        // Khi component được tạo, kiểm tra nếu userInfo có sẵn và là admin, thì chuyển hướng đến '/admin/home'
        if (userInfo && userInfo.accountType === 'admin') {
            navigate('/admin/home');
        } else if (userInfo && userInfo.accountType === 'guest') {
            navigate('/');
        } else if (userInfo && userInfo.accountType === 'company') {
            navigate('/hoteladmin/home')
        }
    }, [userInfo, navigate]);

    const handleLogin = async () => {
        setErrorMessage('')
        try {
            let data = await handleLoginApi(username, password)
            if (data && data.errCode !== 0) {
                setErrorMessage(data.message)
            }
            if (data && data.errCode === 0) {
                dispatch(userLoginSuccess(data.user));
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userInfo', JSON.stringify(data.user));
            }

        } catch (e) {
            if (e.response && e.response.data) {
                setErrorMessage(e.response.data.message)
            }
        }
    }

    return (
        <>
            <div className="header_login">
                <HeaderLogRes />
            </div>
            <div className='login-background'>
                <div className='login-container'>
                    <div className='title_login'>Đăng nhập</div>
                    <div className="form_group d-flex flex-column mt-4">
                        <label htmlFor="" className='lable_input'>Tài khoản</label>
                        <input type="text" className='usreName'
                            onChange={handleOnchangeUsername}
                        />
                    </div>
                    <div className="form_group d-flex flex-column mt-2">
                        <label htmlFor="" className='lable_input'>Mật khẩu</label>
                        <input type="password"
                            onChange={handleOnChangePassword}
                        />
                    </div>
                    <div
                        style={{
                            color: 'red'
                        }}
                    >{errMessage}</div>
                    <Button className="btn_submit col-md-12 mt-3" style={{ padding: '8px 16px' }}
                        onClick={() => handleLogin()}
                    >
                        Đăng nhập
                    </Button>
                    <div className='title_logis col-md-12 mt-3 justify-content-center'>____hoặc sử dụng một trong các lựa chọn này____</div>
                    <div className="icon_login col-md-12 d-flex flex-row justify-content-around mt-4">
                        <div className='detail_icon'>
                            <i className="ri-facebook-box-fill"></i>
                        </div>
                        <div className='detail_icon'>
                            <i className="ri-google-fill"></i>
                        </div>
                        <div className='detail_icon'>
                            <i className="ri-instagram-fill"></i>
                        </div>
                    </div>
                    <div className='title_login_dicfical mt-4' style={{ color: '#006ce4' }}>Nhiều cách đăng nhập khác</div>
                    <div className='detail_login mt-2'>Qua việc đăng nhập hoặc tạo tài khoản, bạn đồng ý với các <span style={{ color: '#006ce4' }}>Điều khoản và Điều kiện</span> cũng như <span style={{ color: '#006ce4' }}>Chính sách An toàn và Bảo mật của chúng tôi</span></div>
                    <div className="detail_login mt-2">
                        <div>Bảo lưu mọi quyền</div>
                        <div>Bản quyền (2006 - 2023) - Booking.com™</div>
                    </div>
                </div>
            </div >
        </>


    )
}

export default Login;
