import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import './bannerSearch.scss'
import { Button } from 'reactstrap'
import Select from 'react-select';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateRange } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { fetchCities } from '../../store/actions';
import moment from 'moment';

const BannerSearch = () => {
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = useSelector((state) => state.site.cities);
    const dispatch = useDispatch();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [valueDate, setValueDate] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        dispatch(fetchCities('ALL'));
    }, []);

    // Chuyển đổi danh sách thanh pho thành định dạng options cho react-select
    const cityOptions = cities.map((city) => ({
        value: city.id,
        label: city.cityName,
    }));

    const handleCityChange = (selectedOption) => {
        setSelectedCity(selectedOption);
    };
    if (selectedCity && selectedCity.value)
        console.log(selectedCity.value);

    const handleDateChange = (date) => {
        setStartDate(date[0]);
        setEndDate(date[1]);
    };

    if (startDate && endDate) {
        const startDatex = startDate.format('L');
        const endDatex = endDate.format('L');

        const duration = moment(endDatex, 'L').diff(moment(startDatex, 'L'), 'days');
        const totalDays = duration;

        console.log(startDatex, endDatex, totalDays);
    }

    const pathSearch = selectedCity && selectedCity.value ? `/tour/${selectedCity.value}` : '/404'

    return (
        <div className="banner_search">
            <form
                className='form_search d-flex'
            >
                <div className="form_children">
                    <Select
                        options={cityOptions}
                        value={selectedCity}
                        onChange={handleCityChange}
                    />
                </div>
                <div className="form_children">
                    <div className='form_wrapper_date'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateRangePicker', 'DateRangePicker']}>
                                <DemoItem component="DateRangePicker">
                                    <DateRangePicker
                                        localeText={{ start: 'Ngày nhận phòng', end: 'Ngày trả phòng' }}
                                        onChange={handleDateChange}
                                        value={[startDate, endDate]}
                                    />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>

                </div>
                <div className="form_children">
                    <div className="form_wrapper">
                        <div className="form_count d-flex">
                            <span className='icon_custom'>
                                <i className="ri-user-line icon__style"
                                    style={{ paddingRight: '5px' }}
                                ></i>
                            </span>
                            <span
                                style={{
                                    color: 'black',
                                    alignSelf: 'center'
                                }}> Số lượng người</span>
                        </div>
                    </div>


                </div>
                <div className="form_children">
                    <Link
                        to={{
                            pathname: pathSearch,
                            // search: `?selectedCity=${encodeURIComponent(selectedCity)}`,
                        }}
                    >
                        <Button
                            color="primary"
                            className='btn_custom'
                        >
                            Tìm
                        </Button>

                    </Link>
                </div>
            </form>
        </div>
    )
}

export default BannerSearch
