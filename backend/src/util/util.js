
const bcrypt = require('bcrypt');
import db from '../models/index'

// tryparse password
const saltRounds = 10;
export const hashUserPassword = async (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, saltRounds)
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })

}

export let checkEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let accounts = await db.Admin.findOne({
                where: { email }
            }) || await db.Company.findOne({
                where: { email }
            }) || await db.Guest.findOne({
                where: { email }
            })
            if (accounts) {
                resolve(true)
            } else resolve(false)
        } catch (e) {
            reject(e);
        }
    })
}
export let checkUserName = (userName) => {
    return new Promise(async (resolve, reject) => {
        try {
            let accounts = await db.Company.findOne({
                where: { userName }
            })
            if (accounts) {
                resolve(true)
            } else resolve(false)
        } catch (e) {
            reject(e);
        }
    })
}