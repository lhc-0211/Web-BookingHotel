
import axios from "../axios";

const handleLoginApi = (userName, password) => {
    return axios.post('/user/api/login', { userName, password });
}



export {
    handleLoginApi,

};