import React from 'react'
import { Button } from 'reactstrap'
import './banner.scss'

import backgroundBanner from '../../assets/images/background-banner.jpeg'
import BannerSearch from './bannerSearch.jsx'

const banner = () => {
    return (
        <div className='banner_wrapper'>
            <div className="banner ">
                <div className="effect_img">
                </div>
                <img
                    className='background_img'
                    src={backgroundBanner}
                    alt='Một người lớn và hai trẻ em đang ở ngoài trời dưới ánh nắng và đi xuống bậc thềm của ngôi nhà nghỉ dưỡng
                    . Mỗi người đều mang theo ván lướt sóng và mỉm cười vui vẻ nhìn về phía xa.'
                >
                </img>

                <div className="banner-children d-flex flex-column">
                    <div className="title_wrapper">
                        <span className='title_banner'>Kì nghỉ lý tưởng</span>
                        <span className='title_banner'>chỗ nghỉ hợp gu</span>
                        <div className="discover">
                            <Button
                                color="primary"
                            >
                                Khám phá chỗ nghỉ mát
                            </Button>
                        </div>
                    </div>


                </div>

            </div>

            <BannerSearch />
        </div >
    )
}

export default banner
