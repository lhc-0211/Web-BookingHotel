
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchFindCities } from '../../store/actions';
import Slider from "react-slick";
import './tour.scss';
import '../../assets/scss/style.scss'
import './tripTypesCarousel.scss'

import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'



const TypesCarousel = () => {
    const dispatch = useDispatch();
    const citiesFind = useSelector((state) => state.site.citiesFind);
    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: citiesFind && citiesFind.length >= 6 ? Math.min(citiesFind.length, 6) : Math.min(0, citiesFind.length),
        slidesToScroll: 1,
        arrows: citiesFind && citiesFind.length >= 6 ? true : false,
        centerPadding: '0px',
    };


    const extensions = [
        {
            title: 'Bãi biển',
            classIcon: 'ri-hotel-bed-line'
        },
        {
            title: 'Thành phố',
            classIcon: "ri-hotel-line"
        },
        {
            title: 'Lãng mạn ',
            classIcon: 'ri-earth-line'
        },
        {
            title: 'Thiên nhiên',
            classIcon: 'ri-car-fill'
        },
        {
            title: 'Thư giãn',
            classIcon: 'ri-creative-commons-by-line'
        },

    ]

    const [isToggel, setToggle] = useState(false)
    const [selectedButton, setSelectedButton] = useState('Bãi biển')

    const handleToggle = (extension) => {
        setSelectedButton(extension.title)
        setToggle(!isToggel)
        dispatch(fetchFindCities(`${extension.title}`));
    }

    //[GET] City
    useEffect(() => {
        dispatch(fetchFindCities(`${selectedButton}`));
    }, []);

    return (
        <div className='section_city'>
            <div className='city_container'>
                <div className="title_content d-flex">
                    <div>Lên kế hoạch dễ dàng và nhanh chóng</div>
                    <div>Khám phá các điểm đến hàng đầu theo cách bạn thích ở Việt Nam</div>
                </div>
                <div className="extension_position_wrapper d-flex align-items-center gap-2">
                    {
                        extensions.map((extension, index) => (
                            <Link key={index}
                            >
                                <div className="extension_position gap-2" >
                                    <Button
                                        className={`d-flex align-items-center justify-content-between secondary_custom ${selectedButton === extension.title ? 'btn-secondary__isActive_position  ' : ''}`}
                                        onClick={() => handleToggle(extension)}
                                        outline
                                        color="link"
                                    >
                                        <i className={`${extension.classIcon} icon_position`}></i>
                                        <span className='titel_position'>{extension.title}</span>

                                    </Button>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <div className='city_body'>
                    <Slider {...settings}>
                        {Array.isArray(citiesFind) ? (
                            citiesFind.map((city, index) => (
                                <Link key={index}
                                    to={`/tour/${city.id}`}>
                                    <div className='img_customize' key={index}>
                                        <div
                                            className='img_city'
                                            style={{
                                                backgroundImage: `url(${city.imageUrl})`
                                            }}
                                        ></div>
                                        <div className='title_img' style={{ color: 'black' }}>{city.cityName}</div>
                                    </div>
                                </Link>

                            ))
                        ) : (
                            <Link
                                to={`/tour/${citiesFind.id}`}>
                                <div className='img_customize'>
                                    <div
                                        className='img_city'
                                        style={{
                                            backgroundImage: `url(${citiesFind.imageUrl})`
                                        }}
                                    ></div>
                                    <div className='title_img' style={{ color: 'black' }}>{citiesFind.cityName}</div>
                                </div>
                            </Link>

                        )}
                    </Slider>
                </div>

            </div>
        </div>
    )
}

export default TypesCarousel