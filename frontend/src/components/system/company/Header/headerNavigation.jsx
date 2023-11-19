
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import './headerNavigation.scss'

const HeaderNavigation = () => {
    const extensions = [
        {
            title: 'Trang chủ Nhóm chỗ nghỉ',
            link: '/hoteladmin/home'
        },
        {
            title: 'Đặt phòng',
            link: ''

        },
        {
            title: 'Đánh giá',
            link: ''

        },
        {
            title: 'Tài chính',
            link: ''
        },
        {
            title: 'Trung tâm Cơ hội dành cho Nhóm chỗ nghỉ',
            link: ''
        },
        {
            title: 'Phân tích',
            link: ''
        }
    ]

    const [isToggel, setToggle] = useState(false)
    const [selectedButton, setSelectedButton] = useState(0)

    const handleToggle = (index) => {
        setSelectedButton(index)
        setToggle(!isToggel)
    }


    return (
        <div className="ext-header__navigation">
            <div className="ext-navigation__inner-container d-flex align-items-center">
                {
                    extensions.map((extension, index) => (
                        <Link to={extension.link ? extension.link : '/404'} key={index}>
                            <div className="ext-navigation-top-item" >
                                <Button
                                    className={`d-flex align-items-center justify-content-between custom-btn ${selectedButton === index ? 'btn__isActive ' : ''}`}
                                    onClick={() => handleToggle(index)}
                                >
                                    <span
                                        style={{
                                            padding: '8px 4px'
                                        }}
                                    >{extension.title}</span>

                                </Button>
                            </div>
                        </Link>

                    ))
                }
            </div>
        </div>
    )
}

export default HeaderNavigation;