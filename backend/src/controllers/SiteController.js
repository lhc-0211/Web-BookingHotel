
import siteService from '../services/siteService'

//----------------------------------------------------------------
// Handle login
let handleLogin = async (req, res) => {
    let userName = req.body.userName;
    let password = req.body.password;

    if (!userName || !password) {
        return res.status(200).json({
            errCode: 1,
            message: 'Vui lòng nhập đủ thông tin đăng nhập'
        })
    }
    let userData = await siteService.login(userName, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.data ? userData.data : {}
    })
}



//----------------------------------------------------------------
// Handle city
let handleCreateCity = async (req, res) => {
    let image = req.file
    let city = await siteService.CreateCity({ ...req.body, imageUrl: image?.path });
    return res.status(200).json(city);
}
let handleGetCity = async (req, res) => {
    let cityId = req.query.id;
    if (cityId) {
        let cities = await siteService.GetCity(cityId);
        if (!cities) {
            return res.status(200).json({
                errCode: 2,
                message: 'Thành phố này không tồn tại trên hệ thống',
                cities: []
            })
        }
        return res.status(200).json({
            errCode: 0,
            message: 'Cập nhật thành công!',
            cities: cities
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Lỗi chưa lấy được thông tin của thành phố!',
            cities: []
        })
    }
}
let handleEditCity = async (req, res) => {
    let image = req.file
    let cityUpdate = await siteService.EditCity({ ...req.body, imageUrl: image?.path });

    return res.status(200).json(cityUpdate)
}
let handleDeleteCity = async (req, res) => {
    let CityId = req.body.id;
    if (!CityId) {
        return res.status(200).json({
            errCode: 1,
            message: 'Lỗi không lấy được thông tin thành phố!'
        })
    }
    let City = await siteService.DeleteCity(CityId);
    return res.status(200).json(City)
}

let handleFindCityPosition = async (req, res) => {
    let cityPosition = req.query.position;
    if (cityPosition) {
        let citiesFind = await siteService.FindCityPosition(cityPosition);
        if (!citiesFind) {
            return res.status(200).json({
                errCode: 2,
                message: 'Thành phố này không tồn tại trên hệ thống',
                citiesFind: []
            })
        }
        return res.status(200).json({
            errCode: 0,
            message: 'Cập nhật thành công!',
            citiesFind: citiesFind
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Lỗi chưa lấy được thông tin của thành phố!',
            citiesFind: []
        })
    }
}
//----------------------------------------------------------------
// Handle category
let handleCreateCategory = async (req, res) => {
    let image = req.file
    let category = await siteService.CreateCategory({ ...req.body, imageUrl: image?.path });
    return res.status(200).json(category);
}
let handleGetCategory = async (req, res) => {
    let categoryId = req.query.id;
    if (categoryId) {
        let categories = await siteService.GetCategory(categoryId);
        if (!categories) {
            return res.status(200).json({
                errCode: 2,
                message: 'Loại khách sạn này không tồn tại trên hệ thống',
                categories: []
            })
        }
        return res.status(200).json({
            errCode: 0,
            message: 'Cập nhật thành công!',
            categories: categories
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Lỗi không lấy được thông tin!',
            categories: []
        })
    }
}
let handleEditCategory = async (req, res) => {
    let image = req.file
    let categoryUpdate = await siteService.EditCategory({ ...req.body, imageUrl: image?.path });

    return res.status(200).json(categoryUpdate)
}
let handleDeleteCategory = async (req, res) => {
    let CategoryId = req.body.id;
    if (!CategoryId) {
        return res.status(200).json({
            errCode: 1,
            message: 'Lỗi không lấy được thông tin!'
        })
    }
    let Category = await siteService.DeleteCategory(CategoryId);
    return res.status(200).json(Category)
}



module.exports = {
    handleLogin,

    handleCreateCity,
    handleGetCity,
    handleEditCity,
    handleDeleteCity,
    handleFindCityPosition,
    handleCreateCategory,
    handleGetCategory,
    handleEditCategory,
    handleDeleteCategory,

}