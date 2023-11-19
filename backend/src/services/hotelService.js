import db from '../models/index'
import emailService from './emailServiecs';

// create hotel
let CreateHotel = async (data) => {
    // return new Promise(async (resolve, reject) => {
    //     try {
    //         const hotelData = {
    //             hotelName: data.hotelName,
    //             description: data.description,
    //             companyId: data.companyId,
    //             cityId: data.cityId,
    //             categoryId: data.categoryId,
    //             isActive: data.isActive,
    //         };

    //         // Kiểm tra xem có danh sách hình ảnh (imageUrls) không
    //         if (data.imageUrls && Array.isArray(data.imageUrls)) {
    //             // Nếu có, thêm nó vào đối tượng hotelData
    //             hotelData.imageUrl = data.imageUrls;
    //         }

    //         await db.Hotel.create(hotelData);

    //         resolve({
    //             errCode: 0,
    //             message: 'Cập nhật thành công!',
    //         });
    //     } catch (e) {
    //         reject(e);
    //     }
    // });
    return new Promise(async (resolve, reject) => {
        try {
            await db.Hotel.create({
                hotelName: data.hotelName,
                description: data.description,
                companyId: data.companyId,
                cityId: data.cityId,
                categoryId: data.categoryId,
                address: data.address,
                imageUrl: data.imageUrl,
                isActive: data.isActive,
            })
            resolve({
                errCode: 0,
                message: 'Cập nhật thành công!',
            })


        } catch (e) {
            reject(e)
        }
    })
};
// get hotel
let GetHotel = (hotelId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hotels = {};
            if (hotelId === 'ALL') {
                hotels = await db.Hotel.findAll({
                    include: [
                        { model: db.Category, as: 'category' },
                        { model: db.City, as: 'cityHotel' },
                        { model: db.Company, as: 'company' }
                    ],
                    raw: true,
                    nest: true,
                });
            }
            if (hotelId && hotelId !== 'ALL') {
                hotels = await db.Hotel.findOne({ where: { id: hotelId } });
            }
            resolve(hotels);
        } catch (e) {
            reject(e)
        }
    })
}


// edit hotel
let EditHotel = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.id) {
                const updateData = {
                    hotelName: data.hotelName,
                    description: data.description,
                    companyId: data.companyId,
                    cityId: data.cityId,
                    // categoryId: data.categoryId,
                    address: data.address,
                    isActive: data.isActive,
                    imageUrl: data.imageUrl,

                }
                if (data.imageUrl) {
                    updateData.imageUrl = data.imageUrl
                }
                await db.Hotel.update(
                    updateData, {
                    where: {
                        id: data.id,
                    }
                })
                return resolve({
                    errCode: 0,
                    message: 'Cập nhật thành công!',
                })
            }
            else {
                resolve({
                    errCode: 2,
                    message: 'Không lấy được thông tin cần sửa!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

// delete companu-account
let DeleteHotel = (hotelId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hotel = await db.Hotel.findOne({ where: { id: hotelId } })
            if (!hotel) {
                resolve({
                    errCode: 2,
                    message: 'Lỗi không lấy được thông tin khách sạn cần xóa'
                })
            }
            await hotel.destroy()
            resolve({
                errCode: 0,
                message: 'Cập nhật thành công'
            })

        } catch (e) {
            reject(e)
        }
    })
}

// get hotel by city and category
let GetHotelByCity = (cityId, categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hotels = {};
            if (cityId && categoryId === 'ALL') {
                hotels = await db.Hotel.findAll({
                    include: [
                        { model: db.Category, as: 'category' },
                        { model: db.City, as: 'cityHotel' },
                        { model: db.Company, as: 'company' }
                    ],
                    where: { cityId: cityId },
                    raw: true,
                    nest: true,
                });
            }
            if (cityId && categoryId !== 'ALL') {
                hotels = await db.Hotel.findAll({
                    include: [
                        { model: db.Category, as: 'category' },
                        { model: db.City, as: 'cityHotel', attributes: ['id', 'cityName'], },
                        {
                            model: db.Company,
                            as: 'company',
                            attributes: ['id', 'companyName'],
                        }

                    ],
                    where: {
                        cityId: cityId,
                        categoryId: categoryId
                    },
                    raw: true,
                    nest: true,
                });
            }
            resolve(hotels);
        } catch (e) {
            reject(e)
        }
    })
}

