
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleCUDGuest, handleCUDCompany, fetchCities, fetchGuests, fetchCompanies } from '../../store/actions';
import HeaderLogRes from '../../components/Header/headerLogRes';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { isEmailValid } from '../../unity'

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const [companyName, setCompanyName] = useState('');
    const [companyAddress, setCompanyAddress] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);

    const [validateEmail, setValidateEmail] = useState('')

    const [registrationStep, setRegistrationStep] = useState(1);

    const [action, setAction] = useState('CREATE');

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    //check string ''
    const [isInputsValid, setIsInputsValid] = useState(false);
    //check username, email, password
    const [isInputsValidUsername, setIsInputsValidUsename] = useState(false);
    const [isInputsValidEmail, setIsInputsValidEmail] = useState(false);
    const [isInputsValidPassword, setIsInputsValidPassword] = useState(false);
    const [isInputsValidFirstname, setIsInputsValidFirstname] = useState(false);
    const [isInputsValidLastname, setIsInputsValidLastname] = useState(false);

    const cities = useSelector((state) => state.site.cities);
    const guests = useSelector((state) => state.guest.guests);
    const companies = useSelector((state) => state.company.companies);
    const loadingGuest = useSelector(state => state.guest.loading);
    const loadingCompany = useSelector(state => state.company.loading);

    //[GET] City
    useEffect(() => {
        dispatch(fetchCities('ALL'));
    }, []);

    //[GET] Guest
    useEffect(() => {
        dispatch(fetchGuests('ALL'));
    }, []);

    //[GET] Guest
    useEffect(() => {
        dispatch(fetchCompanies('ALL'));
    }, []);

    const guestEmail = guests.find(guest => guest.email === email);
    const guestUsername = guests.find(guest => guest.userName === username);
    const companyUsername = companies.find(company => company.userName === username);
    const companyEmail = companies.find(company => company.email === email);

    //lấy thuộc tính permission trên đường link
    const urlParams = new URLSearchParams(window.location.search);
    const permission = urlParams.get('permission');

    const dispatch = useDispatch();

    const checkInputValidity = () => {
        if (permission === 'guest') {
            if (
                (registrationStep === 1 && username.trim() !== '' && password.trim() !== '' && passwordConfirm.trim() !== '') ||
                (registrationStep === 2 && email.trim() !== '' && firstname.trim() !== '' && lastname.trim() !== '') ||
                (registrationStep === 3 && address.trim() !== '' && phone.trim() !== '')
            ) {
                setIsInputsValid(true);
            } else {
                setIsInputsValid(false);
            }
        }
        if (permission === 'company') {
            if (
                (registrationStep === 1 && username.trim() !== '' && password.trim() !== '' && passwordConfirm.trim() !== '') ||
                (registrationStep === 2 && email.trim() !== '' && companyName.trim() !== '') ||
                (registrationStep === 3 && address.trim() !== '' && selectedCity && selectedCity.value && selectedCity.value.trim() !== '')
            ) {
                setIsInputsValid(true);
            } else {
                setIsInputsValid(false);
            }
        }

    };

    useEffect(() => {
        checkInputValidity();
    }, [registrationStep, username, password, passwordConfirm, email,
        firstname, lastname, address, phone,
        permission,
        companyName, selectedCity?.value]);


    const handleOnchangeCompanyName = (e) => {
        setCompanyName(e.target.value);
    };

    // // const handleOnchangeCityId = (e) => {
    // //     setCityId(e.target.value);
    // // };
    // Chuyển đổi danh sách thanh pho thành định dạng options cho react-select
    const cityOptions = cities.map((city) => ({
        value: city.id,
        label: city.cityName,
    }));
    // Xử lý sự kiện thay đổi giá trị
    const handleCityChange = (selectedOption) => {
        setSelectedCity(selectedOption);
    };

    const handleOnchangeUsername = (e) => {
        setUsername(e.target.value);
        setIsInputsValidUsename(false);
    };

    const handleOnChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleOnChangePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
    };

    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value);
        setIsInputsValidEmail(false);
    };

    const handleOnchangeFirstname = (e) => {
        setFirstname(e.target.value);
        setIsInputsValidFirstname(false);
    };

    const handleOnchangeLastname = (e) => {
        setLastname(e.target.value);
        setIsInputsValidLastname(false);
    };

    const handleOnchangeAddress = (e) => {
        setAddress(e.target.value);

    };

    const handleOnchangePhone = (e) => {
        setPhone(e.target.value);
    };

    const handleNextStep = () => {
        setRegistrationStep((prevStep) => prevStep + 1);
    };

    const handleSubmit = async () => {
        if (registrationStep < 3) {
            if (registrationStep === 1) {
                if (guestUsername || companyUsername) {
                    // Username already exists
                    setIsInputsValidUsename(true);
                    return; // Don't proceed further
                }
                if (password !== passwordConfirm) {
                    // Passwords don't match
                    setIsInputsValidPassword(true);
                    return; // Don't proceed further
                }
            }
            else if (registrationStep === 2) {
                const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
                if (guestEmail || companyEmail || !emailRegex.test(email)) {
                    setIsInputsValidEmail(true);
                    return; // Don't proceed further
                }
                // const nameRegex = /^[A-Za-z\s]+$/;
                // if (!nameRegex.test(firstname)) {
                //     setIsInputsValidFirstname(true);
                //     return;
                // }
                // if (!nameRegex.test(lastname)) {
                //     setIsInputsValidLastname(true);
                //     return;
                // }
            }
            handleNextStep();
            setIsInputsValidUsename(false); // Reset username error if any
            setIsInputsValidEmail(false);// Reset email error if any
            setIsInputsValidPassword(false); // Reset password error if any
            setIsInputsValidFirstname(false); // Reset name error if any
            setIsInputsValidLastname(false); // Reset name error if any

        }

        if (registrationStep === 3) {
            if (permission === 'guest') {
                await dispatch(
                    handleCUDGuest('CREATE', {
                        userName: username,
                        password: password,
                        email: email,
                        firstName: firstname,
                        lastName: lastname,
                        address: address,
                        phone: phone,
                    })
                );
            }
            else if (permission === 'company') {
                await dispatch(
                    handleCUDCompany('CREATE', {
                        userName: username,
                        password: password,
                        email: email,
                        companyName: companyName,
                        companyAddress: companyAddress,
                        phone: phone,
                        cityId: selectedCity.value,
                    })
                );
            }
            setRegistrationSuccess(true); // Set registration success to true
        }

    };

    return (
        <>
            <div className="header_login">
                <HeaderLogRes />
            </div>
            {registrationSuccess ? (
                <div className="login-background">
                    <div className='login-container'>
                        <h2>Đăng kí thành công!</h2>
                        <p>Bây giờ bạn có thể đăng nhập bằng tài khoản mới của mình.</p>
                        <Button
                            className="btn-login col-md-12 mt-3"
                            style={{ padding: '8px 16px' }}
                            color="primary"
                            outline
                        >
                            <Link to="/login">Đăng nhập</Link>
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="login-background">
                    <div className="login-container">
                        {permission === 'guest' && (
                            <>
                                <div className="title_login">
                                    {registrationStep === 1 ? 'Tạo Tài khoản Booking' : 'Thông tin cá nhân'}
                                </div>
                                {registrationStep === 1 && ( // Corrected condition
                                    <div>
                                        <div className="form_group d-flex flex-column mt-4">
                                            <label htmlFor="" className="lable_input">
                                                Tài khoản
                                            </label>
                                            <input
                                                type="text"
                                                className="usreName"
                                                onChange={handleOnchangeUsername}
                                            />
                                            {isInputsValidUsername && (
                                                <div className='d-flex flex-row'
                                                    style={{
                                                        color: '#d4111e',
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        lineHeight: '20px',
                                                        fontFamily: 'BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
                                                    }}
                                                >
                                                    <div style={{ padding: '1px 2px' }}> <i className="ri-spam-2-fill"></i></div>
                                                    <div>Quý vị đã có tài khoản đăng ký với tài khoản này: {username}. Quý vị có thể <Link to='/login' style={{ fontWeight: '700' }}>đăng nhập</Link> trực tiếp.</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="form_group d-flex flex-column mt-2">
                                            <label htmlFor="" className="lable_input">
                                                Mật khẩu
                                            </label>
                                            <input
                                                type="password"
                                                className="password"
                                                onChange={handleOnChangePassword}
                                            />
                                            {
                                                password && (
                                                    <>
                                                        <label htmlFor="" className="lable_input mt-2">
                                                            Nhập lại mật khẩu
                                                        </label>
                                                        <input
                                                            type="password"
                                                            className="passwordConfirm"
                                                            onChange={handleOnChangePasswordConfirm}
                                                        />
                                                        {isInputsValidPassword && password !== passwordConfirm && (
                                                            <div className='d-flex flex-row'
                                                                style={{
                                                                    color: '#d4111e',
                                                                    fontSize: '14px',
                                                                    fontWeight: '400',
                                                                    lineHeight: '20px',
                                                                    fontFamily: 'BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
                                                                }}
                                                            >
                                                                <div style={{ padding: '1px 2px' }}> <i className="ri-spam-2-fill"></i></div>
                                                                <div>Mật khẩu không trùng khớp.</div>
                                                            </div>
                                                        )}
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                )}
                                {registrationStep === 2 && ( // Corrected condition
                                    <div>
                                        <div className="form_group d-flex flex-column mt-2">
                                            <label htmlFor="" className="lable_input">
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                className="email"
                                                onChange={handleOnchangeEmail}
                                            />
                                            {isInputsValidEmail && (
                                                <div className='d-flex flex-row'
                                                    style={{
                                                        color: '#d4111e',
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        lineHeight: '20px',
                                                        fontFamily: 'BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
                                                    }}
                                                >
                                                    <div style={{ padding: '1px 2px' }}> <i className="ri-spam-2-fill"></i></div>
                                                    <div>{guestEmail || companyEmail ? (
                                                        `Email này: ${email} đã được sử dụng. Quý vị vui lòng sử dụng Email khác.`
                                                    ) : (
                                                        'Định dạng email không hợp lệ.'
                                                    )}</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="form_group d-flex flex-column mt-2">
                                            <label htmlFor="" className="lable_input">
                                                Họ
                                            </label>
                                            <input
                                                type="text"
                                                className="firstname"
                                                onChange={handleOnchangeFirstname}
                                            />
                                            {isInputsValidFirstname && (
                                                <div className='d-flex flex-row'
                                                    style={{
                                                        color: '#d4111e',
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        lineHeight: '20px',
                                                        fontFamily: 'BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
                                                    }}
                                                >
                                                    <div style={{ padding: '1px 2px' }}> <i className="ri-spam-2-fill"></i></div>
                                                    <div>Vui lòng nhập đúng định dạng.Quý vị không được nhập số và các kí tự đặc biệt.</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="form_group d-flex flex-column mt-2">
                                            <label htmlFor="" className="lable_input">
                                                Tên
                                            </label>
                                            <input
                                                type="text"
                                                className="lastname"
                                                onChange={handleOnchangeLastname}
                                            />
                                            {isInputsValidLastname && (
                                                <div className='d-flex flex-row'
                                                    style={{
                                                        color: '#d4111e',
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        lineHeight: '20px',
                                                        fontFamily: 'BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
                                                    }}
                                                >
                                                    <div style={{ padding: '1px 2px' }}> <i className="ri-spam-2-fill"></i></div>
                                                    <div>Vui lòng nhập đúng định dạng.Quý vị không được nhập số và các kí tự đặc biệt.</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                                {registrationStep === 3 && ( // Corrected condition
                                    <div>
                                        <div className="form_group d-flex flex-column mt-2">
                                            <label htmlFor="" className="lable_input">
                                                Địa chỉ
                                            </label>
                                            <input
                                                type="text"
                                                className="address"
                                                onChange={handleOnchangeAddress}
                                            />
                                        </div>
                                        <div className="form_group d-flex flex-column mt-2">
                                            <label htmlFor="" className="lable_input">
                                                Phone
                                            </label>
                                            <input
                                                type="text"
                                                className="phone"
                                                onChange={handleOnchangePhone}
                                            />
                                        </div>
                                    </div>
                                )}
                            </>


                        )}
                        {permission === 'company' && (
                            <>
                                <div className="title_login">
                                    {registrationStep === 1 ? 'Tạo tài khoản đối tác' : 'Thông tin cá nhân'}
                                </div>
                                <div
                                    className='mt-2'
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        lineHeight: '20px',
                                    }}
                                >Tạo tài khoản để đăng ký và quản lý chỗ nghỉ
                                </div>
                                {registrationStep === 1 && ( // Corrected condition
                                    <div>
                                        <div className="form_group d-flex flex-column mt-4">
                                            <label htmlFor="" className="lable_input">
                                                Tài khoản
                                            </label>
                                            <input
                                                type="text"
                                                className="usreName"
                                                onChange={handleOnchangeUsername}
                                            />
                                            {isInputsValidUsername && (
                                                <div className='d-flex flex-row'
                                                    style={{
                                                        color: '#d4111e',
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        lineHeight: '20px',
                                                        fontFamily: 'BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
                                                    }}
                                                >
                                                    <div style={{ padding: '1px 2px' }}> <i className="ri-spam-2-fill"></i></div>
                                                    <div>Quý vị đã có tài khoản đăng ký với tài khoản này: {username}. Quý vị có thể <Link to='/login' style={{ fontWeight: '700' }}>đăng nhập</Link> trực tiếp.</div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="form_group d-flex flex-column mt-2">
                                            <label htmlFor="" className="lable_input">
                                                Mật khẩu
                                            </label>
                                            <input
                                                type="password"
                                                className="password"
                                                onChange={handleOnChangePassword}
                                            />
                                            {
                                                password && (
                                                    <>
                                                        <label htmlFor="" className="lable_input mt-2">
                                                            Nhập lại mật khẩu
                                                        </label>
                                                        <input
                                                            type="password"
                                                            className="passwordConfirm"
                                                            onChange={handleOnChangePasswordConfirm}
                                                        />
                                                        {isInputsValidPassword && password !== passwordConfirm && (
                                                            <div className='d-flex flex-row'
                                                                style={{
                                                                    color: '#d4111e',
                                                                    fontSize: '14px',
                                                                    fontWeight: '400',
                                                                    lineHeight: '20px',
                                                                    fontFamily: 'BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
                                                                }}
                                                            >
                                                                <div style={{ padding: '1px 2px' }}> <i className="ri-spam-2-fill"></i></div>
                                                                <div>Mật khẩu không trùng khớp.</div>
                                                            </div>
                                                        )}
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                )}
                                {registrationStep === 2 && ( // Corrected condition
                                    <div>
                                        <div className="form_group d-flex flex-column mt-2">
                                            <label htmlFor="" className="lable_input">
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                className="email"
                                                onChange={handleOnchangeEmail}
                                            />
                                            {isInputsValidEmail && (
                                                <div className='d-flex flex-row'
                                                    style={{
                                                        color: '#d4111e',
                                                        fontSize: '14px',
                                                        fontWeight: '400',
                                                        lineHeight: '20px',
                                                        fontFamily: 'BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif'
                                                    }}
                                                >
                                                    <div style={{ padding: '1px 2px' }}> <i className="ri-spam-2-fill"></i></div>
                                                    <div>
                                                        {guestEmail || companyEmail ? (
                                                            `Email này: ${email} đã được sử dụng. Quý vị vui lòng sử dụng Email khác.`
                                                        ) : (
                                                            'Định dạng email không hợp lệ.'
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="form_group d-flex flex-column mt-2">
                                            <label htmlFor="" className="lable_input">
                                                Tên công ty
                                            </label>
                                            <input
                                                type="text"
                                                className="companyName"
                                                onChange={handleOnchangeCompanyName}
                                            />
                                        </div>
                                    </div>
                                )}
                                {registrationStep === 3 && ( // Corrected condition
                                    <div>
                                        <div className="form_group d-flex flex-column mt-2">
                                            <label htmlFor="" className="lable_input">
                                                Vị trí
                                            </label>
                                            <input
                                                type="text"
                                                className="companyAddress"
                                                onChange={handleOnchangeAddress}
                                                placeholder='Số nhà, tổ/xóm, huyện/quận'
                                            />
                                        </div>
                                        <div className="form_group d-flex flex-column mt-2">
                                            <label htmlFor="" className="lable_input">
                                                Thành phố
                                            </label>
                                            <Select
                                                className='cityName_select'
                                                options={cityOptions}
                                                value={selectedCity}
                                                onChange={handleCityChange}
                                            />
                                        </div>
                                    </div>
                                )}
                            </>

                        )}

                        <Button
                            className={`btn_submit col-md-12 mt-3 ${isInputsValid ? '' : 'disabled-button'}`}
                            style={{ background: '#0071c2', padding: '8px 16px' }}
                            onClick={handleSubmit}
                            disabled={!isInputsValid}
                        >
                            {registrationStep >= 3 ? 'Đăng kí' : 'Tiếp tục'}
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
                        <Button
                            className="btn_register_company col-md-12 mt-3"
                            style={{ padding: '8px 16px' }}
                            color="primary"
                            outline
                        >
                            {permission === 'company' ? (
                                <Link
                                    to='/login'
                                >Đăng nhập</Link>
                            ) : (
                                <Link
                                    to={{
                                        pathname: '/register',
                                        search: `?permission=company`,
                                    }}
                                >
                                    Đăng kí đối tác
                                </Link>
                            )}
                        </Button>
                        <div className='detail_login mt-4'>Qua việc đăng nhập hoặc tạo tài khoản, bạn đồng ý với các <span style={{ color: '#006ce4' }}>Điều khoản và Điều kiện</span> cũng như <span style={{ color: '#006ce4' }}>Chính sách An toàn và Bảo mật của chúng tôi</span></div>
                        <div className="detail_login mt-2">
                            <div>Bảo lưu mọi quyền</div>
                            <div>Bản quyền (2006 - 2023) - Booking.com™</div>
                        </div>
                    </div>
                </div>
            )}

            {loadingGuest && (
                <div className="overlay">
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                </div>
            )}
            {loadingCompany && (
                <div className="overlay">
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                </div>
            )}
        </>

    );
};

export default Register;
