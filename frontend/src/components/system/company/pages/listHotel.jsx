
import React, { useState, useEffect, useRef } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchCities, handleCUDHotel, fetchFindHotelsByCompany, fetchRoomType } from '../../../../store/actions';
import Select from 'react-select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './listHotel.scss'

import RoomModal from './modal/roomModal';
import EditHotelModal from './modal/editHotelModal';

const ListHotel = () => {
    const [hotelId, setHotelId] = useState();
    const [hotelName, setHotelName] = useState('');
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');

    // Sử dụng state để lưu giá trị đã chọn
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [action, setAction] = useState('');

    const dispatch = useDispatch();
    const caetgories = useSelector((state) => state.site.categories);
    const cities = useSelector((state) => state.site.cities);
    const hotels = useSelector((state) => state.hotel.hotelsFindByCompany);
    const { isLoggedIn, userInfo } = useSelector((state) => state.user);


    const error = useSelector((state) => state.hotel.error);
    const hotelNameInputRef = useRef(null);

    const [modalRoom, setModalRoom] = useState(false);
    const toggleRoom = () => setModalRoom(!modalRoom);

    const [modalEditHotel, setModalEditHotel] = useState(false);
    const toggleEditModal = () => setModalEditHotel(!modalEditHotel);

    const [isActive, setIsActive] = useState('true');

    const handleOnClick = () => {
        setIsActive(!isActive);
    }


    //[GET] Category
    useEffect(() => {
        dispatch(fetchCategories());
    }, []);
    //[GET] City
    useEffect(() => {
        dispatch(fetchCities('ALL'));
    }, []);
    useEffect(() => {
        dispatch(fetchFindHotelsByCompany(`${userInfo.id}`));
    }, []);

    if (error) {
        return <div>Failed to fetch hotels.</div>;
    }

    // Chuyển đổi danh sách thanh pho thành định dạng options cho react-select
    const cityOptions = cities.map((city) => ({
        value: city.id,
        label: city.cityName,
    }));

    const categoryOptions = caetgories.map((category) => ({
        value: category.id,
        label: category.categoryName,
    }));

    // Xử lý sự kiện thay đổi giá trị
    const handleCityChange = (selectedOption) => {
        setSelectedCity(selectedOption);
    };

    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption);
    };

    //image presenly in form edit
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const imageURL = URL.createObjectURL(file);
        setImageUrl(imageURL);
        setImage(file);
    }
    const handleOnChangeInputName = (e) => {
        setHotelName(e.target.value)
    }
    const handleOnChangeInputDescription = (e) => {
        setDescription(e.target.value)
    }
    const handleOnChangeInputAddress = (e) => {
        setAddress(e.target.value)
    }
    const hanldeEditButtonOnclick = (hotel) => {
        toggleEditModal()
        if (hotel && hotel.id) {
            setAction('EDIT');
            setHotelId(hotel.id);
            setImageUrl(hotel.imageUrl);
            setHotelName(hotel.hotelName);
            setImage(hotel.image);
            setAddress(hotel.address);
            setDescription(hotel.description);
            // Tìm thành phố dựa vào tên mặc định
            const foundCity = cityOptions.find(city => city.label === hotel.cityHotel.cityName);
            const foundCategory = categoryOptions.find(category => category.label === hotel.category.categoryName);

            setSelectedCity(foundCity);
            setSelectedCategory(foundCategory);

            // Gọi phương thức focus sau khi component đã render và phần tử đã được tạo
            setTimeout(() => {
                if (hotelNameInputRef.current) {
                    hotelNameInputRef.current.focus();
                }
            }, 0);
        } else {
            console.log('lỗi');
        }


    }

    const handleSaveHotel = async () => {
        const formData = new FormData();
        formData.append('id', hotelId);
        formData.append('hotelName', hotelName);
        formData.append('address', address);

        formData.append('imageUrl', image);
        if (selectedCategory !== null && typeof selectedCategory === 'object' && selectedCategory.hasOwnProperty('value')) {
            formData.append('categoryId', selectedCategory.value);
        }
        if (selectedCity !== null && typeof selectedCity === 'object' && selectedCity.hasOwnProperty('value')) {
            formData.append('cityId', selectedCity.value);

        }
        formData.append('description', description);

        if (action === 'EDIT') {
            await dispatch(handleCUDHotel(`EDIT`, formData))
            dispatch(fetchFindHotelsByCompany(`${userInfo.id}`));
        }
        setHotelName('');
        setImageUrl('');
        setImage('');
        setAddress('');
        setDescription('');
        setAction('EDIT');
        setModalEditHotel(false)
    }

    const hanldeDetailButton = (hotel) => {
        toggleRoom()
        setHotelId(hotel.id);
        dispatch(fetchRoomType(hotel.id));
    }

    return (
        <div className="list-hotel-container mt-4">
            <div className="list-hotel-header d-flex align-items-center">
                <div className="bui-gird">Chỗ nghỉ có trên Booking.com</div>
                <Button className="ms-auto p-2"
                    style={{
                        border: 'none'
                    }}
                    outline
                    onClick={handleOnClick}
                >

                    {
                        isActive ? (
                            <>
                                <i className="ri-arrow-up-s-line"></i>
                                Ẩn
                            </>
                        ) : (
                            <>
                                <i className="ri-arrow-down-s-line"></i>
                                Hiện
                            </>
                        )
                    }
                </Button>
            </div>
            {
                isActive && (
                    <div className="bui-table ">
                        <div className="bui-text">Phát triển kinh doanh bằng chỗ nghỉ này trên nền tảng du lịch trực tuyến lớn nhất thế giới, Booking.com.</div>
                        <div className="bui-table mt-2">
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><strong>Tên</strong></TableCell>
                                            <TableCell align="center"><strong>Vị trí</strong></TableCell>
                                            <TableCell align="center"><strong>Loại</strong></TableCell>
                                            <TableCell align="center"><strong>Trạng thái</strong></TableCell>
                                            <TableCell align="center"><strong>Hành động</strong></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {Array.isArray(hotels) && hotels.map((hotel, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {hotel.hotelName}
                                                </TableCell>
                                                <TableCell align="center">{hotel.address}, {hotel.cityHotel.cityName}</TableCell>
                                                <TableCell align="center">{hotel.category.categoryName}</TableCell>
                                                <TableCell align="center">{(hotel.isActive === 1) ? 'Hoạt động' : 'Đóng/Không thể đặt phòng'}</TableCell>
                                                <TableCell align="center" size="medium">
                                                    <div className="d-flex justify-content-center" style={{
                                                        fontSize: '1.25rem',
                                                        gap: '10px'
                                                    }}>
                                                        <div className='show-view-edit'>
                                                            <i className="ri-edit-2-fill" onClick={() => hanldeEditButtonOnclick(hotel)}
                                                                title="Sửa chỗ nghỉ"
                                                                style={{
                                                                    cursor: 'pointer'
                                                                }}
                                                            ></i>
                                                            <EditHotelModal
                                                                isOpen={modalEditHotel}
                                                                toggle={toggleEditModal}
                                                                hotel={hotel}
                                                                imageUrl={imageUrl}
                                                                handleFileUpload={handleFileUpload}
                                                                handleOnChangeInputName={handleOnChangeInputName}
                                                                handleCategoryChange={handleCategoryChange}
                                                                handleOnChangeInputAddress={handleOnChangeInputAddress}
                                                                handleCityChange={handleCityChange}
                                                                handleOnChangeInputDescription={handleOnChangeInputDescription}
                                                                handleSaveHotel={handleSaveHotel}
                                                                selectedCategory={selectedCategory}
                                                                selectedCity={selectedCity}
                                                                categoryOptions={categoryOptions}
                                                                cityOptions={cityOptions}
                                                                hotelName={hotelName}
                                                                address={address}
                                                                description={description}
                                                                hotelNameInputRef={hotelNameInputRef}
                                                            />
                                                        </div>
                                                        <div>
                                                            <i className="ri-file-text-fill" onClick={() => hanldeDetailButton(hotel)}
                                                                title="Danh sách phòng"
                                                                style={{
                                                                    cursor: 'pointer'
                                                                }}
                                                            ></i>
                                                            <RoomModal
                                                                isOpen={modalRoom}
                                                                toggle={toggleRoom}
                                                                hotelId={hotelId} />
                                                        </div>
                                                    </div>
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ListHotel;