
import axios from "../axios";

const handleGetCompany = (id) => {
    return axios.get(`/company/api/getCompany?id=${id}`)
}

const handleCreateCompany = (data) => {
    return axios.post(`/company/api/registerCompany`, data);
}


export {
    handleCreateCompany,
    handleGetCompany

}