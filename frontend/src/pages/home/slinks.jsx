
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Slinks = () => {
    const dispatch = useDispatch();
    const cities = useSelector((state) => state.site.cities)

    return (
        <div className="section_slinks">
            <div className="slinks_container">
                <div className="title_content d-flex"

                >
                    <div>Các điểm đến được chúng tôi ưa thích</div>
                    <div className='d-flex '
                        style={{
                            flexWrap: 'wrap',
                        }}
                    >
                        {
                            cities && cities.slice(0, 11).map((city, index) => {
                                return (
                                    <div className='title_slinks col-md-3 mt-2' key={index}>
                                        <div
                                            style={{
                                                fontWeight: '600',
                                                fontSize: '16px'
                                            }}
                                        >{city.cityName}</div>
                                        <div
                                            style={{
                                                fontWeight: 400,
                                                fontSize: '12px'
                                            }}>số lượng chỗ nghỉ</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Slinks