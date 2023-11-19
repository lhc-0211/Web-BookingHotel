import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Select from 'react-select';

const EditHotelModal = ({
    isOpen,
    toggle,
    hotel,
    imageUrl,
    handleFileUpload,
    handleOnChangeInputName,
    handleCategoryChange,
    handleOnChangeInputAddress,
    handleCityChange,
    handleOnChangeInputDescription,
    handleSaveHotel,
    selectedCategory,
    selectedCity,
    categoryOptions,
    cityOptions,
    hotelName,
    address,
    description,
    hotelNameInputRef
}) => {
    return (
        <Modal isOpen={isOpen} fade={false} toggle={toggle} className='modal-xl'>
            <ModalHeader toggle={toggle}>Sửa chỗ nghỉ</ModalHeader>
            <ModalBody>
                <div>
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
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSaveHotel}>
                    Edit
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default EditHotelModal;
