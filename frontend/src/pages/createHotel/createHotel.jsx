
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderRegisterCompany from '../../components/Header/headerRegisterCompany'
import { Link } from 'react-router-dom';
import './createHotel.scss'
import { fetchCategories } from '../../store/actions';

import { Button } from 'reactstrap';
const CreateHotel = () => {

    const categories = useSelector((state) => state.site.categories);
    const dispatch = useDispatch();


    //[GET] Category
    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    return (
        <>
            <HeaderRegisterCompany />
            <div className='form-container'>
                <div
                    style={{
                        fontSize: '20px',
                        fontWeight: '400',
                        lineHeight: '28px',
                        marginBottom: '30px'
                    }}
                >Đăng chỗ nghỉ của Quý vị trên Booking.com và bắt đầu đón tiếp khách thật nhanh chóng!</div>
                <div
                    style={{
                        fontSize: '16px',
                        fontWeight: '400',
                        lineHeight: '24px',
                    }}
                >Để bắt đầu, chọn loại chỗ nghỉ Quý vị muốn đăng trên Booking.com</div>
                <div className='list_category d-flex flex-row justify-content-between mt-4'>
                    {
                        categories && categories.map((category, index) => (
                            <div className='category-card-group' key={index}>
                                <div
                                    style={{ display: 'block' }}
                                >

                                    <div className="category-card">
                                        <div>
                                            <i
                                                className={category.styleIcon}
                                                style={{
                                                    fontSize: '50px',
                                                }}
                                            > </i>
                                        </div>

                                        <div
                                            style={{
                                                fontSize: '16px',
                                                fontWeight: '700',
                                                lineHeight: '24px',
                                                marginBottom: '8px'
                                            }}
                                        >
                                            {category.categoryName}
                                        </div>
                                        <div
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: '400',
                                                lineHeight: '18px',
                                            }}
                                        >
                                            {category.detail}
                                        </div>
                                        <Button
                                            className='col-md-12 mt-4'
                                            style={{
                                                background: '#0071c2',
                                            }}
                                        >
                                            <Link
                                                to={{
                                                    pathname: '/become-a-host/create-detail',
                                                    search: `?categoryIdSelected=${category.id}`,
                                                }}
                                                style={{
                                                    color: 'white'
                                                }}
                                            >Đăng chỗ nghỉ</Link>
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default CreateHotel;