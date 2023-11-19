
import React from "react";
import Switch from '@mui/material/Switch';
import './formSearch.scss';

const FormSearch = () => {
    return (
        <div className="peg-properties-filters__wrapper">
            <div className="peg-properties-filters__input">
                <div className="bui-input-text__content">
                    <div className="bui-input-text__field">
                        <input type="text" className="bui-input-text__control"
                            placeholder="Lọc theo ID chỗ nghỉ, tên hoặc vị trí"
                        />
                        <div className="bui-input-text__decorator"></div>
                        <div className="bui-input-text__side">
                            <i className="ri-search-line"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormSearch;