
import React from 'react';
import { Link } from 'react-router-dom'

import logovn from '../../assets/images/logovnheader.png';
import './headerLogRes.scss'
const HeaderLogRes = () => {
    return (
        <div className="wrapper_header">
            <div className='container_header d-flex'>
                <Link className='title_header col-md-10' to='/'>Booking.com</Link>
                <div className='extension_icon d-flex justify-content-center align-items-center col-md-2'>
                    <div className='icon_laguage'>
                        <img className='icon_laguage_deatail' src={logovn} alt="" />
                    </div>
                    <div className='icon_operate'>
                        <i className="ri-question-line"></i>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default HeaderLogRes;