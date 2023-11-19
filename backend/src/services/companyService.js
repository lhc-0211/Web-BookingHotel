
import db from '../models/index'
import {
    hashUserPassword,
    checkEmail,
    checkUserName
} from '../util/util'
//----------------------------------------------------------------//
// CRUD Company

// create company_account

let CreateCompany = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkemail = await checkEmail(data.email)
            let checkuserName = await checkUserName(data.userName)
            if (checkemail === true) {
                resolve({
                    errCode: 1,
                    message: 'Email này đã được đăng kí trên hệ thống'
                })
            }
            else if (checkuserName === true) {
                resolve({
                    errCode: 1,
                    message: 'UserName này đã được đăng kí trên hệ thống'
                })
            }
            else {
                let hashPasswordFormBcrypt = await hashUserPassword(data.password)
                await db.Company.create({
                    companyName: data.companyName,
                    email: data.email,
                    userName: data.userName,
                    password: hashPasswordFormBcrypt,
                    companyAddress: data.companyAddress,
                    phone: data.phone,
                    detail: data.detail,
                    isActive: data.isActive,
                    cityId: data.cityId
                })
                resolve({
                    errCode: 0,
                    message: 'Cập nhật thành công!',
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
// get all or one company_account
let GetCompany = (companyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let companies = {};
            if (companyId === 'ALL') {
                companies = await db.Company.findAll({
                    include: [
                        { model: db.City, as: 'city' }
                    ],
                    raw: true,
                    nest: true,
                });
            }
            if (companyId && companyId !== 'ALL') {
                companies = await db.Company.findOne({ where: { id: companyId } });
            }
            resolve(companies);
        } catch (e) {
            reject(e)
        }
    })

}
// edit company_account
let EditCompany = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let company = await db.Company.findOne({ where: { id: data.id } });
            if (company) {
                company.companyName = data.companyName;
                company.email = data.email;
                company.companyAddress = data.companyAddress;
                company.detail = data.detail;
                company.isActive = data.isActive;
                company.cityId = data.cityId;
                company.password = data.password;

                await company.save();
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
// delete companu-account
let DeleteCompany = (companyId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let company = await db.Company.findOne({ where: { id: companyId } })
            if (!company) {
                resolve({
                    errCode: 2,
                    message: 'Lỗi không lấy được thông tin người dùng cần xóa'
                })
            }
            await company.destroy()
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
    CreateCompany,
    GetCompany,
    EditCompany,
    DeleteCompany,
}