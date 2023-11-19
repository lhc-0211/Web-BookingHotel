import axios from "../axios";

const handleGetHotel = (id) => {
    return axios.get(`/hotel/api/getHotel?id=${id}`)
}

const handleCreateHotel = (data) => {
    return axios.post(`/hotel/api/createHotel`, data);
}

const handleEditHotel = (data) => {
    return axios.put('/hotel/api/editHotel', data);
}

const handleDeleteHotel = (hotelId) => {
    return axios.delete('/hotel/api/deleteHotel', {
        data: { id: hotelId }
    });
}

const handleGetHotelByCity = (cityId, categoryId) => {
    return axios.get(`/hotel/api/getHotelByCity?cityId=${cityId}&categoryId=${categoryId}`)
}

const handleGetHotelByCategory = (categoryId) => {
    return axios.get(`/hotel/api/getHotelByCategory?categoryId=${categoryId}`)
}

const handleGetHotelByCompany = (companyId) => {
    return axios.get(`/hotel/api/getHotelByCompany?companyId=${companyId}`)
}

const handleGetRoomTypeByHotel = (hotelId) => {
    return axios.get(`/hotel/api/roomType/getRoomType?id=${hotelId}`)
}

const handleGeRoomByRoomType = (roomId) => {
    return axios.get(`/hotel/api/room/getRoom?id=${roomId}`)
}

const handleBooking = (data) => {
    return axios.post(`/hotel/api/room/createReservation`, data)
}

export {
    handleGetHotel,
    handleCreateHotel,
    handleEditHotel,
    handleDeleteHotel,
    handleGetHotelByCity,
    handleGetHotelByCategory,
    handleGetHotelByCompany,
    handleGeRoomByRoomType,
    handleGetRoomTypeByHotel,
    handleBooking
}