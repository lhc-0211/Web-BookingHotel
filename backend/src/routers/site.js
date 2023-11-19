
import express from 'express';
import siteController from '../controllers/SiteController'
const fileUploader = require('../config/cloudinary.config');

const router = express.Router();




//CALL API
//LOGIN
router.post('/user/api/login', siteController.handleLogin);


// CITY API

//Create city ---> [POST] city/api/createCity
router.post('/city/api/createCity', fileUploader.single('imageUrl'), siteController.handleCreateCity);
//Read city ---> [GET] city/api/readCity
router.get('/city/api/getCity', siteController.handleGetCity);
//Edieve city ---> [PUT] city/api/editCity
router.put('/city/api/editCity', fileUploader.single('imageUrl'), siteController.handleEditCity);
//Delete city ---> [DELETE] city/api/deleteCity
router.delete('/city/api/deleteCity', siteController.handleDeleteCity);
//Find city position ---> [GET] city/api/findCityPosition
router.get('/city/api/findCityPosition', siteController.handleFindCityPosition);
// CATEGORY API
//Create category ---> [POST] category/api/createCategory
router.post('/category/api/createCategory', fileUploader.single('imageUrl'), siteController.handleCreateCategory);
//Read category ---> [GET] category/api/readCategory
router.get('/category/api/getCategory', siteController.handleGetCategory);
//Edieve category ---> [PUT] category/api/editCategory
router.put('/category/api/editCategory', fileUploader.single('imageUrl'), siteController.handleEditCategory);
//Delete category ---> [DELETE] category/api/deleteCategory
router.delete('/category/api/deleteCategory', siteController.handleDeleteCategory);

module.exports = router;
