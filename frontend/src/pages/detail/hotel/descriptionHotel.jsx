
import React from "react";
import PoolIcon from '@mui/icons-material/Pool';
import ForestIcon from '@mui/icons-material/Forest';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { Button } from 'reactstrap'

const DescriptionHotel = () => {
    return (
        <div className='detail_wrapper d-flex mt-4'>
            <div className='detail_wrapper--description '>
                <div className='detail_wrapper--description-title'>
                    Trải nghiệm dịch vụ đẳng cấp thế giới ở  chỗ chúng tôi
                </div>
                <div className='detail_wrapper--description-content'>
                    <p></p>
                    <p>Tọa lạc tại thành phố Đà Nẵng, cách Bãi biển Bắc Mỹ An 600 m, Glese Pool Villas & Resort Danang cung cấp chỗ nghỉ với hồ bơi ngoài trời, chỗ đỗ xe riêng miễn phí, trung tâm thể dục và khu vườn. Mỗi chỗ nghỉ tại resort 5 sao này đều có tầm nhìn ra hồ bơi và du khách có thể thư giãn tại sảnh khách chung cũng như dùng bữa tại nhà hàng. Nơi đây có lễ tân 24 giờ, dịch vụ đưa đón sân bay, CLB trẻ em và WiFi miễn phí.</p>
                    <p></p>
                    <p>Phòng nghỉ gắn máy điều hòa tại Glese Pool Villas & Resort Danang được bố trí bàn làm việc, ấm đun nước, tủ lạnh, lò vi sóng, két an toàn, TV màn hình phẳng, sân hiên và phòng tắm riêng đi kèm vòi sen. Mỗi phòng đều sử dụng phòng tắm chung với bồn tắm, đồ vệ sinh cá nhân miễn phí và máy sấy tóc. Các phòng được trang bị ga trải giường và khăn tắm.</p>
                    <p></p>
                    <p>Chỗ nghỉ phục vụ bữa sáng kiểu lục địa, kiểu Anh/Ai-len hoặc kiểu Ý hằng ngày.</p>
                    <p></p>
                    <p>Du khách có thể chơi tennis tại resort 5 sao này và khu vực này nổi tiếng với hoạt động đi xe đạp.</p>
                    <p></p>
                    <p>Chỗ nghỉ nằm cách Bãi biển Mỹ Khê 1,5 km và Công viên Châu Á 3,4 km. Sân bay gần nhất là sân bay quốc tế Đà Nẵng, nằm trong bán kính 8 km từ Glese Pool Villas & Resort Danang.</p>
                    <p></p>
                    <p>Các khoảng cách nêu trong mô tả chỗ nghỉ được tính toán bằng © OpenStreetMap</p>
                </div>
            </div>
            <div className='detail_wrapper--service'>
                <div className='bui-f-font-heading'>
                    Điểm nổi bật của chỗ nghỉ
                </div>
                <div className='ph-section'>
                    <div className="ph-content">
                        Hoàn hảo cho kỉ nghỉ 4 đêm
                    </div>
                    <div className="ph-content d-flex"
                    >
                        <i className="ri-map-pin-line"></i>
                        <p>Địa điểm hàng đầu: Được khách gần đây đánh giá cao</p>
                    </div>
                </div>
                <div className='ph-section'>
                    <div className="ph-content">
                        Thông tin về bữa sáng
                    </div>
                    <div className="ph-content d-flex"
                    >
                        <p>Kiểu lục địa, Kiểu Ý, Kiểu Anh/ Ai Len, Kiểu Á, Kiểu Mỹ</p>
                    </div>
                </div>
                <div className='ph-section'>
                    <div className="ph-content">
                        Các lựa chọn với
                    </div>
                    <div className="ph-content d-flex"
                    >
                        <PoolIcon />
                        <p>Hồ bơi có tầm nhìn</p>
                    </div>
                    <div className="ph-content d-flex flex-column"
                    >
                        <div className='d-flex'>
                            <ForestIcon />
                            <p>Hướng nhìn sân trong</p>
                        </div>
                        <div className='d-flex'>
                            <LocalFloristIcon />
                            <p>Nhìn ra vườn</p>
                        </div>

                    </div>

                </div>
                <Button
                    style={{
                        width: '100%',
                    }}
                    color='primary'
                >
                    Đặt ngay
                </Button>

            </div>
        </div>
    )
}

export default DescriptionHotel;