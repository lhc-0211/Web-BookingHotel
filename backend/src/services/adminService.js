
import db from '../models/index'
const bcrypt = require('bcrypt');
import {
    hashUserPassword,
    checkEmail,
    checkUserName
} from '../util/util'

let createAdmin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkname = await checkUserName(data.userName)
            if (checkname) {
                resolve({
                    errCode: 1,
                    message: 'Tài khoản này đã có trên hệ thống'
                })
            }
            else {
                let hashPasswordFormBcrypt = await hashUserPassword(data.password)
                await db.Admin.create({
                    adminName: data.adminName,
                    email: data.email,
                    userName: data.userName,
                    password: hashPasswordFormBcrypt,
                })
                resolve({
                    errCode: 0,
                    message: 'Cập nhật thành công!',
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createAdmin,

}