import React from 'react';
import { Link } from 'react-router-dom';
import './efficiency.scss';
import Extentions from './extentions';
const items = [
    {
        iconClassName: 'ri-list-unordered bui-grip__icon',
        title: 'Giá trung bình hằng ngày (đêm nghỉ đã đặt)',
        count: 0,
    },
    {
        iconClassName: 'ri-logout-box-line bui-grip__icon',
        title: 'Giá trung bình hằng ngày (đêm nghỉ đã lưu trú)',
        count: 0,
    },
    {
        iconClassName: 'ri-logout-box-r-line bui-grip__icon',
        title: 'Tỷ lệ hủy',
        count: 0,
    },
    {
        iconClassName: 'ri-star-line bui-grip__icon',
        title: 'Đêm nghỉ đã lưu trú',
        count: 0,
    },
    {
        iconClassName: 'ri-close-circle-line bui-grip__icon',
        title: 'Doanh thu từ đặt phòng đã lưu trú',
        count: 0,
    },
    {
        iconClassName: 'ri-close-circle-line bui-grip__icon',
        title: 'Thời gian đặt trước trung bình',
        count: 0,
    },
    {
        iconClassName: 'ri-close-circle-line bui-grip__icon',
        title: 'Độ dài lưu trú trung bình',
        count: 0,
    },
    {
        iconClassName: 'ri-close-circle-line bui-grip__icon',
        title: 'Mở / Có thể đặt phòng',
        count: 0,
    },
];

const Efficiency = () => {
    return (
        <div className='bui-spacer--largest'>
            <div className="bui-spacer--medium">
                <span>Tổng quan hôm nay</span>
            </div>
            <div className="bui-card d-flex flex-wrap">
                {items.map((item, index) => (
                    <div className='bui-card__content col-md-3' key={index}>
                        <div className={`bui-grid ${index === 3 || index === 7 ? 'bui-grid-last  ' : ''}`}>
                            <Link
                                style={{
                                    fontSize: '12px',
                                    fontWeight: '700',
                                    lineHeight: '18px',
                                    color: '#6b6b6b'
                                }}
                            >{item.title}</Link>
                            <div className='d-flex'>
                                <i className={item.iconClassName}></i>
                                <div style={{
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    lineHeight: '28px',
                                    paddingLeft: '5px'
                                }}>{item.count}</div>
                            </div>


                        </div>
                    </div>
                ))}
            </div>
            <div className='bui-extention'>
                <Extentions />
            </div>
        </div>
    )
}

export default Efficiency;
