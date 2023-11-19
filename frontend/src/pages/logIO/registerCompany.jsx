
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import logovn from '../../assets/images/logovnheader.png';
// import worldMap from '../assets/images/world-map-gray.png';
import { Button } from "reactstrap";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { processLogout } from '../../store/actions';
import HeaderRegisterCompany from '../../components/Header/headerRegisterCompany'


import './registerCompany.scss';
const RegisterCompany = () => {
    const { isLoggedIn, userInfo } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [active, setActive] = useState(false)
    const [title, setTitle] = useState('')
    const [categoryIndex, setCategoryIndex] = useState(0);
    const categories = useSelector((state) => state.site.categories)

    useEffect(() => {
        const interval = setInterval(() => {
            if (categories.length > 0) {
                setTitle(categories[categoryIndex].categoryName);
                setCategoryIndex((prevIndex) => (prevIndex + 1) % categories.length);
                setActive(!active)
            }
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [categoryIndex, categories]);
    const handleLogout = () => {
        dispatch(processLogout());
    };
    return (
        <div className="container_registerCompany">
            <HeaderRegisterCompany />

            <div className="wrapper_content d-flex">
                {
                    isLoggedIn && userInfo && userInfo.accountType === 'company' ? (
                        <>
                            <div className="left_content col-md-7"
                                style={{
                                    padding: '0px 60px 0px 0px',
                                }}
                            >
                                <div className="d-flex "
                                    style={{
                                        fontSize: '32px',
                                        fontWeight: '700',
                                        lineHeight: '40px',
                                        color: 'white'
                                    }}
                                >
                                    <div>{userInfo.companyName} ơi,</div>
                                    <div
                                        style={{
                                            paddingLeft: '5px'
                                        }}
                                    >chào mừng Quý vị trở lại!</div>
                                </div>
                                <div
                                    className="mt-4"
                                    style={{
                                        fontSize: '22px',
                                        fontWeight: '500',
                                        lineHeight: '28px',
                                        color: 'white'
                                    }}
                                >
                                    Có thể mất 15 phút để hoàn tất việc đăng ký chỗ nghỉ - nhấn tiếp tục để tiến hành phần còn lại
                                </div>
                            </div>
                            <div className="right_content col-md-5">
                                <div className="title_wrapper"
                                    style={{
                                        fontSize: '24px',
                                        fontWeight: '700',
                                        lineHeight: '32px',
                                    }}
                                >
                                    Tiếp tục các bước đăng ký
                                </div>
                                <div style={{
                                    borderBottom: '1px solid #808080',
                                    marginBlockEnd: '16px',
                                    paddingInlineEnd: '16px',
                                }}>
                                    <div className="d-flex flex-row align-items-center"
                                    >
                                        <i className="ri-check-line"
                                            style={{
                                                fill: '#008009',
                                                color: '#008009',
                                                fontSize: '28px',
                                                paddingRight: '10px'
                                            }}
                                        ></i>
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                lineHeight: '18px',
                                            }}
                                        >
                                            Tiếp cận nguồn khách toàn cầu
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center"
                                    >
                                        <i className="ri-check-line"
                                            style={{
                                                fill: '#008009',
                                                color: '#008009',
                                                fontSize: '28px',
                                                paddingRight: '10px'
                                            }}
                                        ></i>
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                lineHeight: '18px',
                                            }}
                                        >
                                            Nhanh chóng nhận được đơn đặt chất lượng
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center"
                                    >
                                        <i className="ri-check-line"
                                            style={{
                                                fill: '#008009',
                                                color: '#008009',
                                                fontSize: '28px',
                                                paddingRight: '10px'
                                            }}
                                        ></i>
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                lineHeight: '18px',
                                            }}
                                        >
                                            Toàn quyền kiểm soát chỗ nghỉ và tài chính
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center"
                                    >
                                        <i className="ri-check-line"
                                            style={{
                                                fill: '#008009',
                                                color: '#008009',
                                                fontSize: '28px',
                                                paddingRight: '10px'
                                            }}
                                        ></i>
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                lineHeight: '18px',
                                            }}
                                        >
                                            Dễ dàng quản lý chỗ nghỉ
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        borderBottom: '1px solid #808080',
                                        paddingBottom: '24px',
                                    }}
                                >
                                    <Button
                                        className="col-md-12"
                                        style={{
                                            padding: '12px 16px',
                                            background: '#0071c2',
                                        }}
                                    >
                                        <Link
                                            to='/become-a-host'
                                            style={{
                                                color: 'white'
                                            }}
                                        >
                                            Bắt đầu ngay
                                        </Link>
                                        <i className="ri-arrow-right-line"
                                            style={{
                                                marginTop: '5px'
                                            }}
                                        ></i>
                                    </Button>
                                </div>

                                <div
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        lineHeight: '24px',
                                    }}
                                >Quý vị đã bắt đầu quá trình đăng ký?</div>
                                <Link
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        lineHeight: '18px',
                                    }}
                                    to='/become-a-host'
                                >Tiếp tục các bước đăng kí</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="left_content col-md-7"
                                style={{
                                    padding: '0px 60px 0px 0px',
                                }}
                            >
                                <div className="d-flex flex-column"
                                    style={{
                                        fontSize: '48px',
                                        fontWeight: '700',
                                        lineHeight: '62px',
                                        color: 'white'
                                    }}
                                >
                                    <div>Đăng</div>
                                    <div
                                        style={{
                                            color: '#febb02'
                                        }}
                                    >{title}</div>
                                    <div>của Quý vị trên Booking.com</div>
                                </div>
                                <div
                                    className="mt-4"
                                    style={{
                                        fontSize: '22px',
                                        fontWeight: '500',
                                        lineHeight: '28px',
                                        color: 'white'
                                    }}
                                >
                                    Dù kinh doanh chỗ nghỉ là công việc tay trái hay toàn thời gian, đừng quên đăng kí nhà nghỉ dưỡng trên Booking.com để tiếp cận du khách khắp thế giới
                                </div>
                            </div>
                            <div className="right_content col-md-5">
                                <div className="title_wrapper"
                                    style={{
                                        fontSize: '24px',
                                        fontWeight: '700',
                                        lineHeight: '32px',
                                    }}
                                >
                                    Tăng thu nhập với lượng đơn đặt đều đặn
                                </div>
                                <div style={{
                                    borderBottom: '1px solid #808080',
                                    marginBlockEnd: '16px',
                                    paddingInlineEnd: '16px',
                                }}>
                                    <div className="d-flex flex-row align-items-center"
                                    >
                                        <i className="ri-check-line"
                                            style={{
                                                fill: '#008009',
                                                color: '#008009',
                                                fontSize: '28px',
                                                paddingRight: '10px'
                                            }}
                                        ></i>
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                lineHeight: '18px',
                                            }}
                                        >
                                            45% đối tác nhận được đơn đặt đầu tiên trong vòng 1 tuần
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center"
                                    >
                                        <i className="ri-check-line"
                                            style={{
                                                fill: '#008009',
                                                color: '#008009',
                                                fontSize: '28px',
                                                paddingRight: '10px'
                                            }}
                                        ></i>
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                lineHeight: '18px',
                                            }}
                                        >
                                            Hơn 1,1 tỉ khách lưu trú tại nhà nghỉ dưỡng từ năm 2010
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center"
                                    >
                                        <i className="ri-check-line"
                                            style={{
                                                fill: '#008009',
                                                color: '#008009',
                                                fontSize: '28px',
                                                paddingRight: '10px'
                                            }}
                                        ></i>
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                lineHeight: '18px',
                                            }}
                                        >
                                            Toàn quyền kiểm soát chỗ nghỉ và tài chính
                                        </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center"
                                    >
                                        <i className="ri-check-line"
                                            style={{
                                                fill: '#008009',
                                                color: '#008009',
                                                fontSize: '28px',
                                                paddingRight: '10px'
                                            }}
                                        ></i>
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                lineHeight: '18px',
                                            }}
                                        >
                                            Đăng kí miễn phí và chỉ mất 15 phút
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        borderBottom: '1px solid #808080',
                                        paddingBottom: '24px',
                                    }}
                                >
                                    <Button
                                        className="col-md-12"
                                        style={{
                                            padding: '12px 16px',
                                            background: '#0071c2',
                                        }}
                                    >
                                        <Link
                                            to={{
                                                pathname: '/register',
                                                search: `?permission=company`,
                                            }}
                                            style={{
                                                color: 'white'
                                            }}
                                        >
                                            Bắt đầu ngay
                                        </Link>
                                        <i className="ri-arrow-right-line"
                                            style={{
                                                marginTop: '5px'
                                            }}
                                        ></i>
                                    </Button>
                                </div>

                                <div
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        lineHeight: '24px',
                                    }}
                                >Quý vị đã bắt đầu quá trình đăng ký?</div>
                                <Link
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        lineHeight: '18px',
                                    }}
                                    to={{
                                        pathname: '/register',
                                        search: `?permission=company`,
                                    }}
                                >Tiếp tục các bước đăng kí</Link>
                            </div>
                        </>
                    )
                }


            </div >

        </div >
    )
}

export default RegisterCompany;