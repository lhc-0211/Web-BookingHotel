
import React from "react";
import Switch from '@mui/material/Switch';
import './extentions.scss'
const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Extentions = () => {
    return (
        <>
            <div className="mt-4">
                <div className="bui-spacer--medium d-flex">

                    <div className="d-flex ms-auto p-2 align-items-center">
                        <div className="peg-home-table-actions d-flex">
                            <i className="ri-download-2-line"
                                style={{ paddingRight: '5px' }}
                            ></i>
                            <div>Tải xuống</div>
                        </div>
                        <div className="peg-home-table-actions">
                            <div className="dropdown d-flex align-items-center">
                                <i className="ri-pause-mini-fill"
                                    style={{ fontSize: '22px' }}
                                ></i>
                                <div className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Tùy chỉnh dữ liệu
                                </div>
                                <ul className="dropdown-menu">
                                    <li className="d-flex align-items-center">
                                        <Switch {...label} defaultChecked />
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                lineHeight: '20px',
                                                marginLeft: '16px'
                                            }}
                                        >Đến trong 48 giờ tới</div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <Switch {...label} defaultChecked />
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                lineHeight: '20px',
                                                marginLeft: '16px'
                                            }}
                                        >Rời đi trong 48 giờ tới</div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="peg-home-table-actions">
                            <div className="dropdown d-flex align-items-center">
                                <i className="ri-eye-line"
                                    style={{ fontSize: '18px' }}
                                ></i>
                                <div className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    Tùy chỉnh chế độ xem
                                </div>
                                <ul className="dropdown-menu">
                                    <li className="d-flex align-items-center">
                                        <Switch {...label} defaultChecked />
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                lineHeight: '20px',
                                                marginLeft: '16px'
                                            }}
                                        >Hiển thị vị trí chỗ nghỉ</div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <Switch {...label} defaultChecked />
                                        <div
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: '400',
                                                lineHeight: '20px',
                                                marginLeft: '16px'
                                            }}
                                        >Hiển thị các chỗ nghỉ bị đóng</div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Extentions;