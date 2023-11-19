
import React, { useState, useEffect, useRef } from 'react'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, handleCUDCategory } from '../../../store/actions';

import './style.scss'
import '../../../assets/scss/TableManager.scss';

const DetailCategory = () => {
    const [showForm, setShowForm] = useState(false);
    const [categoryId, setCategoryId] = useState();
    const [categoryName, setCategoryName] = useState('');
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [action, setAction] = useState('');
    const [styleIcon, setStyleIcon] = useState('');
    const [detail, setDetail] = useState('');
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.site.categories);
    const error = useSelector((state) => state.site.error);
    const categoryNameInputRef = useRef(null);
    //model delete
    const [modal, setModal] = useState(false);

    const hanldeDeleteButtonOnclick = (category) => {
        setAction('DELETE');
        setModal(true)
        setCategoryId(category.id);
    };


    //hide or presently form
    const handleFormButtonClick = () => {
        setShowForm(!showForm);
        setAction('CREATE');
    };

    //[GET] Category
    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    if (error) {
        return <div>Failed to fetch categories.</div>;
    }

    //image presenly in form edit
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const imageURL = URL.createObjectURL(file);
        setImageUrl(imageURL);
        setImage(file);
    }

    const handleOnChangeInput = (e) => {
        setCategoryName(e.target.value)
    }

    const handleOnChangeInputDetail = (e) => {
        setDetail(e.target.value)
    }

    const handleOnChangeInputStyleIcon = (e) => {
        setStyleIcon(e.target.value)
    }

    const hanldeEditButtonOnclick = (category) => {
        setAction('EDIT');
        setShowForm(true);
        setCategoryId(category.id);
        setImageUrl(category.imageUrl);
        setCategoryName(category.categoryName);
        setImage(category.image);
        setDetail(category.detail);
        setStyleIcon(category.styleIcon);
        // Gọi phương thức focus sau khi component đã render và phần tử đã được tạo
        setTimeout(() => {
            if (categoryNameInputRef.current) {
                categoryNameInputRef.current.focus();
            }
        }, 0);

    }

    const handleSaveCategory = async () => {
        const formData = new FormData();
        formData.append('id', categoryId);
        formData.append('categoryName', categoryName);
        formData.append('imageUrl', image);
        formData.append('styleIcon', styleIcon);
        formData.append('detail', detail);

        if (action === 'CREATE') {
            await dispatch(handleCUDCategory(`CREATE`, formData))
            dispatch(fetchCategories());
        }
        else if (action === 'EDIT') {
            await dispatch(handleCUDCategory(`EDIT`, formData))
            dispatch(fetchCategories());
        }
        else if (action === 'DELETE') {
            await dispatch(handleCUDCategory(`DELETE`, { id: categoryId }))
            dispatch(fetchCategories());
        }
        setCategoryName('');
        setImageUrl('');
        setImage('');
        setDetail('');
        setStyleIcon('');
        setAction('CREATE');
        setModal(false);
    }

    return (
        <div className='basic_layout mt-4'>

            <div className="text-center" style={{ fontSize: '24px' }}>Category ({categories.length})</div>
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
                                    <div className=' d-flex flex-row justify-content-between'>
                                        <div className="col-md-6">
                                            <label htmlFor="inputAddress" className="form-label">Loại chỗ ở</label>
                                            <input type="text"
                                                className="form-control name_city"
                                                name="cityName"
                                                onChange={handleOnChangeInput}
                                                value={categoryName}
                                                ref={categoryNameInputRef}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="inputAddress" className="form-label">Style Icon</label>
                                            <input type="text"
                                                className="form-control name_city"
                                                name="styleIcon"
                                                onChange={handleOnChangeInputStyleIcon}
                                                value={styleIcon}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="col-md-12 mt-2">
                                            <label htmlFor="inputAddress" className="form-label">Detail</label>
                                            <textarea type=""
                                                className="form-control name_city"
                                                name="detail"
                                                onChange={handleOnChangeInputDetail}
                                                value={detail}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <button
                                        className='btn-add'
                                        onClick={handleSaveCategory}
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
                                <th scope="col">Mã loại</th>
                                <th scope="col">Tên Loại</th>
                                <th scope="col">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories && categories.map((category, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <img className='avatar' src={category.imageUrl}
                                                />
                                            </td>
                                            <td>{category.id}</td>
                                            <td>{category.categoryName}</td>
                                            <td>
                                                <div className='action_btn'>
                                                    <button className='btn-edit'
                                                        onClick={() => hanldeEditButtonOnclick(category)}
                                                    >
                                                        <i className="ri-pencil-fill"></i>
                                                    </button>
                                                    <button className='btn-delete'
                                                        onClick={() => hanldeDeleteButtonOnclick(category)}
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
                        onClick={handleSaveCategory}
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

export default DetailCategory;