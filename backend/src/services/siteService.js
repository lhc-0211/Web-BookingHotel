
import db from '../models/index'
const bcrypt = require('bcrypt');
//----------------------------------------------------------------
//login
let login = (userName, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let user = await db.Company.findOne({
                attributes: ['id', 'userName', 'password', 'companyName', 'accountType'],
                where: { userName },
                raw: true
            }) || await db.Guest.findOne({
                attributes: ['id', 'userName', 'password', 'firstName', 'lastName', 'accountType'],
                where: { userName },
                raw: true
            }) || await db.Admin.findOne({
                attributes: ['id', 'userName', 'password', 'adminName', 'accountType'],
                where: { userName },
                raw: true
            });

            if (user) {
                // compare the password  
                let check = bcrypt.compareSync(password, user.password);
                if (check) {
                    userData.errCode = 0;
                    userData.message = `Đăng nhập thành công ${user.accountType}!`;
                    delete user.password;
                    userData.data = {
                        ...user,
                        accountType: user.accountType
                    };
                }
                else {
                    userData.errCode = 1;
                    userData.message = "Sai mật khẩu!";
                }
            }
            else {
                userData.errCode = 2;
                userData.message = "Vui lòng kiểm tra lại tài khoản đăng nhập!";
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}
//----------------------------------------------------------------//
// CRUD City

// Create a new city
let checkNameCity = (cityName) => {
    return new Promise(async (resolve, reject) => {
        try {
            let city = await db.City.findOne({ where: { cityName } })
            if (city) resolve(true)
            else resolve(false)
        } catch (e) {
            reject(e)
        }
    })
}
let CreateCity = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkName = await checkNameCity(data.cityName)
            if (checkName === true) {
                resolve({
                    errCode: 1,
                    message: 'Thành phố này đã có trên hệ thống!'
                })
            }
            else {
                await db.City.create({
                    cityName: data.cityName,
                    imageUrl: data.imageUrl,
                    position: data.position,
                })
                resolve({
                    errCode: 0,
                    message: 'Cập nhật thành công!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
// get all or one city
let GetCity = (cityId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cities = {};
            if (cityId === 'ALL') {
                cities = await db.City.findAll();
            }
            if (cityId && cityId !== 'ALL') {
                cities = await db.City.findOne({
                    where: { id: cityId },
                    order: [['cityName', 'ASC']],
                    raw: true,
                    nest: true,
                });
            }
            resolve(cities);
        } catch (e) {
            reject(e)
        }
    })

}
// edit city
let EditCity = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.id) {
                const updateData = {
                    cityName: data.cityName,
                    imageUrl: data.imageUrl,
                    position: data.position,

                }
                if (data.imageUrl) {
                    updateData.imageUrl = data.imageUrl
                }
                await db.City.update(
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
// delete city
let DeleteCity = (cityId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let city = await db.City.findOne({ where: { id: cityId } })
            if (!city) {
                resolve({
                    errCode: 2,
                    message: 'Lỗi không lấy được thông tin thành phố cần xóa'
                })
            }
            await city.destroy()
            resolve({
                errCode: 0,
                message: 'Cập nhật thành công'
            })

        } catch (e) {
            reject(e)
        }
    })
}
//Tìm kiếm city theo position
let FindCityPosition = (position) => {
    return new Promise(async (resolve, reject) => {
        try {
            let citiesFind = {};
            if (position === 'ALL') {
                citiesFind = await db.City.findAll();
            }
            if (position && position !== 'ALL') {
                citiesFind = await db.City.findAll({
                    where: { position: position },
                    order: [['cityName', 'ASC']],
                    raw: true,
                    nest: true,
                });
            }
            resolve(citiesFind);
        } catch (e) {
            reject(e)
        }
    })

}

//----------------------------------------------------------------//
// CRUD Category

// Create a new Category
let checkNameCategory = (categoryName) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await db.Category.findOne({ where: { categoryName } })
            if (category) resolve(true)
            else resolve(false)
        } catch (e) {
            reject(e)
        }
    })
}
let CreateCategory = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkName = await checkNameCategory(data.categoryName)
            if (checkName === true) {
                resolve({
                    errCode: 1,
                    message: 'Loại khách sạn này đã có trên hệ thống!'
                })
            }
            else {
                await db.Category.create({
                    categoryName: data.categoryName,
                    imageUrl: data.imageUrl,
                    styleIcon: data.styleIcon,
                    detail: data.detail
                })
                resolve({
                    errCode: 0,
                    message: 'Cập nhật thành công!'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

// get all or one category
let GetCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let categories = {};
            if (categoryId === 'ALL') {
                categories = await db.Category.findAll(
                    {
                        // include: [
                        //     { model: db.Hotel, as: 'category' }
                        // ],
                        raw: true,
                        nest: true,
                    }
                );
            }
            if (categoryId && categoryId !== 'ALL') {
                categories = await db.Category.findOne({ where: { id: categoryId } });
            }
            resolve(categories);
        } catch (e) {
            reject(e)
        }
    })

}

// edit category
let EditCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.id) {
                const updateData = {
                    categoryName: data.categoryName,
                    imageUrl: data.imageUrl,
                    styleIcon: data.styleIcon,
                    detail: data.detail
                }
                if (data.imageUrl) {
                    updateData.imageUrl = data.imageUrl
                }
                await db.Category.update(
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


// delete category
let DeleteCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let category = await db.Category.findOne({ where: { id: categoryId } })
            if (!category) {
                resolve({
                    errCode: 2,
                    message: 'Lỗi không lấy được thông tin thành phố cần xóa'
                })
            }
            await category.destroy()
            resolve({
                errCode: 0,
                message: 'Cập nhật thành công'
            })

        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    login,

    CreateCity,
    GetCity,
    EditCity,
    DeleteCity,
    FindCityPosition,

    CreateCategory,
    GetCategory,
    EditCategory,
    DeleteCategory,

}