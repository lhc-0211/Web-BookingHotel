import React from "react";
import Slider from "react-slick";

import './promoSection.scss';
import img1 from '../../assets/images/background-secondary-banner.jpeg'

import { Button } from 'reactstrap'

const PromoSection = () => {

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
    };

    return (
        <div className="promo_section">
            <div className="title_content d-flex">
                <div>Ưu đãi</div>
                <div>Khuyến mãi, giảm giá và ưu đãi đặc biệt dành cho bạn</div>
            </div>
            <div className="promo_silde">
                <Slider {...settings}>
                    <div>
                        <div className="secondary_banner d-flex">
                            <div className="title_secondary_banner d-flex">
                                <div className="detail_title_secondary_banner">
                                    <div>Tận hưởng kì nghỉ dài nhất của bạn</div>
                                    <div>Tìm kiếm các chỗ nghỉ cho phép lưu trú dài ngày với giá theo tháng ưu đãi.</div>
                                    <div className="btn_secondary_banner">
                                        <Button
                                            color="primary"
                                        >
                                            Tìm chỗ nghỉ
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className="img_secondary_banner">
                                <img
                                    className="custom_img_banner"
                                    src={img1}
                                    alt="Tận hưởng kỳ nghỉ dài nhất của bạn"
                                />
                            </div>

                        </div>
                    </div>
                    <div>
                        <div className="secondary_banner_second background_promotion d-flex">
                            <div className="title_secondary_banner d-flex">
                                <div className="detail_title_secondary_banner">
                                    <div>Vi vu theo cách của bạn</div>
                                    <div>Tiết kiệm ít nhất 15% cho lưu trú toàn cầu, từ nghỉ dưỡng đến phiêu lưu hoang dã</div>
                                    <div className="btn_secondary_banner">
                                        <Button
                                            color="primary"
                                        >
                                            Tìm ưu đãi mùa dịch
                                        </Button>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>

                </Slider>
            </div>

        </div>
    )
}

export default PromoSection
