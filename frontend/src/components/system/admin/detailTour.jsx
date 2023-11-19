
import React, { useState, useEffect, useRef } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCities, handleCUDCity } from '../../../store/actions';

import './style.scss'
import '../../../assets/scss/TableManager.scss';
const DetailTour = () => {
    const [showForm, setShowForm] = useState(false);
    const [cityId, setCityId] = useState();
    const [cityName, setCityName] = useState('');
    const [position, setPosition] = useState();
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [action, setAction] = useState('');
    const dispatch = useDispatch();
    const cities = useSelector((state) => state.site.cities);
    const error = useSelector((state) => state.site.error);
    const cityNameInputRef = useRef(null);
    //model delete
    const [modal, setModal] = useState(false);

    const hanldeDeleteButtonOnclick = (city) => {
        setAction('DELETE');
        setModal(true)
        setCityId(city.id);
    };


    //hide or presently form
    const handleAddButtonClick = () => {
        setShowForm(!showForm);
        setAction('CREATE');
    };

    //[GET] City
    useEffect(() => {
        dispatch(fetchCities('ALL'));
    }, []);

    if (error) {
        return <div>Failed to fetch cities.</div>;
    }

    //image presenly in form edit
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const imageURL = URL.createObjectURL(file);
        setImageUrl(imageURL);
        setImage(file);
    }

    const handleOnChangeInputCityName = (e) => {
        setCityName(e.target.value)
    }
    const handleOnChangeInputPosition = (e) => {
        setPosition(e.target.value)
    }
    const hanldeEditButtonOnclick = (city) => {
        setAction('EDIT');
        setShowForm(true);
        setCityId(city.id);
        setImageUrl(city.imageUrl);
        setCityName(city.cityName);
        setImage(city.image);
        setPosition(city.position);
        // Gọi phương thức focus sau khi component đã render và phần tử đã được tạo
        setTimeout(() => {
            if (cityNameInputRef.current) {
                cityNameInputRef.current.focus();
            }
        }, 0);

    }

    const handleSaveCity = async () => {
        const formData = new FormData();
        formData.append('id', cityId);
        formData.append('cityName', cityName);
        formData.append('imageUrl', image);
        formData.append('position', position);
        if (action === 'CREATE') {
            await dispatch(handleCUDCity(`CREATE`, formData))
            dispatch(fetchCities('ALL'));
        }
        else if (action === 'EDIT') {
            await dispatch(handleCUDCity(`EDIT`, formData))
            dispatch(fetchCities('ALL'));
        }
        else if (action === 'DELETE') {
            await dispatch(handleCUDCity(`DELETE`, { id: cityId }))
            dispatch(fetchCities('ALL'));
        }
        setCityName('');
        setImageUrl('');
        setImage('');
        setAction('CREATE');
        setPosition('')
        setModal(false);
    }

    return (
        <div className='basic_layout mt-4'>

            <div className="text-center" style={{ fontSize: '24px' }}>Tour
                ({cities.length})
            </div>
            <Button
                onClick={handleAddButtonClick}
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
                                <div className='col-md-9 '>
                                    <div className="col-md-6">
                                        <label htmlFor="inputAddress" className="form-label">Tên thành phố</label>
                                        <input type="text"
                                            className="form-control name_city"
                                            name="cityName"
                                            onChange={handleOnChangeInputCityName}
                                            value={cityName}
                                            ref={cityNameInputRef}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <label htmlFor="inputAddress" className="form-label">Vị trí</label>
                                        <input type="text"
                                            className="form-control name_city"
                                            name="position"
                                            onChange={handleOnChangeInputPosition}
                                            value={position}
                                        />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <button
                                        className='btn-add'
                                        onClick={handleSaveCity}
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
                                <th scope="col">Mã thành phố</th>
                                <th scope="col">Tên thành phố</th>
                                <th scope="col">Vị trí</th>
                                <th scope="col">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                cities && cities.map((city, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <img className='avatar' src={city.imageUrl}
                                                />
                                            </td>
                                            <td>{city.id}</td>
                                            <td>{city.cityName}</td>
                                            <td>{city.position}</td>
                                            <td>
                                                <div className='action_btn'>
                                                    <button className='btn-edit'
                                                        onClick={() => hanldeEditButtonOnclick(city)}
                                                    >
                                                        <i className="ri-pencil-fill"></i>
                                                    </button>
                                                    <button className='btn-delete'
                                                        onClick={() => hanldeDeleteButtonOnclick(city)}
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
                    <Button color="primary" onClick={handleSaveCity}>
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

export default DetailTour
