
import hotelService from '../services/hotelService';

//----------------------------------------------------------------
// Handle hotel
const handleCreateHotel = async (req, res) => {
    // try {
    //     const images = req.files; // Lấy danh sách các hình ảnh đã tải lên
    //     const imagePaths = images.map((image) => image.path);

    //     const hotelData = {
    //         ...req.body,
    //         imageUrl: imagePaths, // imageUrl là một mảng chứa đường dẫn của các hình ảnh
    //     };

    //     const hotel = await hotelService.CreateHotel(hotelData);

    //     return res.status(200).json(hotel);
    // } catch (error) {
    //     console.error('Error:', error);
    //     return res.status(500).json({ error: 'Server error' });
    // }
    let image = req.file
    let hotel = await hotelService.CreateHotel({ ...req.body, imageUrl: image?.path });

    return res.status(200).json(hotel)
};

let handleGetHotel = async (req, res) => {
    let HotelId = req.query.id;
    if (HotelId) {
        let hotels = await hotelService.GetHotel(HotelId);
        if (!hotels) {
            return res.status(404).json({
                errCode: 2,
                message: 'Khách sạn này không tồn tại trên hệ thống!',
                hotels: []
            })
        }
        return res.status(200).json({
            errCode: 0,
            message: 'Cập nhật thành công!',
            hotels: hotels
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Lỗi chưa lấy được thông tin của khách sạn!',
            hotels: []
        })
    }
}

let handleEditHotel = async (req, res) => {
    let image = req.file
    let hotelUpdate = await hotelService.EditHotel({ ...req.body, imageUrl: image?.path });

    return res.status(200).json(hotelUpdate)
}

let handleDeleteHotel = async (req, res) => {
    let HotelId = req.body.id;
    if (!HotelId) {
        return res.status(200).json({
            errCode: 1,
            message: 'Lỗi không lấy được thông tin khách sạn!'
        })
    }
    let Hotel = await hotelService.DeleteHotel(HotelId);
    return res.status(200).json(Hotel)
}

//get hotel by city
let handleGetHotelByCity = async (req, res) => {
    let cityId = req.query.cityId;
    let categoryId = req.query.categoryId;
    if (cityId && categoryId) {
        let hotelsFindByCity = await hotelService.GetHotelByCity(cityId, categoryId);
        if (!hotelsFindByCity) {
            return res.status(404).json({
                errCode: 2,
                message: 'Khách sạn này không tồn tại trên hệ thống!',
                hotelsFindByCity: []
            })
        }
        return res.status(200).json({
            errCode: 0,
            message: 'Cập nhật thành công!',
            hotelsFindByCity: hotelsFindByCity
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Lỗi chưa lấy được thông tin của khách sạn!',
            hotelsFindByCity: []
        })
    }
}


//get hotel by category
let handleGetHotelByCategory = async (req, res) => {
    let categoryId = req.query.categoryId;
    if (categoryId) {
        let hotelsFindByCategory = await hotelService.GetHotelByCategory(categoryId);
        if (!hotelsFindByCategory) {
            return res.status(404).json({
                errCode: 2,
                message: 'Khách sạn này không tồn tại trên hệ thống!',
                hotelsFindByCategory: []
            })
        }
        return res.status(200).json({
            errCode: 0,
            message: 'Cập nhật thành công!',
            hotelsFindByCategory: hotelsFindByCategory
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Lỗi chưa lấy được thông tin của khách sạn!',
            hotelsFindByCategory: []
        })
    }
}

