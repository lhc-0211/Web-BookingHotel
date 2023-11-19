
import guestService from '../services/guestService';

//----------------------------------------------------------------
// Handle guest
let handleCreateGuest = async (req, res) => {
    let guest = await guestService.CreateGuest(req.body);

    return res.status(200).json(guest)
}

let handleGetGuest = async (req, res) => {
    let GuestId = req.query.id;
    if (GuestId) {
        let guests = await guestService.GetGuest(GuestId);
        if (!guests) {
            return res.status(200).json({
                errCode: 2,
                message: 'Tài khoản này không tồn tại trên hệ thống!',
                guests: []
            })
        }
        return res.status(200).json({
            errCode: 0,
            message: 'Cập nhật thành công!',
            guests: guests
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Lỗi chưa lấy được thông tin của người dùng!',
            guests: []
        })
    }
}

let handleEditGuest = async (req, res) => {
    let dataGuest = req.body
    let guestUpdate = await guestService.EditGuest(dataGuest);

    return res.status(200).json(guestUpdate)
}

let handleDeleteGuest = async (req, res) => {
    let GuestId = req.body.id;
    if (!GuestId) {
        return res.status(200).json({
            errCode: 1,
            message: 'Lỗi không lấy được thông tin người dùng!'
        })
    }
    let Guest = await guestService.DeleteGuest(GuestId);
    return res.status(200).json(Guest)
}


module.exports = {
    handleCreateGuest,
    handleGetGuest,
    handleEditGuest,
    handleDeleteGuest,

}