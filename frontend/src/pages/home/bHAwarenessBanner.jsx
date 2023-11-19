
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../store/actions'

import '../../assets/scss/style.scss'
import './bHAwarenessBanner.scss'
import bh_aw_cpg_main_image from '../../assets/images/bh_aw_cpg_main_image.png'

const BHAwarenessBanner = () => {
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.site.categories)

    const [title, setTitle] = useState('')
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [active, setActive] = useState(false)


    useEffect(() => {
        const interval = setInterval(() => {
            if (categories.length > 0) {
                setTitle(categories[categoryIndex].categoryName);
                setCategoryIndex((prevIndex) => (prevIndex + 1) % categories.length);
                setActive(!active)
            }
        }, 2000);

        return () => {
            clearInterval(interval);
        };
    }, [categoryIndex, categories]);


    return (
        <div className='section_bhawarenessBanner'>
            <div className='bhawarenessBanner_container'>
                <div className='first_bhawarenessBanner'>

                </div>
                <div className='second_bhawarenessBanner'>
                    <div className='second_bhawarenessBanne_content d-flex flex-column'>
                        <span>Tìm
                            <span className={`title_animation ${active !== false ? 'active' : ''}`}>
                                {title}
                            </span>
                        </span>
                        <span> cho chuyến đi tới</span>
                    </div>
                    <span className='second_bhawarenessBanne_btn'>
                        Khám phá chỗ nghỉ như ở nhà
                    </span>
                </div>
                <div className='thirth_bhawarenessBanner'>
                    <img src={bh_aw_cpg_main_image} alt="" className='thirth_bhawarenessBanner_img' />
                </div>
            </div>
        </div>
    )
}

export default BHAwarenessBanner;