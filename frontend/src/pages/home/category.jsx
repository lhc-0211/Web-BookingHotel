
import React, { useEffect } from 'react';
import Slider from "react-slick";
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/actions'
import './category.scss'
import ErrData from '../error/errData';

const Category = () => {

    const dispatch = useDispatch()
    const categories = useSelector((state) => state.site.categories)
    const loadingcategories = useSelector((state) => state.site.loading)



    //[GET] category
    useEffect(() => {
        dispatch(fetchCategories());
    }, []);


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
                    <div>Tìm theo loại chỗ nghỉ</div>
                    <div></div>
                </div>
                <div className='category_body'>
                    {
                        categories && categories.length > 0 ? (
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
                            </Slider>) : (
                            <ErrData />
                        )}
                </div>

            </div>
        </div>
    )
}

export default Category;