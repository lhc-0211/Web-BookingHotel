
import React from 'react';
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../../assets/scss/style.scss';
import './geniusSignInBanner.scss';
import Img_GlobeGeniusBadge from '../../assets/images/GlobeGeniusBadge.png';

const GeniusSignInBanner = () => {
    return (
        <div className='section_geniusSignInBanner'>
            <div className='geniusSignInBanner_container '>
                <div className='detail_geniusSignInBanner d-flex justify-content'>
                    <div className='img_GlobeGeniusBadge'>
                        <img src={Img_GlobeGeniusBadge} alt="" className='img_GlobeGeniusBadge_custom' />
                    </div>
                    <div className='d-flex flex-column'>
                        <div className="title_content d-flex col-md-7">
                            <div>Nhận giảm giá tức thì</div>
                            <div>Chỉ cần đăng nhập tài khoản Booking.com của bạn và tìm logo Genius màu xanh dương để tiết kiệm</div>

                        </div>
                        <div className='mt-2'>
                            <Link
                                color="primary"
                                style={{
                                    margin: '5px',
                                    border: '1px solid #006ce4',
                                    padding: '8px',
                                    borderRadius: '5px',
                                }}
                                to='/login'
                            >
                                Đăng nhập
                            </Link>
                            <Link
                                color="primary"
                                style={{
                                    margin: '5px',
                                    border: '1px solid #006ce4',
                                    padding: '8px',
                                    borderRadius: '5px',
                                }}
                                to={{
                                    pathname: '/register',
                                    search: `?permission=guest`,
                                }}
                            >
                                Đăng kí
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default GeniusSignInBanner;