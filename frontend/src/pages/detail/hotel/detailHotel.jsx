
import React, { useState, useEffect } from 'react'
import './detailHotel.scss'
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Button } from 'reactstrap'
import Select from 'react-select';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fetchCities, fetchHotels, fetchRoomType, fetchRoom, handleCUDReservation } from '../../../store/actions';
import srcset from '../listImg'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DescriptionHotel from './descriptionHotel';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonIcon from '@mui/icons-material/Person';
import BedIcon from '@mui/icons-material/Bed';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Collapse,
    Box,
    Typography,
} from '@mui/material';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DetailHotel = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { isLoggedIn, userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchCities('ALL'));
    }, []);

    useEffect(() => {
        dispatch(fetchHotels('ALL'));
    }, []);

    useEffect(() => {
        dispatch(fetchRoomType(id));
    }, []);

    const [selectedCity, setSelectedCity] = useState(null);
    const cities = useSelector((state) => state.site.cities);
    const roomTypes = useSelector((state) => state.room.roomTypes);
    const hotels = useSelector((state) => state.hotel.hotels);
    const hotel = hotels.find(hotel => hotel.id === id);

    const rooms = useSelector((state) => state.room.rooms);

    // Chuyển đổi danh sách thanh pho thành định dạng options cho react-select
    const cityOptions = cities.map((city) => ({
        value: city.id,
        label: city.cityName,
    }));

    const handleCityChange = (selectedOption) => {
        setSelectedCity(selectedOption);
    };

    const itemData = [
        {
            img: 'https://cf.bstatic.com/xdata/images/hotel/max500/450000101.jpg?k=26a9977b41b95e01a9421d9ac2afe73f95321ea878c660b66b1440086dbdec39&o=&hp=1',
            title: 'Breakfast',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/451718596.jpg?k=806a716f734004afda7f7b874a3fd82c65542ee8f799f2ccbb0ff98139a9a37e&o=&hp=1',
            title: 'Burger',
            rows: 3,
            cols: 3,
        },
        {
            img: 'https://cf.bstatic.com/xdata/images/hotel/max500/450006620.jpg?k=8133fb4b40b425178b37313b7563258d4de73530c43bbc1bbd6401d099804f7c&o=&hp=1',
            title: 'Burger',
            rows: 2,
            cols: 2,
        },
        {
            img: 'https://cf.bstatic.com/xdata/images/hotel/max300/451718501.jpg?k=a5f7909d58685efd2077191a2bf06a0033671bb097cec387e22d26aca69791b8&o=&hp=1',
            title: 'Breakfast',
        },
        {
            img: 'https://cf.bstatic.com/xdata/images/hotel/max300/449999441.jpg?k=f43a28707fa87a30d271a43d21893fbc90c089ea91f2e5de8150a8bdf1f4dce3&o=&hp=1',
            title: 'Breakfast',
        },
        {
            img: 'https://cf.bstatic.com/xdata/images/hotel/max300/449521575.jpg?k=c3a969f4d8844e3814bda701e14912a1ac9c0c598c1d271272d32094423bc84f&o=&hp=1',
            title: 'Breakfast',
        },
    ];

    const [openRow, setOpenRow] = useState(null);

    const handleRowClick = (index, roomType) => {
        setOpenRow(openRow === index ? null : index);
        dispatch(fetchRoom(roomType.id));
    };
    const [modal, setModal] = useState(false);



    const [guestId, setGuestId] = useState('');
    const [roomId, setRoomId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [Email, setEmail] = useState('');
    const [Ten, setTen] = useState('');
    const [Phone, setPhone] = useState('');
    const [Gia, setGia] = useState('');
    const [action, setAction] = useState('CREATE');

    const handleOnChangeInputEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleOnChangeInputTen = (e) => {
        setTen(e.target.value)
    }
    const handleOnChangeInputPhone = (e) => {
        setPhone(e.target.value)
    }
    const handleOnChangeInputStartDate = (e) => {
        setStartDate(e.target.value)
    }
    const handleOnChangeInputEndDate = (e) => {
        setEndDate(e.target.value)
    }

    const toggle = (room) => {
        setRoomId(room.id);
        setGia(room.currentPrice);
        setGuestId(userInfo.id)
        setModal(!modal)
    };


    const handleSaveHotel = async () => {
        const formData = new FormData();
        // formData.append('guestId', guestId);
        // formData.append('MaPhong', roomId);
        // formData.append('startDate', startDate);
        // formData.append('endDate', endDate);
        // formData.append('Email', Email);
        // formData.append('Ten', Ten);
        // formData.append('Phone', Phone);
        // formData.append('Gia', Gia);


        if (action === 'CREATE') {
            await dispatch(handleCUDReservation(`CREATE`, {
                guestId,
                roomId,
                startDate,
                endDate,
                Email,
                Ten,
                Phone,
                Gia,
            }))
        }
        setModal(false);
    }


    return (
        <div className="section_detailHotel d-flex flex-column">
            <div className='section_detailHotel--top d-flex'>
                <div className="left_wrapper col-md-3">
                    <div>
                        <div className="SearchBoxDesktop">
                            <form className='form_search_BoxDesktop' action=""
                                style={{
                                    marginBottom: '8px'
                                }}
                            >
                                <div className='searchbox-layout-vertical'>
                                    <div className="form_children">
                                        <div className="content">
                                            Tìm
                                        </div>
                                    </div>
                                    <div className="form_children">
                                        <div className='title_seclect'>
                                            Tên chỗ nghỉ / điểm đến:
                                        </div>
                                        <Select
                                            options={cityOptions}
                                            value={selectedCity}
                                            onChange={handleCityChange}
                                        />
                                    </div>
                                    <div className="form_children">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                                <DatePicker label="Ngày nhận phòng" />

                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <div className="form_children">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                                <DatePicker label="Ngày trả phòng" />

                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <div className="form_children">
                                        <Button
                                            color="primary"
                                            className='btn_custom'
                                        >
                                            Tìm
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d7838.684254869503!2d106.70676642475235!3d10.785086936675276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1547181657956" ></iframe>
                    </div>
                </div>
                <div className="right_wrapper col-md-9">
                    <div className='wrap-hotelpage-top d-flex flex-row'>
                        <div className="title_name_hotel">
                            {hotel ? ( // Add error handling here to check if hotel is defined
                                `${hotel.hotelName}`
                            ) : null}
                        </div>
                        <div className='wrap-hotelpage-top__book d-flex'>
                            <i className="ri-heart-line"></i>
                            <i className="ri-share-line"></i>
                            <Button
                                color="primary"
                            >Đặt ngay</Button>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <ImageList
                            // sx={{ width: 500, height: 450 }}
                            variant="quilted"
                            cols={5}
                            rowHeight={110}
                        >
                            {itemData.map((item) => (
                                <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
                                    <img
                                        {...srcset(item.img, 165, item.rows, item.cols)}
                                        alt={item.title}
                                        loading="lazy"
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </div>
                </div>
            </div>

            <DescriptionHotel />

            <div className='section_list_room'>
                <div
                    className='section_list_room--title'
                >Phòng trống</div>
                <div className='mb-10 mt-4'>
                    <div className=''></div>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table">
                            <TableHead>
                                <TableRow>
                                    <TableCell />
                                    <TableCell align="center">Kiểu chỗ ở</TableCell>
                                    <TableCell align="center">Loại giường</TableCell>
                                    <TableCell align="center">Số lượng khách</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{
                                roomTypes.length > 0 ? roomTypes.map((roomType, index) => (
                                    <React.Fragment key={index}>
                                        <TableRow>
                                            <TableCell align="center">
                                                <IconButton
                                                    aria-label="expand row"
                                                    size="small"
                                                    onClick={() => handleRowClick(index, roomType)}
                                                >
                                                    Xem phòng {openRow === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                </IconButton>
                                            </TableCell>
                                            <TableCell component="th" scope="row" align="center">
                                                {roomType.roomTypeName}
                                            </TableCell>
                                            <TableCell align="center">
                                                <BedIcon />
                                            </TableCell>
                                            <TableCell align="center">
                                                <PersonIcon /> x {roomType.sleeps}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                <Collapse in={openRow === index} timeout="auto" unmountOnExit>
                                                    <Box sx={{ margin: 1 }}>
                                                        <Typography variant="h6" gutterBottom component="div">
                                                            Danh sách phòng
                                                        </Typography>
                                                        <Table size="small" aria-label="purchases">
                                                            <TableHead>
                                                                <TableRow>
                                                                    <TableCell>Tên phòng</TableCell>
                                                                    <TableCell>Giá</TableCell>
                                                                    <TableCell align="center">Trạng thái</TableCell>

                                                                </TableRow>
                                                            </TableHead>
                                                            <TableBody>
                                                                {
                                                                    rooms && rooms.length > 0 ? rooms.map((room, index) => (
                                                                        <TableRow key={index}>
                                                                            <TableCell component="th">{room.roomName}</TableCell>
                                                                            <TableCell >{room.currentPrice}</TableCell>
                                                                            <TableCell align="center">{(room.isActive === 1) ? 'Còn trống' : 'Đóng/Chưa được mở'}</TableCell>
                                                                            <TableCell align="center">
                                                                                <Button
                                                                                    color='primary'
                                                                                    onClick={() => toggle(room)}
                                                                                >
                                                                                    Đặt
                                                                                </Button>
                                                                            </TableCell>

                                                                        </TableRow>
                                                                    )) : (
                                                                        <TableRow>
                                                                            <TableCell component="th"
                                                                                style={{
                                                                                    color: 'red'
                                                                                }}
                                                                            >Chỗ nghỉ hiện tại đã hết phòng</TableCell>
                                                                        </TableRow>
                                                                    )
                                                                }
                                                            </TableBody>
                                                        </Table>
                                                    </Box>
                                                </Collapse>
                                            </TableCell>
                                        </TableRow>
                                    </React.Fragment>
                                )) : (
                                    <div
                                        style={{
                                            textAlign: 'center',
                                            fontSize: '1.4rem',
                                            color: 'red'
                                        }}
                                    >Bạn chưa đăng ký loại chỗ ở</div>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>



            <Modal isOpen={modal} toggle={() => toggle()} >
                <ModalHeader toggle={() => toggle()}>Vui lòng nhập đủ thông tin để đặt chỗ nghỉ</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <label for="inputEmail4" className="form-label">Email</label>
                                <input type="email"
                                    className="form-control"
                                    name="Email"
                                    placeholder="Ex:abc@gmail.com"
                                    onChange={handleOnChangeInputEmail}
                                />
                            </div>
                            <div className="col-md-6">
                                <label for="inputPassword4" className="form-label">Phone</label>
                                <input type="text"
                                    className="form-control"
                                    name="Phone"
                                    onChange={handleOnChangeInputPhone}
                                />
                            </div>
                            <div className="col-12">
                                <label for="inputAddress" className="form-label">FullName</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Ex:Nguyễn Văn A"
                                    name="Ten"
                                    onChange={handleOnChangeInputTen}
                                />
                            </div>
                            <div className="col-12">
                                <label for="inputAddress2" className="form-label">Address</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Xã, Huyện, Tỉnh"
                                    name="DiaChi"
                                />
                            </div>
                            <div className="col-md-6">
                                <label for="inputCity" className="form-label">Ngày nhận phòng</label>
                                <input type="date"
                                    className="form-control"
                                    name="NgayNhanPhong"
                                    onChange={handleOnChangeInputStartDate}
                                />
                            </div>
                            <div className="col-md-6">
                                <label for="inputState" className="form-label">Ngày trả phòng</label>
                                <input type="date"
                                    className="form-control"
                                    name="NgayTraPhong"
                                    onChange={handleOnChangeInputEndDate}
                                />
                            </div>

                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => handleSaveHotel()}>
                        Đặt
                    </Button>{' '}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div >



    )
}

export default DetailHotel
