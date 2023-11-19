
import db from '../models/index'
import {
    hashUserPassword,
    checkEmail,
    checkUserName
} from '../util/util'
//----------------------------------------------------------------//
// CRUD Guest

// create guest_account

let CreateGuest = async (data) => {
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
                await db.Guest.create({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    userName: data.userName,
                    password: hashPasswordFormBcrypt,
                    address: data.address,
                    phone: data.phone,
                    detail: data.detail
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
// get all or one guest_account
let GetGuest = (guestId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let guests = {};
            if (guestId === 'ALL') {
                guests = await db.Guest.findAll({

                });
            }
            if (guestId && guestId !== 'ALL') {
                guests = await db.Guest.findOne({ where: { id: guestId } });
            }
            resolve(guests);
        } catch (e) {
            reject(e)
        }
    })

}
// edit guest_account
let EditGuest = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let guest = await db.Guest.findOne({ where: { id: data.id } });
            if (guest) {
                guest.firstName = data.firstName;
                guest.lastName = data.lastName;
                guest.email = data.email;
                guest.userName = data.userName;
                guest.password = data.password;
                guest.address = data.address;
                guest.phone = data.phone;
                guest.detail = data.detail;

                await guest.save();
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
let DeleteGuest = (guestId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let guest = await db.Guest.findOne({ where: { id: guestId } })
            if (!guest) {
                resolve({
                    errCode: 2,
                    message: 'Lỗi không lấy được thông tin người dùng cần xóa'
                })
            }
            await guest.destroy()
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
    CreateGuest,
    GetGuest,
    EditGuest,
    DeleteGuest,
}