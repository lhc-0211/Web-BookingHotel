
import companyService from '../services/companyService';

//----------------------------------------------------------------
// Handle company
let handleCreateCompany = async (req, res) => {
    let company = await companyService.CreateCompany(req.body);

    return res.status(200).json(company)
}

let handleGetCompany = async (req, res) => {
    let CompanyId = req.query.id;
    if (CompanyId) {
        let companies = await companyService.GetCompany(CompanyId);
        if (!companies) {
            return res.status(200).json({
                errCode: 2,
                message: 'Tài khoản này không tồn tại trên hệ thống!',
                companies: []
            })
        }
        return res.status(200).json({
            errCode: 0,
            message: 'Cập nhật thành công!',
            companies: companies
        })
    } else {
        return res.status(200).json({
            errCode: 1,
            message: 'Lỗi chưa lấy được thông tin của người dùng!',
            companies: []
        })
    }
}

let handleEditCompany = async (req, res) => {
    let dataCompany = req.body
    let companyUpdate = await companyService.EditCompany(dataCompany);

    return res.status(200).json(companyUpdate)
}

let handleDeleteCompany = async (req, res) => {
    let CompanyId = req.body.id;
    if (!CompanyId) {
        return res.status(200).json({
            errCode: 1,
            message: 'Lỗi không lấy được thông tin người dùng!'
        })
    }
    let Company = await companyService.DeleteCompany(CompanyId);
    return res.status(200).json(Company)
}


module.exports = {
    handleCreateCompany,
    handleGetCompany,
    handleEditCompany,
    handleDeleteCompany,

}