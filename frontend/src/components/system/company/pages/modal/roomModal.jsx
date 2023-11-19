
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { fetchHotels, handleCUDHotel, fetchRoom, fetchRoomType } from '../../../../../store/actions';
import Select from 'react-select';
import '../../../../../assets/scss/TableManager.scss';
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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
const RoomModal = ({ isOpen, toggle }) => {

    const [showForm, setShowForm] = useState(false);
    const [action, setAction] = useState('');

    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [roomId, setRoomId] = useState('');
    const [roomName, setRoomName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [selectedSleeps, setSelectedSleeps] = useState('');
    const [selectedBebs, setSelectedBebs] = useState('');

    const dispatch = useDispatch();

    const roomTypes = useSelector((state) => state.room.roomTypes);

    const error = useSelector((state) => state.room.error);
    const hotelNameInputRef = useRef(null);
    //model delete
    const [modal, setModal] = useState(false);

    const sleepsOptions = [
        { value: 'ri-user-fill', label: '1' },
        { value: 'ri-user-fill', label: '2' },
        { value: 'ri-user-fill', label: '3' },
        { value: 'ri-user-fill', label: '4' },
    ];
    const bedsOptions = [
        { value: 'ri-user-fill', label: '1 giường đơn' },
        { value: 'ri-user-fill', label: '2 giường đơn' },
        { value: 'ri-user-fill', label: '1 giường đôi cỡ lớn' },
        // { value: 'ri-user-fill', label: '4' },
    ];

    const hanldeDeleteButtonOnclick = (room) => {
        setAction('DELETE');
        setModal(true)
        setRoomId(room.id);
    };

    //hide or presently form
    const handleFormButtonClick = () => {
        setShowForm(!showForm);
        setAction('CREATE');
    };

    // // if (error) {
    // //     return <div>Failed to fetch hotels.</div>;
    // // }

    // Xử lý sự kiện thay đổi giá trị
    const handleSleepsChange = (selectedOption) => {
        setSelectedSleeps(selectedOption);
    };

    // Xử lý sự kiện thay đổi giá trị
    const handleBedsChange = (selectedOption) => {
        setSelectedBebs(selectedOption);
    };


    //image presenly in form edit
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const imageURL = URL.createObjectURL(file);
        setImageUrl(imageURL);
        setImage(file);
    }

    const handleOnChangeInputName = (e) => {
        setRoomName(e.target.value)
    }
    const handleOnChangeInputDescription = (e) => {
        setDescription(e.target.value)
    }

    const hanldeEditButtonOnclick = (room) => {
        setAction('EDIT');
        setShowForm(true);
        setRoomId(room.id);
        setImageUrl(room.imageUrl);
        setRoomName(room.roomName);
        setImage(room.image);
        setDescription(room.description);
        // Tìm thành phố dựa vào tên mặc định
        // const foundCity = cityOptions.find(city => city.label === hotel.cityHotel.cityName);

        // setSelectedCity(foundCity);

        // Gọi phương thức focus sau khi component đã render và phần tử đã được tạo
        setTimeout(() => {
            if (hotelNameInputRef.current) {
                hotelNameInputRef.current.focus();
            }
        }, 0);

    }

    const handleSaveHotel = async () => {
        const formData = new FormData();
        formData.append('id', roomId);
        formData.append('roomName', roomName);

        formData.append('imageUrl', image);
        // if (selectedCategory !== null && typeof selectedCategory === 'object' && selectedCategory.hasOwnProperty('value')) {
        //     formData.append('categoryId', selectedCategory.value);
        // }
        // if (selectedCity !== null && typeof selectedCity === 'object' && selectedCity.hasOwnProperty('value')) {
        //     formData.append('cityId', selectedCity.value);

        // }
        formData.append('description', description);

        if (action === 'CREATE') {
            await dispatch(handleCUDHotel(`CREATE`, formData))
            dispatch(fetchHotels());
        }
        else if (action === 'EDIT') {
            await dispatch(handleCUDHotel(`EDIT`, formData))
            dispatch(fetchHotels());
        }
        else if (action === 'DELETE') {
            await dispatch(handleCUDHotel(`DELETE`, { id: roomId }))
            dispatch(fetchHotels());
        }
        setRoomName('');
        setImageUrl('');
        setImage('');
        setDescription('');
        setAction('CREATE');
        // setSelectedCity('');
        // setSelectedCategory('');
        setModal(false);
    }
    const [openRow, setOpenRow] = useState(null);

    const handleRowClick = (index, roomType) => {
        setOpenRow(openRow === index ? null : index);
        dispatch(fetchRoom(roomType.id));
    };

    const rooms = useSelector((state) => state.room.rooms);
    console.log(rooms);

    return (
        <Modal isOpen={isOpen} toggle={toggle} fullscreen>
            <ModalHeader toggle={toggle}
                style={{
                    backgroundColor: '#003580'
                }}
            >
                <div className='d-flex'
                    style={{
                        gap: '40px'
                    }}
                >
                    <div
                        style={{
                            color: '#fff'
                        }}
                    >Quản lý chỗ cho thuê</div>
                    <Button
                        onClick={handleFormButtonClick}
                        color='primary'
                    >
                        <i className="ri-add-circle-fill"></i>
                        Thêm loại chỗ ở
                    </Button>
                </div>

            </ModalHeader>
            <ModalBody
                style={{
                    backgroundColor: '#f2f2f2'
                }}
            >
                <div className='custom-modal'
                    style={{
                        marginLeft: '200px',
                        marginRight: '200px'
                    }}
                >
                    <div
                        style={{
                            textAlign: 'center',
                            fontSize: '24px',
                            fontWeight: '600',
                            lineHeight: '18px'
                        }}
                    >
                        Danh sách loại chỗ ở
                    </div>
                    {
                        showForm && (
                            <div
                                style={{
                                    marginLeft: '100px',
                                    marginRight: '100px',
                                }}
                            >
                                <div className="mt-4">
                                    <div className="row">
                                        <div className='col-md-3'>
                                            <div className='preview-img-container'>
                                                <input id='previewImg' type='file'
                                                    onChange={handleFileUpload}
                                                    hidden
                                                />
                                                <label htmlFor='previewImg' className='lable-upload'>Tải ảnh <i className="ri-download-2-line"></i></label>
                                                <img
                                                    style={{
                                                        height: '180px',
                                                        backgroundPosition: 'center',
                                                        display: 'block',
                                                        margin: '0 auto'
                                                    }}
                                                    src={imageUrl}
                                                ></img>
                                            </div>
                                        </div>
                                        <div className='col-md-9'>
                                            <div className='d-flex'>
                                                <div className="col-md-5">
                                                    <label htmlFor="inputAddress" className="form-label">Kiểu phòng</label>
                                                    <input type="text"
                                                        className="form-control name_city"
                                                        name="roomName"
                                                    />
                                                </div>
                                            </div>
                                            <div className='d-flex'
                                                style={{
                                                    gap: '20px'
                                                }}
                                            >
                                                <div className="col-md-3" >
                                                    <label htmlFor="inputAddress" className="form-label">Số lượng người tối đa</label>
                                                    <Select
                                                        className='sleeps_select'
                                                        options={sleepsOptions}
                                                        value={selectedSleeps}
                                                        onChange={handleSleepsChange}
                                                    />
                                                </div>
                                                <div className="col-md-3 " >
                                                    <label htmlFor="inputAddress" className="form-label">Loại giường</label>
                                                    <Select
                                                        className='cityName_select'
                                                        options={bedsOptions}
                                                        value={selectedBebs}
                                                        onChange={handleBedsChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-10">
                                                <label htmlFor="inputAddress" className="form-label">Description</label>
                                                <textarea type=""
                                                    className="form-control name_city"
                                                    name="roomName"
                                                    onChange={handleOnChangeInputDescription}
                                                    value={description}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button
                                                className='btn-add'
                                                onClick={handleSaveHotel}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {/* Table city start */}
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
                                        <TableCell align="center">Action</TableCell>

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
                                                        {openRow === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell component="th" scope="row" align="center">
                                                    {roomType.roomTypeName}
                                                </TableCell>
                                                <TableCell align="center">{roomType.beds}</TableCell>
                                                <TableCell align="center">{roomType.sleeps}</TableCell>
                                                <TableCell align="center">

                                                    <button className='btn-edit'
                                                    // onClick={() => hanldeEditButtonOnclick(hotel)}
                                                    >
                                                        <i className="ri-pencil-fill"></i>
                                                    </button>
                                                    <button className='btn-delete'
                                                    // onClick={() => hanldeDeleteButtonOnclick(hotel)}
                                                    >
                                                        <i className="ri-delete-bin-5-line"></i>
                                                    </button>
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
                                                                        <TableCell align="center">Ngày tạo</TableCell>

                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {
                                                                        rooms && rooms.length > 0 ? rooms.map((room, index) => (
                                                                            <TableRow key={index}>
                                                                                <TableCell component="th">{room.roomName}</TableCell>
                                                                                <TableCell >{room.currentPrice}</TableCell>
                                                                                <TableCell align="center">{(room.isActive === 1) ? 'Hoạt động' : 'Đóng/Chưa được mở'}</TableCell>
                                                                                <TableCell align="center">{room.createdAt}</TableCell>

                                                                            </TableRow>
                                                                        )) : (
                                                                            <TableRow>
                                                                                <TableCell component="th"
                                                                                    style={{
                                                                                        color: 'red'
                                                                                    }}
                                                                                >Chỗ nghỉ hiện tại chưa đăng kí phòng</TableCell>
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
                    <Modal isOpen={modal} fade={false}>
                        <ModalHeader >Thông báo!</ModalHeader>
                        <ModalBody>
                            Bạn có muốn xóa vĩnh viễn thành dữ liệu này ra khỏi bộ nhớ không?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary"
                                onClick={handleSaveHotel}
                            >
                                Yes
                            </Button>{' '}
                            <Button color="secondary" >
                                No
                            </Button>
                        </ModalFooter>
                    </Modal>
                    {/* Table city end */}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal >
    )
}

export default RoomModal;