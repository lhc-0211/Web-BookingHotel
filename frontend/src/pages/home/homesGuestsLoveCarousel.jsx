
import React, { useEffect } from 'react';
import Slider from "react-slick";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/actions'
import './category.scss'

const HomesGuestsLoveCarousel = () => {

    const dispatch = useDispatch()
    const categories = useSelector((state) => state.site.categories)



    // //[GET] City
    // useEffect(() => {
    //     dispatch(fetchCategories());
    // }, []);


    var settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
    };


    return (
        <div className='section_category'>
            <div className='category_container'>
                <div className="title_content d-flex">
                    <div>Nhà ở mà khách yêu thích</div>
                    <div></div>
                </div>
                <div className='category_body'>
                    <Slider {...settings}>
                        {
                            categories && categories.map((category, index) => {
                                return (
                                    <div className='img_customize' key={index}>
                                        <div className='img_category'
                                            style={{
                                                backgroundImage: `url(${category.imageUrl})`
                                            }}
                                        >
                                        </div>
                                        <div className='title_img'>{category.categoryName}</div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>

            </div>
        </div>
    )
}

export default HomesGuestsLoveCarousel;