
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Operation from '../pages/operations/happeningToday'
import FormSearch from '../pages/formSearch/formSearch'
import Performance from "../pages/performance/efficiency"
import { fetchFindHotelsByCompany } from '../../../../store/actions';
import ListHotel from "./listHotel";

// import Extentions from "./operations/extentions";
import './tabNav.scss'

const TabNab = () => {
    const extensions = [
        {
            title: 'Hoạt động',
            link: ''
        },
        {
            title: 'Đơn đặt',
            link: ''
        },
        {
            title: 'Hiệu suất',
            link: ''

        },
        {
            title: 'Cài đặt',
            link: ''
        }
    ]

    const { isLoggedIn, userInfo } = useSelector((state) => state.user);
    const hotelsFindByCompany = useSelector((state) => state.hotel.hotelsFindByCompany);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFindHotelsByCompany(`${userInfo.id}`));
    }, []);


    const [selectedButton, setSelectedButton] = useState(0)
    const [selectedName, setSelectedName] = useState(0)


    const handleToggle = (name, index) => {
        setSelectedButton(index)
        setSelectedName(name)
    }

    return (
        <div className="bui-tab__nav mt-4">
            <FormSearch />
            <div className="bui-tab__nav-container d-flex align-items-center">
                {
                    extensions.map((extension, index) => (
                        <div className="bui-tab__item" key={index}>
                            <Link>
                                <Button
                                    className={`bui-tab__item-btn ${selectedButton === index ? 'bui-tab__item-btn__isActive ' : ''}`}
                                    outline
                                    onClick={() => handleToggle(extension.title, index)}
                                >
                                    <span className="bui-tab__item-title">{extension.title}</span>
                                    {index >= 2 && (
                                        <span className="peg__new-badge">
                                            <span>Mới</span>
                                        </span>
                                    )}
                                </Button>
                            </Link>
                        </div>
                    ))
                }

            </div>
            <div className="bui-tab__content">
                {
                    selectedButton === 0 && (
                        <>
                            <Operation />
                            <div className="bui-tab__table">
                                <ListHotel />
                            </div>
                        </>


                    )
                }
                {
                    selectedName === 'Hiệu suất' && (
                        <Performance />
                    )
                }
            </div>

            <div className='bui-card-question'>
                <div className="bui-card-question__content d-flex">
                    <div className="bui-card__content--title">
                        Phản hồi của Quý vị rất quan trọng với chúng tôi. Quý vị thấy dữ liệu này có hữu ích không?
                    </div>
                    <i className="ri-thumb-up-line icon-question__custom"></i>
                    <i className="ri-thumb-down-line icon-question__custom"></i>
                </div>
            </div>
        </div>
    )
}

export default TabNab;