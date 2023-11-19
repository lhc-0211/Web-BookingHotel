
import React from "react";
import Switch from '@mui/material/Switch';
import './extentions.scss'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const Extentions = () => {
    return (
        <>
            <div className="mt-4">
                <div
                    style={{
                        fontSize: '14px',
                        fontWeight: '400',
                        lineHeight: '20px',

                    }}
                >Quý vị có thể xem chi tiết về hiệu suất của các chỗ nghỉ bên dưới</div>
                <div className="bui-spacer--medium d-flex">
                    <div className="">
                        {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small-label">Lọc</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                // value={age}
                                label="Lọc"
                                // onChange={handleChange}
                                className="d-flex flex-row"
                            >
                                <MenuItem value={0}>
                                    Đầu tháng đến nay
                                </MenuItem>
                                <MenuItem value={10}>Đầu năm đến nay</MenuItem>
                                <MenuItem value={20}>Tháng trước</MenuItem>
                                <MenuItem value={30}>3 tháng trước</MenuItem>
                            </Select>
                        </FormControl> */}
                    </div>
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