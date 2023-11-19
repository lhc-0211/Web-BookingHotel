import React from 'react';
import { Link } from 'react-router-dom';
import './happeningToday.scss';
import Extentions from './extentions';
const items = [
    {
        iconClassName: 'ri-list-unordered bui-grip__icon',
        title: 'Đặt phòng',
        count: 0,
    },
    {
        iconClassName: 'ri-logout-box-line bui-grip__icon',
        title: 'Lượt khách đến',
        count: 0,
    },
    {
        iconClassName: 'ri-logout-box-r-line bui-grip__icon',
        title: 'Lượt khách đi',
        count: 0,
    },
    {
        iconClassName: 'ri-star-line bui-grip__icon',
        title: 'Đánh giá',
        count: 0,
    },
    {
        iconClassName: 'ri-close-circle-line bui-grip__icon',
        title: 'Lượt hủy',
        count: 0,
    },
];

const HappeningToday = () => {
    return (
        <div className='bui-spacer--largest'>
            <div className="bui-spacer--medium">
                <span>Tổng quan hôm nay</span>
            </div>
            <div className="bui-card d-flex flex-row align-items-center">
                {items.map((item, index) => (
                    <div className='bui-card__content col-md-2' key={index}>
                        <div className={`bui-grid ${index === 4 ? 'bui-grid-last  ' : ''}`}>
                            <i className={item.iconClassName}></i>
                            <div style={{
                                fontSize: '20px',
                                fontWeight: '700',
                                lineHeight: '28px',
                                paddingLeft: '5px'
                            }}>{item.count}</div>
                            <Link
                                style={{
                                    fontSize: '16px',
                                    fontWeight: '400',
                                    lineHeight: '24px'
                                }}
                            >{item.title}</Link>
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

export default HappeningToday;
