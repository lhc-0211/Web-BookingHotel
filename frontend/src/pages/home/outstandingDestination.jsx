
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import logovn from '../../assets/images/logovnheader.png'
import './outstandingDestination.scss'
import '../../assets/scss/style.scss'
import Slider from "react-slick";
import { fetchCities } from '../../store/actions';
import { Link } from 'react-router-dom';


const Destinaton = () => {
    var settingTop = {
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
    };

    var settingBottom = {
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
    };

    const dispatch = useDispatch();
    const cities = useSelector((state) => state.site.cities);

    const selectedCitiesTop = cities.filter(city => city.cityName === 'Đà Nẵng' || city.cityName === 'Hội An');
    const selectedCitiesBottom = cities.filter(city => city.cityName === 'Hà Nội' || city.cityName === 'TP. Hồ Chí Minh' || city.cityName === 'Huế');

    //[GET] City
    useEffect(() => {
        dispatch(fetchCities('ALL'));
    }, []);

    return (
        <div className='section_destination'>
            <div className="title_content d-flex">
                <div>Điểm đến đang thịnh hành</div>
                <div>Các lựa chọn phổ biến nhất cho khách du lịch Việt Nam</div>
            </div>
            <div className='section_destination_top '>
                <Slider {...settingTop}>
                    {
                        selectedCitiesTop && selectedCitiesTop.map((city, index) => {
                            return (
                                <Link key={index}
                                    to={`/tour/${city.id}`}
                                >
                                    <div>
                                        <div className='destination_childen'
                                            style={{
                                                backgroundImage: `url(${city.imageUrl})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundRepeat: 'no-repeat',
                                            }}
                                        >
                                            <div className='destination_title'>
                                                <span className='title-destination'>{city.cityName}</span>
                                                <img src={logovn} className='logo'></img>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            )
                        })}
                </Slider>
            </div >
            <div className='section_destination_bottom'>
                <Slider {...settingBottom}>
                    {
                        selectedCitiesBottom && selectedCitiesBottom.map((city, index) => {
                            return (
                                <Link key={index}
                                    to={{
                                        pathname: `/tour/${city.id}`,
                                        search: `?selectedCity=${encodeURIComponent(city.cityName)}`,
                                    }}>
                                    <div>
                                        <div className='destination_childen_second'
                                            style={{
                                                backgroundImage: `url(${city.imageUrl})`,
                                                backgroundRepeat: 'no - repeat',
                                                backgroundPosition: 'center', /* Căn giữa ảnh trong phần tử */
                                            }}
                                        >
                                            <div className='destination_title'>
                                                <span className='title-destination'>{city.cityName}</span>
                                                <img src={logovn} className='logo'></img>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            )
                        })}
                </Slider>

            </div>
        </div >
    )
}

export default Destinaton;