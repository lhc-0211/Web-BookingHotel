
import React, { memo, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BannerSearch from '../../components/Header/bannerSearch'
import './detailTour.scss'
import "mapbox-gl/dist/mapbox-gl.css";
import { Link } from 'react-router-dom';
import { fetchFindHotelsByCity, fetchCategories, fetchFindHotelsByCategory } from '../../store/actions';
import { useParams } from 'react-router-dom';
const DeatailTour = () => {
    //get hotel by city
    const dispatch = useDispatch();
    const { id } = useParams();

    //[GET] category
    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const hotelsFindByCity = useSelector((state) => state.hotel.hotelsFindByCity);
    const hotelsFindByCategory = useSelector((state) => state.hotel.hotelsFindByCategory);
    const categories = useSelector((state) => state.site.categories);
    const cities = useSelector((state) => state.site.cities);
    const city = cities.find(city => city.id === id);
    const [selectedInput, setSelectedInput] = useState('ALL');

    useEffect(() => {
        if (city) { // Add error handling here to check if city is defined
            dispatch(fetchFindHotelsByCity(`${id}`, `${selectedInput}`));
        }
    }, [id, selectedInput, city]);

    const handleSelectedCheck = (category) => {
        let tmp = document.querySelector(`.check_type_${category.id}`)
        if (tmp && tmp.checked === true) { // Add error handling here to check if textbox select is defined
            setSelectedInput(category.id);
        } else {
            setSelectedInput('ALL');
        }
        dispatch(fetchFindHotelsByCity(`${id}`, `${selectedInput}`));
    };

    return (
        <>

            <div className="form_search">
                <BannerSearch />
            </div>
            <div className="section_detailTour d-flex">
                <div className="left_wrapper col-md-3">
                    <div className="map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7838.684254869503!2d106.70676642475235!3d10.785086936675276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1547181657956" ></iframe>
                    </div>
                    <div className='filters_sidebar mt-2'>
                        <div>
                            <h2 className='filters_sidebar_title'>Chọn lọc theo: </h2>
                        </div>
                        <div className='used_filters'>
                            <div className='used_filters_title'>Loại chỗ ở</div>
                            <div>
                                {
                                    categories && categories.map((category, index) => (
                                        <div className='used_filters_title_check d-flex mt-2'
                                            key={index}
                                        >
                                            <input className={`check_type_${category.id}`} type="checkbox" value="" id="flexCheckDefault"
                                                style={{ flex: ' 0 0 auto', }}
                                                onClick={() => handleSelectedCheck(category)}
                                            />
                                            <div
                                                style={{
                                                    fontSize: '13px',
                                                    fontWeight: '400',
                                                    lineHeight: '20px',
                                                    marginLeft: '5px',
                                                    flex: ' 1 1 auto',
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-end',
                                                        justifyContent: 'space-between',

                                                    }}
                                                >
                                                    <div className="form-check-label" >
                                                        {category.categoryName}
                                                    </div>
                                                    <span>{hotelsFindByCategory.length}</span>
                                                </div>

                                            </div>
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
                <div className="right_wrapper col-md-9">
                    <div className="title_right">
                        {city ? ( // Add error handling here to check if city is defined
                            `${city.cityName}  : tìm thấy ${hotelsFindByCity.length} chỗ nghỉ`
                        ) : null}
                    </div>
                    <button className='btn_arrange'>Sắp xếp theo lựa chọn hàng đầu của chúng tôi</button>
                    {
                        hotelsFindByCity.length !== 0 ? hotelsFindByCity && (hotelsFindByCity.map((hotel, index) => (
                            <div className="card_hotel" key={index}>
                                <div className="card_hotel_children">
                                    <Link to={{
                                        pathname: `/hotel/${hotel.id}`,
                                        search: `?selectedHotel=${encodeURIComponent(hotel.hotelName)}`,
                                    }}>
                                        <div className="detail_card d-flex" >
                                            <img src={hotel.imageUrl} alt="" className='avatar_hotel' />
                                            <div className="title_hotel d-flex flex-column">
                                                <Link className='name_hotel'>{hotel.hotelName}</Link>
                                                <Link
                                                    style={{
                                                        fontSize: '12px',
                                                        fontWeight: '400',
                                                        lineHeight: '18px'
                                                    }}>{hotel.cityHotel.cityName}</Link>
                                                <div
                                                    style={{
                                                        fontSize: '12px',
                                                        fontWeight: '400',
                                                        lineHeight: '18px',
                                                        color: 'black'
                                                    }}
                                                >{hotel.description}</div>
                                            </div>
                                            <div className='rate_charge'>
                                                <div className='d-flex'>
                                                    <div className='d-flex flex-column'
                                                        style={{
                                                            marginRight: '5px'
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                fontSize: '16px',
                                                                fontWeight: '500',
                                                                lineHeight: '24px'
                                                            }}
                                                        >Tuyệt hảo</div>
                                                        <div
                                                            style={{
                                                                fontSize: '12px',
                                                                fontWeight: '400',
                                                                lineHeight: '18px'
                                                            }}
                                                        >178 đánh giá</div>
                                                    </div>
                                                    <div
                                                        style={{
                                                            marginTop: '5px',
                                                            backgroundColor: '#003b95',
                                                            color: '#fff',
                                                            borderRadius: '5px',
                                                            padding: '5px'
                                                        }}
                                                    >9,3</div>
                                                </div>
                                                <button
                                                    className='mt-3'
                                                    style={{
                                                        borderRadius: '5px',
                                                    }}
                                                >Hiển thị giá</button>
                                            </div>
                                        </div >
                                    </Link>

                                </div>
                            </div>
                        ))) : (<div>Not Found</div>)
                    }

                </div>
            </div >
        </>
    )
}

export default DeatailTour;