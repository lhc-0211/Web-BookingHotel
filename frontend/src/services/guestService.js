
import axios from "../axios";

const handleGetGuest = (id) => {
    return axios.get(`/guest/api/getGuest?id=${id}`)
}

const handleCreateGuest = (data) => {
    return axios.post(`/guest/api/registerGuest`, data);
}

export {
    handleCreateGuest,
    handleGetGuest

}