
import adminService from '../services/adminService';

//----------------------------------------------------------------
// Handle company
let handleCreateAdmin = async (req, res) => {
    let admin = await adminService.createAdmin(req.body);

    return res.status(200).json(admin)
}

module.exports = {
    handleCreateAdmin,

}