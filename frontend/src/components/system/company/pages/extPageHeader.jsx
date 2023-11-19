
import React from "react";
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import './extPageHeader.scss';
const extPageHeader = () => {
    return (
        <div className="ext-page-header ">
            <div className="d-flex align-items-center">
                <div className="ext-page-header__title">Trang chủ nhóm chỗ nghỉ</div>
                <div className="btn-add-hotel ms-auto p-2">
                    <Button
                        style={{
                            background: '#0071c2',
                        }}
                    >
                        <Link
                            style={{ color: 'white' }}
                            to='/become-a-host'
                        >Thêm chỗ nghỉ mới</Link>
                    </Button>
                </div>
            </div>
            <div className="bui-banner mt-4">
                <div className="bui-banner__icon">
                    <i className="ri-survey-line"
                        style={{
                            fontSize: '24px',
                            paddingRight: '10px'
                        }}
                    ></i>
                </div>
                <div className="bui-banner__content">
                    <div className="bui-banner__title">Lưu trú ngày dài - Đón đầu xu hướng đang phát triển</div>
                    <div className="bui-banner__text">Đón đầu xu thế khi cho phép khách đặt lưu trú hơn 30 đêm tại chỗ nghỉ</div>
                    <div className="mt-4">
                        <Link
                            color="primary"
                            style={{
                                border: '1px solid #006ce4',
                                padding: '8px',
                                borderRadius: '5px',
                            }}
                            to='/login'
                        >
                            Cho phép lưu trú hơn 30 đêm
                        </Link>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default extPageHeader;