
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleCUDHotel, fetchCities } from '../../store/actions';
import HeaderRegisterCompany from '../../components/Header/headerRegisterCompany'
import './detailCreateHotel.scss';
import { Button } from 'reactstrap'
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useParams, useLocation } from 'react-router-dom';

const DetailCreateHotel = () => {
    const [registrationStep, setRegistrationStep] = useState(1);
    const [hotelName, setHotelName] = useState('');
    const [address, setAddress] = useState('');
    const [selectedCity, setSelectedCity] = useState(null);
    const [category, setCategory] = useState('');
    const [action, setAction] = useState('CREATE');
    const [image, setImage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isInputsValid, setIsInputsValid] = useState(false);
    const [description, setDescription] = useState('');
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(true);
    const cities = useSelector((state) => state.site.cities);
    const loading = useSelector(state => state.hotel.loading);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryIdSelected = queryParams.get('categoryIdSelected'); // Sử dụng useLocation và URLSearchParams

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { isLoggedIn, userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchCities('ALL'));
    }, [dispatch]);

    const cityOptions = cities.map((city) => ({
        value: city.id,
        label: city.cityName,
    }));


    const checkInputValidity = () => {
        if (
            (registrationStep === 1 && hotelName.trim() !== '' && description.trim() !== '') ||
            (registrationStep === 2 && address.trim() !== '') ||
            (registrationStep === 3 && image !== '')
        ) {
            setIsInputsValid(true);
        } else {
            setIsInputsValid(false);
        }
    };

    useEffect(() => {
        checkInputValidity();
    }, [registrationStep, hotelName, address, image, imageUrl, description]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const imageURL = URL.createObjectURL(file);
        setImageUrl(imageURL);
        setImage(file);
    };

    const handleOnchangeHotelName = (e) => {
        setHotelName(e.target.value);
    };

    const handleOnchangeAddress = (e) => {
        setAddress(e.target.value);
    };

    const handleOnChangeInputDescription = (e) => {
        setDescription(e.target.value)
    }

    const handleCityChange = (selectedOption) => {
        setSelectedCity(selectedOption);
    };

    const handleNextStep = () => {
        setRegistrationStep((prevStep) => prevStep + 1);
    };

    const handlePrevStep = () => {
        setRegistrationStep((prevStep) => prevStep - 1);
    };

    const handlePrev = () => {
        if (registrationStep > 1) {
            handlePrevStep();
        }
    };

    const handleSubmit = async () => {
        if (registrationStep < 3) {
            handleNextStep();
        }
        if (registrationStep === 3 && imageUrl.trim() !== '') {
            const formData = new FormData();
            formData.append('hotelName', hotelName);
            formData.append('imageUrl', image);
            formData.append('address', address);

            formData.append('categoryId', categoryIdSelected);
            if (isLoggedIn && userInfo && userInfo.id) {
                formData.append('companyId', userInfo.id);
            }
            if (selectedCity !== null && typeof selectedCity === 'object' && selectedCity.hasOwnProperty('value')) {
                formData.append('cityId', selectedCity.value);
            }
            formData.append('description', description);
            if (action === 'CREATE') {
                await dispatch(handleCUDHotel(`CREATE`, formData))
                navigate('/hoteladmin/home');
            }
        }
    };

    return (
        <>
            <HeaderRegisterCompany />
            <div className="page-container d-flex">
                <div className="col-md-5">
                    <div className="screen-main-header">
                        <div
                            style={{
                                fontSize: '20px',
                                lineHeight: '28px',
                                marginBottom: '30px'
                            }}
                        >
                            {registrationStep === 1 && ('Tên chỗ nghỉ của Quý vị?')}
                            {registrationStep === 2 && ('Chỗ nghỉ Quý vị muốn đăng ký nằm ở đâu?')}
                            {registrationStep === 3 && ('Chỗ nghỉ của Quý vị trông như thế nào?')}
                        </div>
                    </div>
                    {registrationStep === 1 && (
                        <div className="wide-container d-flex flex-column ">
                            <label htmlFor="" className="lable_input"
                                style={{
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    fontWeight: '600',
                                    paddingBottom: '5px'
                                }}
                            >
                                Tên chỗ nghỉ
                            </label>
                            <input
                                type="text"
                                className="hotelName"
                                value={hotelName}
                                onChange={handleOnchangeHotelName}
                            />
                            <label htmlFor="inputAddress" className="form-label">Description</label>
                            <textarea type=""
                                className="form-control name_city"
                                name="hotelName"
                                onChange={handleOnChangeInputDescription}
                                value={description}
                            />
                        </div>
                    )}
                    {registrationStep === 2 && (
                        <div className="wide-container d-flex flex-column ">
                            <div
                                style={{
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    fontWeight: '400',
                                    marginBottom: '24px'
                                }}
                            >Chúng tôi có thể gửi thư để xác nhận vị trí chỗ nghỉ của Quý vị nên hãy đảm bảo cung cấp địa chỉ chính xác – thông tin này sẽ khó thay đổi sau đó.</div>
                            <label htmlFor="" className="lable_input"
                                style={{
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    fontWeight: '600',
                                    paddingBottom: '5px'
                                }}
                            >
                                Tỉnh/thành phố
                            </label>
                            <Select
                                className='cityName_select'
                                options={cityOptions}
                                value={selectedCity}
                                onChange={handleCityChange}
                            />
                            <label htmlFor="" className="lable_input"
                                style={{
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    fontWeight: '600',
                                    paddingBottom: '5px',
                                    paddingTop: '20px'
                                }}
                            >
                                Địa chỉ của Quý vị
                            </label>
                            <input
                                type="text"
                                className="address"
                                value={address}
                                onChange={handleOnchangeAddress}
                                placeholder='Bắt đầu gõ địa chỉ của Quý vị'
                            />
                        </div>
                    )}
                    {registrationStep === 3 && (
                        <div className="wide-container d-flex flex-column ">
                            <div
                                style={{
                                    fontSize: '14px',
                                    lineHeight: '20px',
                                    fontWeight: '400',
                                    marginBottom: '24px'
                                }}
                            ><span
                                style={{ fontWeight: '700' }}
                            >Đăng tải ít nhất 1 ảnh của chỗ nghỉ.</span> Càng đăng nhiều, Quý vị càng có cơ hội nhận đặt phòng. Quý vị có thể thêm ảnh sau.</div>
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

                    )}
                    <div className="list-btn d-flex">
                        <Button
                            style={{
                                marginRight: '5px',
                            }}
                            color="primary"
                            outline
                            onClick={handlePrev}
                        >
                            <i className="ri-arrow-left-s-line"></i>
                        </Button>
                        <Button
                            style={{
                                background: '#0071c2',
                            }}
                            className={`flex-grow-1 btn-submit ${isInputsValid ? '' : 'disabled-button'}`}
                            onClick={handleSubmit}
                            disabled={!isInputsValid}
                        >
                            {registrationStep >= 3 ? 'Hoàn tất' : 'Tiếp tục'}
                        </Button>
                    </div>
                </div>
                <div className="col-md-4"
                    style={{
                        padding: '50px 0px 0px 20px'
                    }}
                >
                    <div className="page_tool__tip d-flex flex-column">
                        <div style={{
                            padding: '16px 16px 30px 16px'
                        }}>
                            <div className=" d-flex flex-row">
                                <i className="ri-thumb-up-line"
                                    style={{
                                        fontSize: '20px',
                                        paddingRight: '10px'
                                    }}
                                ></i>
                                <div
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: '700',
                                        lineHeight: '24px'
                                    }}
                                >
                                    {registrationStep === 1 && ('Tôi nên chú ý điều gì khi chọn tên?')}
                                    {registrationStep === 2 && ('Thông tin gì cần được bao gồm trong địa chỉ của tôi?')}
                                    {registrationStep === 3 && ('Nếu tôi không có ảnh chụp chuyên nghiệp thì sao?')}
                                </div>
                            </div>
                            <div className=""
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    lineHeight: '20px',
                                    paddingLeft: '15px',
                                    marginTop: '30px'
                                }}
                            >
                                {registrationStep === 1 && (
                                    <>
                                        <li>Chọn tên ngắn và hấp dẫn</li>
                                        <li>Tránh sử dụng chữ viết tắt</li>
                                        <li>Đúng với thực tế</li>
                                    </>
                                )}
                                {registrationStep === 2 && (
                                    <>
                                        <li>Bao gồm tên đường và số nhà</li>
                                        <li>Vui lòng cung cấp số căn hộ hoặc số tầng (nếu có)</li>
                                        <li>Cung cấp mã bưu điện</li>
                                        <li>Hãy viết tên đường chính xác</li>
                                        <li>Dùng địa chỉ thực sự của chỗ nghỉ, không dùng địa chỉ văn phòng hay nhà của Quý vị</li>
                                    </>
                                )}
                                {registrationStep === 3 && (
                                    <>
                                        <div
                                            style={{ marginBottom: '20px' }}
                                        >Không sao cả! Quý vị có thể sử dụng smartphone hoặc máy ảnh kỹ thuật số.Sau đây là một số mẹo chụp ảnh đẹp cho chỗ nghỉ của Quý vị</div>
                                        <Link >Sau đây là một số mẹo chụp ảnh đẹp cho chỗ nghỉ của Quý vị</Link>
                                        <div className='mt-4'>Tốt nhất Quý vị nên tránh sử dụng ảnh mà mình không biết tác giả. Quý vị chỉ nên sử dụng ảnh của người khác khi đã có sự chấp thuận của họ.</div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    {registrationStep !== 3 && (
                        <div className="page_tool__tip"
                            style={{
                                marginTop: '20px'
                            }}
                        >
                            <div style={{
                                padding: '16px 16px 30px 16px',
                            }}>
                                <div className=" d-flex flex-row">
                                    <i className="ri-lightbulb-flash-line"
                                        style={{
                                            fontSize: '20px',
                                            paddingRight: '10px'
                                        }}
                                    ></i>
                                    <div
                                        style={{
                                            fontSize: '16px',
                                            fontWeight: '700',
                                            lineHeight: '24px'
                                        }}
                                    >
                                        {registrationStep === 1 && ('Tại sao tôi cần đặt tên cho chỗ nghỉ của mình?')}
                                        {registrationStep === 2 && ('Tại sao tôi cần thêm địa chỉ của mình?')}
                                    </div>
                                </div>
                                <div className="mt-4"
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: '400',
                                        lineHeight: '20px',
                                        paddingLeft: '25px',
                                    }}
                                >
                                    {registrationStep === 1 && (' Tên này giống như tiêu đề đăng ký chỗ nghỉ của Quý vị trên trang web của chúng tôi. Tên này sẽ cho khách biết thông tin cụ thể về chỗ nghỉ, vị trí hoặc những gì Quý vị cung cấp.Điều này sẽ hiển thị cho bất cứ ai truy cập trang web của chúng tôi, vì vậy đừng bao gồm địa chỉ của Quý vị trong tên.')}
                                    {registrationStep === 2 && ('Khi khách đặt chỗ nghỉ của Quý vị, đây là địa chỉ sẽ được chia sẻ với họ. Điều quan trọng là địa chỉ này phải chính xác để khách có thể dễ dàng tìm thấy chỗ nghỉ của Quý vị.')}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
            {loading && (
                <div className="overlay">
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                </div>
            )}
        </>

    )
}

export default DetailCreateHotel;