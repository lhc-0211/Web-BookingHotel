
import express from 'express';
let router = express.Router();
import AdminController from '../controllers/AdminController'

//CALL API
// ADMIN API

//Create admin ---> [POST] admin/api/register
router.post('/api/registerAdmin', AdminController.handleCreateAdmin);
// //Read company ---> [GET] company/api/getCompany
// router.get('/api/getCompany', CompanyController.handleGetCompany)
// //Update company ---> [PUT] company/api/updateCompany
// router.put('/api/updateCompany', CompanyController.handleEditCompany);
// //Delete company ---> [DELETE] company/api/deleteCompany
// router.delete('/api/deleteCompany', CompanyController.handleDeleteCompany);


module.exports = router;