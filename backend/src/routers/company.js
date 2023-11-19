
import express from 'express';
let router = express.Router();
import CompanyController from '../controllers/CompanyController'

//CALL API
// COMPANY API

//Create company ---> [POST] company/api/register
router.post('/api/registerCompany', CompanyController.handleCreateCompany);
//Read company ---> [GET] company/api/getCompany
router.get('/api/getCompany', CompanyController.handleGetCompany)
//Update company ---> [PUT] company/api/updateCompany
router.put('/api/updateCompany', CompanyController.handleEditCompany);
//Delete company ---> [DELETE] company/api/deleteCompany
router.delete('/api/deleteCompany', CompanyController.handleDeleteCompany);


module.exports = router;