
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import Slider from "react-slick";
import './tour.scss';
import '../../assets/scss/style.scss'
import { fetchFindHotelsByCity, fetchCities } from '../../store/actions';


const Tour = ({ selectedCity }) => {
    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        initialSlide: 0,
    };

    const dispatch = useDispatch();
    const cities = useSelector((state) => state.site.cities);
    const loadingCities = useSelector(state => state.site.loading);

    const [selectedCityName, setSelectedCityName] = useState('');

    const handleClickCity = (city) => {
        setSelectedCityName(city.id);
    }

    //[GET] City
    useEffect(() => {
        dispatch(fetchCities('ALL'));
    }, []);

    return (
        <div className='section_city'>
            <div className='city_container'>
                <div className="title_content d-flex">
                    <div>Khám phá Việt Nam</div>
                    <div>Các địa điểm phổ biến này có nhiều điều chờ đón bạn</div>
                </div>
                <div className='city_body'>
                    <Slider {...settings}>
                        {
                            cities && cities.map((city, index) => {
                                return (
                                    <Link
                                        key={index}
                                        to={{
                                            pathname: `/tour/${city.id}`,
                                            search: `?selectedCity=${encodeURIComponent(city.cityName)}`,
                                        }}
                                    >
                                        <div className='img_customize'

                                            onClick={() => handleClickCity(city)}
                                        >
                                            <div className='img_city'
                                                style={{
                                                    backgroundImage: `url(${city.imageUrl})`

                                                }} >
                                            </div>
                                            <div className='title_img'
                                                style={{ color: 'black' }}
                                            >{city.cityName}</div>
                                        </div>
                                    </Link>
                                )
                            })}
                    </Slider>
                </div>

            </div>
        </div>
    )
}

export default Tour