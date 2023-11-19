
import express from 'express';
let router = express.Router();
import GuestController from '../controllers/GuestController'

//CALL API
// GUEST API

//Create company ---> [POST] company/api/register
router.post('/api/registerGuest', GuestController.handleCreateGuest);
//Read company ---> [GET] company/api/getGuest
router.get('/api/getGuest', GuestController.handleGetGuest)
//Update company ---> [PUT] company/api/updateGuest
router.put('/api/updateGuest', GuestController.handleEditGuest);
//Delete company ---> [DELETE] company/api/deleteGuest
router.delete('/api/deleteGuest', GuestController.handleDeleteGuest);

module.exports = router;