let handleGetHotelByCategories = async (req, res) => {
    let cityid = req.query.cityId;
    let categoryIds = req.query.categoryIds; // Thay đổi tên biến categoryId thành categoryIds
    if (categoryIds) {
        if (typeof categoryIds !== 'string') {
            return res.status(400).json({
                errCode: 1,
                message: 'Danh sách categoryId không hợp lệ!',
                hotelsFindByCategory: []
            });
        }

        // Chuyển chuỗi danh sách categoryIds thành mảng các số nguyên
        const categoryIdsArray = categoryIds.split(',').map(Number);

        if (categoryIdsArray.length === 0) {
            return res.status(400).json({
                errCode: 1,
                message: 'Danh sách categoryId không hợp lệ!',
                hotelsFindByCategory: []
            });
        }


        let hotelsFindByCategories = [];

        // Lặp qua từng categoryId và lấy danh sách khách sạn cho mỗi categoryId
        for (const categoryId of categoryIdsArray) {
            const hotelsFindByCategory = await hotelService.GetHotelByCategories(cityid, categoryId);
            if (hotelsFindByCategory) {
                hotelsFindByCategories.push(...hotelsFindByCategory);
            }
        }

        if (hotelsFindByCategories.length === 0) {
            return res.status(404).json({
                errCode: 2,
                message: 'Không có khách sạn nào thuộc các danh mục được chọn!',
                hotelsFindByCategory: []
            });
        }

        return res.status(200).json({
            errCode: 0,
            message: 'Cập nhật thành công!',
            hotelsFindByCategory: hotelsFindByCategories
        });
    } else {
        return res.status(400).json({
            errCode: 1,
            message: 'Thiếu danh sách categoryId!',
            hotelsFindByCategory: []
        });
    }
}


let handleGetHotelByCompany = async (req, res) => {
    let companyId = req.query.companyId;
    if (companyId) {
        let hotelsFindByCompany = await hotelService.GetHotelByCompany(companyId);
        if (!hotelsFindByCompany) {
            return res.status(404).json({
                errCode: 2,
                message: 'Khách sạn này không tồn tại trên hệ thống!',
                hotelsFindByCompany: []
            })
        }
        return res.status(200).json({
            errCode: 0,
            message: 'Cập nhật thành công!',
            hotelsFindByCompany: hotelsFindByCompany
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Lỗi chưa lấy được thông tin của khách sạn!',
            hotelsFindByCompany: []
        })
    }
}

//handle room
let handleCreateRoom = async (req, res) => {
    let room = await hotelService.CreateRoom(req.body);

    return res.status(200).json(room);
}

let handleGetRoom = async (req, res) => {
    let RoomId = req.query.id;
    if (RoomId) {
        let rooms = await hotelService.GetRoom(RoomId);
        if (!rooms) {
            return res.status(404).json({
                errCode: 2,
                message: 'Dữ liệu này không tồn tại trên hệ thống!',
                rooms: []
            })
        }
        return res.status(200).json({
            errCode: 0,
            message: 'Cập nhật thành công!',
            rooms: rooms
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Lỗi chưa lấy được thông tin của phòng!',
            rooms: []
        })
    }
}


//handle roomType
let handleCreateRoomType = async (req, res) => {
    let room = await hotelService.CreateRoomType(req.body);

    return res.status(200).json(room);
}

let handleGetRoomType = async (req, res) => {
    let RoomTypeId = req.query.id;
    if (RoomTypeId) {
        let roomTypes = await hotelService.GetRoomType(RoomTypeId);
        if (!roomTypes) {
            return res.status(404).json({
                errCode: 2,
                message: 'Dữ liệu này không tồn tại trên hệ thống!',
                roomTypes: []
            })
        }
        return res.status(200).json({
            errCode: 0,
            message: 'Cập nhật thành công!',
            roomTypes: roomTypes
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Lỗi chưa lấy được thông tin của kiểu phòng!',
            roomTypes: []
        })
    }
}

//handle roomType
let handleCreateReservation = async (req, res) => {
    let room = await hotelService.CreateReservation(req.body);

    return res.status(200).json(room);
}


module.exports = {
    handleCreateHotel,
    handleGetHotel,
    handleEditHotel,
    handleDeleteHotel,

    handleCreateRoom,
    handleGetRoom,

    handleGetHotelByCity,
    handleGetHotelByCategory,
    handleGetHotelByCategories,
    handleGetHotelByCompany,

    handleCreateRoomType,
    handleGetRoomType,

    handleCreateReservation
}