let GetHotelByCategories = (cityId, categories) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hotels = [];

            if (cityId && categories.length > 0) {
                hotels = await db.Hotel.findAll({
                    include: [
                        {
                            model: db.Category,
                            as: 'category',
                            attributes: [],
                        },
                        {
                            model: db.City,
                            as: 'cityHotel',
                            attributes: [],
                        },
                        {
                            model: db.Company,
                            as: 'company',
                            attributes: ['id', 'name'],
                        },
                    ],
                    where: {
                        cityId: cityId,
                        '$category.id$': {
                            [db.Sequelize.Op.in]: categories,
                        },
                    },
                    raw: true,
                    nest: true,
                });
            }

            resolve(hotels);
        } catch (e) {
            reject(e);
        }
    });
};

//get hotel bu company
let GetHotelByCompany = (companyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hotelsFindByCompany = {};
            if (companyId) {
                hotelsFindByCompany = await db.Hotel.findAll({
                    include: [
                        { model: db.Category, as: 'category' },
                        { model: db.City, as: 'cityHotel' },
                        { model: db.Company, as: 'company' }
                    ],
                    where: {
                        companyId: companyId
                    },
                    raw: true,
                    nest: true,
                });
            }
            // if (hotelId && hotelId !== 'ALL') {
            //     hotelsFindByCompany = await db.Hotel.findOne({ where: { id: hotelId } });
            // }
            resolve(hotelsFindByCompany);
        } catch (e) {
            reject(e)
        }
    })
};

// get hotel by category
let GetHotelByCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hotels = {};
            if (categoryId) {
                hotels = await db.Hotel.findAll({
                    include: [
                        { model: db.Category, as: 'category' },
                        { model: db.City, as: 'cityHotel' },
                        { model: db.Company, as: 'company' }

                    ],
                    where: { categoryId: categoryId },
                    raw: true,
                    nest: true,
                });
            }
            resolve(hotels);
        } catch (e) {
            reject(e)
        }
    })
};

//room
//create room
const CreateRoom = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Room.create(
                {
                    roomName: data.roomName,
                    description: data.description,
                    roomTypeId: data.roomTypeId,
                    currentPrice: data.currentPrice,
                    imageUrl: data.imageUrl
                }

            )
            resolve({
                errCode: 0,
                message: 'Cập nhật thành công!'
            })
        } catch (error) {
            reject(error)
        }
    })
}

let GetRoom = (roomTypeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let rooms = {};
            if (roomTypeId) {
                rooms = await db.Room.findAll({
                    include: [
                        { model: db.RoomType },
                    ],
                    where: { roomTypeId },
                    raw: true,
                    nest: true,
                });
            }
            resolve(rooms);
        } catch (e) {
            reject(e)
        }
    })
}

//roomType
//create roomtype
const CreateRoomType = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.RoomType.create(
                {
                    roomTypeName: data.roomTypeName,
                    description: data.description,
                    beds: data.beds,
                    sleeps: data.sleeps,
                    hotelId: data.hotelId,
                }

            )
            resolve({
                errCode: 0,
                message: 'Cập nhật thành công!'
            })
        } catch (error) {
            reject(error)
        }
    })
}

let GetRoomType = (hotelId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let roomTypeIds = {};
            if (hotelId) {
                roomTypeIds = await db.RoomType.findAll({
                    where: { hotelId },
                    raw: true,
                    nest: true,
                });
            }
            resolve(roomTypeIds);
        } catch (e) {
            reject(e)
        }
    })
}

const CreateReservation = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Reservation.create(
                {
                    guestId: data.guestId,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    discountPercent: data.discountPercent,
                    totalPrice: data.totalPrice,
                    isBrowsing: data.isBrowsing
                }

            )
            await emailService.sendSimpleEmail({
                Email: data.Email,
                Ten: data.Ten,
                Phone: data.Phone,
                startDate: data.startDate,
                endDate: data.endDate,
                MaPhong: data.roomId,
                Gia: data.Gia,
            })
            resolve({
                errCode: 0,
                message: 'Cập nhật thành công!'
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    CreateHotel,
    GetHotel,
    EditHotel,
    DeleteHotel,
    CreateRoom,
    GetHotelByCity,
    GetHotelByCategory,
    GetHotelByCategories,
    GetHotelByCompany,
    GetRoom,
    CreateRoomType,
    GetRoomType,

    CreateReservation
}