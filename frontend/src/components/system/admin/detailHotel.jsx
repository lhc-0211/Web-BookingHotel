
import React, { useState, useEffect, useRef } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotels, fetchCategories, fetchCities, handleCUDHotel } from '../../../store/actions';
import Select from 'react-select';
import './style.scss'
import '../../../assets/scss/TableManager.scss';

const DetailHotel = () => {
    const [showForm, setShowForm] = useState(false);
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
    const hotels = useSelector((state) => state.hotel.hotels);
    const caetgories = useSelector((state) => state.site.categories);
    const cities = useSelector((state) => state.site.cities);


    const error = useSelector((state) => state.hotel.error);
    const hotelNameInputRef = useRef(null);
    //model delete
    const [modal, setModal] = useState(false);

    const hanldeDeleteButtonOnclick = (hotel) => {
        setAction('DELETE');
        setModal(true)
        setHotelId(hotel.id);
    };

    //hide or presently form
    const handleFormButtonClick = () => {
        setShowForm(!showForm);
        setAction('CREATE');
    };

    //[GET] Hotel
    useEffect(() => {
        dispatch(fetchHotels());
    }, []);
    //[GET] Category
    useEffect(() => {
        dispatch(fetchCategories());
    }, []);
    //[GET] City
    useEffect(() => {
        dispatch(fetchCities('ALL'));
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
        setAction('EDIT');
        setShowForm(true);
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

        if (action === 'CREATE') {
            await dispatch(handleCUDHotel(`CREATE`, formData))
            dispatch(fetchHotels());
        }
        else if (action === 'EDIT') {
            await dispatch(handleCUDHotel(`EDIT`, formData))
            dispatch(fetchHotels());
        }
        else if (action === 'DELETE') {
            await dispatch(handleCUDHotel(`DELETE`, { id: hotelId }))
            dispatch(fetchHotels());
        }
        setHotelName('');
        setImageUrl('');
        setImage('');
        setAddress('');
        setDescription('');
        setAction('CREATE');
        // setSelectedCity('');
        // setSelectedCategory('');
        setModal(false);
    }

    return (
        <div className='basic_layout mt-4'>

            <div className="text-center" style={{ fontSize: '24px' }}>Hotel ({hotels.length})</div>
            <Button
                onClick={handleFormButtonClick}
            >
                {
                    showForm ? <i className="ri-arrow-up-circle-fill" /> : <i className="ri-arrow-down-circle-fill" />
                }
                Modify Form
            </Button>
            {
                showForm && (
                    <div >
                        <div className="mt-4">
                            <div className="row">
                                <div className='col-md-3'>
                                    <div className='preview-img-container'>
                                        <input id='previewImg' type='file'
                                            onChange={handleFileUpload}
                                            hidden
                                        />
                                        <label htmlFor='previewImg' className='lable-upload'>Tải ảnh <i className="ri-download-2-line"></i></label>
                                        <img className='avatar  '
                                            src={imageUrl}
                                        ></img>
                                    </div>
                                </div>
                                <div className='col-md-9'>
                                    <div className='d-flex'>
                                        <div className="col-md-6" style={{ marginRight: '30px' }}>
                                            <label htmlFor="inputAddress" className="form-label">Tên khách sạn</label>
                                            <input type="text"
                                                className="form-control name_city"
                                                name="hotelName"
                                                onChange={handleOnChangeInputName}
                                                value={hotelName}
                                                ref={hotelNameInputRef}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="inputAddress" className="form-label">Công ty</label>
                                            <input type="text"
                                                className="form-control name_city"
                                                name="hotelName"
                                            // onChange={handleOnChangeInput}
                                            // value={hotelName}
                                            // ref={hotelNameInputRef}
                                            />
                                        </div>
                                    </div>
                                    <div className='d-flex'>
                                        <div className="col-md-4" style={{ marginRight: '30px' }}>
                                            <label htmlFor="inputAddress" className="form-label">Địa chỉ</label>
                                            <input type="text"
                                                className="form-control name_city"
                                                name="address"
                                                onChange={handleOnChangeInputAddress}
                                                value={address}
                                            />
                                        </div>
                                        <div className="col-md-4 " style={{ marginRight: '30px' }}>
                                            <label htmlFor="inputAddress" className="form-label">Thành phố</label>
                                            <Select
                                                className='cityName_select'
                                                options={cityOptions}
                                                value={selectedCity}
                                                onChange={handleCityChange}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="inputAddress" className="form-label">Loại</label>
                                            <Select
                                                className='category_select'
                                                options={categoryOptions}
                                                value={selectedCategory}
                                                onChange={handleCategoryChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="inputAddress" className="form-label">Description</label>
                                        <textarea type=""
                                            className="form-control name_city"
                                            name="hotelName"
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
                <div className='user-container'>
                    <table id="customers" className='mt-4 container'>
                        <thead>
                            <tr>
                                <th scope="col">Ảnh</th>
                                <th scope="col">Mã khách sạn</th>
                                <th scope="col">Tên khách sạn</th>
                                <th scope="col">Công ty</th>
                                <th scope="col">Thành phố</th>
                                <th scope="col">Loại</th>
                                <th scope="col">isActive</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                hotels && hotels.map((hotel, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <img className='avatar' src={hotel.imageUrl}
                                                />
                                            </td>
                                            <td>{hotel.id}</td>
                                            <td>{hotel.hotelName}</td>
                                            <td>{hotel.company.companyName}</td>
                                            <td>{hotel.cityHotel.cityName}</td>
                                            <td>{hotel.category.categoryName}</td>
                                            <td>{hotel.isActive}</td>
                                            <td>
                                                <div className='action_btn'>
                                                    <button className='btn-edit'
                                                        onClick={() => hanldeEditButtonOnclick(hotel)}
                                                    >
                                                        <i className="ri-pencil-fill"></i>
                                                    </button>
                                                    <button className='btn-delete'
                                                        onClick={() => hanldeDeleteButtonOnclick(hotel)}
                                                    >
                                                        <i className="ri-delete-bin-5-line"></i>
                                                    </button>
                                                </div>
                                            </td>

                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>

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
    )
}

export default DetailHotel;