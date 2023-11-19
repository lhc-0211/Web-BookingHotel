
import express from 'express';
let router = express.Router();
import hotelController from '../controllers/HotelController'
const fileUploader = require('../config/cloudinary.config');

//CALL API
// COMPANY API

//Create hotel ---> [POST] hotel/api/register
router.post('/api/createHotel', fileUploader.single('imageUrl'), hotelController.handleCreateHotel);
//Read hotel ---> [GET] hotel/api/getHotel
router.get('/api/getHotel', hotelController.handleGetHotel)
//Update hotel ---> [PUT] hotel/api/editHotel
router.put('/api/editHotel', fileUploader.single('imageUrl'), hotelController.handleEditHotel);
//Delete hotel ---> [DELETE] hotel/api/deleteHotel
router.delete('/api/deleteHotel', hotelController.handleDeleteHotel);
//Read hotel by city ---> [GET] hotel/api/getHotelByCity
router.get('/api/getHotelByCity', hotelController.handleGetHotelByCity)
//Read hotel by category ---> [GET] hotel/api/getHotelByCategory
router.get('/api/getHotelByCategory', hotelController.handleGetHotelByCategory)
//Read hotel by category ---> [GET] hotel/api/getHotelByCategory
router.get('/api/getHotelByCategories', hotelController.handleGetHotelByCategories)
//Read hotel by company ---> [GET] hotel/api/getHotelByCompany
router.get('/api/getHotelByCompany', hotelController.handleGetHotelByCompany)
//ROOM API
//Create room ---> [GET] hotel/room/api/createRoom
router.post('/api/room/createRoom', hotelController.handleCreateRoom);
router.get('/api/room/getRoom', hotelController.handleGetRoom);

//ROOM TYPE API
//Create room ---> [GET] hotel/room/api/createRoom
router.post('/api/roomType/createRoomType', hotelController.handleCreateRoomType);
router.get('/api/roomType/getRoomType', hotelController.handleGetRoomType);

router.post('/api/room/createReservation', hotelController.handleCreateReservation);


module.exports = router;