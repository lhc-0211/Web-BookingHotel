
import React, { useEffect } from 'react';
import Slider from "react-slick";
import { useSelector, useDispatch } from 'react-redux';
import { fetchHotels } from '../../store/actions'
import { Link } from 'react-router-dom';
// import './category.scss'
import './uniqueStaysProperties.scss'
import ErrData from '../error/errData';

const UniqueStaysProperties = () => {

    const dispatch = useDispatch()
    const hotels = useSelector((state) => state.hotel.hotels)

    //[GET] City
    useEffect(() => {
        dispatch(fetchHotels());
    }, []);


    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: hotels && hotels.length >= 4 ? Math.min(hotels.length, 4) : Math.min(0, hotels.length),
        arrows: hotels && hotels.length >= 4 ? true : false,
        slidesToScroll: 1,
        initialSlide: 0,
    };


    return (
        <div className='section_hotel'>
            <div className='hotel_container'>
                <div className="title_content d-flex">
                    <div>Lưu trú tại các chỗ nghỉ độc đáo hàng đầu</div>
                    <div>Từ biệt thự, lâu đài cho đến nhà thuyền, igloo, chúng tôi đều có hết</div>
                </div>
                <div className='hotel_body'>{
                    hotels && hotels.length > 0 ? (
                        <Slider {...settings}>
                            {
                                hotels && hotels.map((hotel, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            to={{
                                                pathname: `/hotel/${hotel.id}`,
                                                search: `?selectedHotel=${encodeURIComponent(hotel.hotelName)}`,
                                            }}

                                        >
                                            <div className='hotel_card'
                                                style={{ color: 'black' }}
                                            >
                                                <div className='img_customize' >
                                                    <div className='img_hotel'
                                                        style={{
                                                            backgroundImage: `url(${hotel.imageUrl})`
                                                        }}
                                                    >
                                                    </div>
                                                    <div className='title_hotel_card'>
                                                        <div className='title_img'>{hotel.hotelName}</div>
                                                        {/* <div className='title_city'>{hotel.cityHotel.cityName}</div> */}
                                                        <div className="rate_hotel d-flex justify-content align-items-center">
                                                            <div className='title_rate' style={{ marginRight: '5px' }}>8.3</div>
                                                            <div className='title_rate_title'>Rất tốt.90 đánh giá</div>
                                                        </div>

                                                    </div>


                                                </div>
                                            </div>
                                        </Link>


                                    )
                                })
                            }
                        </Slider>
                    ) : (
                        <ErrData />
                    )}

                </div>

            </div>
        </div>
    )
}

export default UniqueStaysProperties;