import React, { memo, useState } from 'react'
import { Button } from 'reactstrap'
import './extension.scss'
import { Link } from 'react-router-dom'

const Extention = () => {
    const extensions = [
        {
            title: 'Lưu trú',
            classIcon: 'ri-hotel-bed-line',
            link: '/home'
        },
        {
            title: 'Chuyến bay',
            classIcon: 'ri-flight-takeoff-line',
            link: ''

        },
        {
            title: 'Chuyến bay + Khách sạn ',
            classIcon: 'ri-earth-line',
            link: ''

        },
        {
            title: 'Thuê xe',
            classIcon: 'ri-car-fill',
        },
        {
            title: 'Địa điểm tham quan',
            classIcon: 'ri-creative-commons-by-line',
        },
        {
            title: 'Taxi sân bay',
            classIcon: 'ri-taxi-line',
        }
    ]

    const [isToggel, setToggle] = useState(false)
    const [selectedButton, setSelectedButton] = useState(0)

    const handleToggle = (index) => {
        setSelectedButton(index)
        setToggle(!isToggel)
    }

    return (
        <div className="extension_wrapper d-flex align-items-center gap-2">
            {
                extensions.map((extension, index) => (
                    <Link to={extension.link ? extension.link : '/404'} key={index}>
                        <div className="extension_children gap-2" >
                            <Button
                                className={`d-flex align-items-center justify-content-between ${selectedButton === index ? 'btn-secondary__isActive ' : ''}`}
                                onClick={() => handleToggle(index)}
                            >
                                <i className={extension.classIcon}></i>
                                <span>{extension.title}</span>

                            </Button>
                        </div>
                    </Link>

                ))
            }
        </div>
    )
}

export default memo(Extention)
