import axios from "../axios";

const handleGetCity = (id) => {
    return axios.get(`/city/api/getCity?id=${id}`)
}

const handleCreateCity = (data) => {
    return axios.post(`/city/api/createCity`, data);
}

const handleEditCity = (data) => {
    return axios.put('/city/api/editCity', data);
}

const handleDeleteCity = (cityId) => {
    return axios.delete('/city/api/deleteCity', {
        data: { id: cityId }
    });
}

const handleGetCityFind = (position) => {
    return axios.get(`/city/api/findCityPosition?position=${position}`)
}

///category
const handleGetCategory = (id) => {
    return axios.get(`/category/api/getCategory?id=${id}`)
}

const handleCreateCategory = (data) => {
    return axios.post(`/category/api/createCategory`, data);
}

const handleEditCategory = (data) => {
    return axios.put('/category/api/editCategory', data);
}

const handleDeleteCategory = (categoryId) => {
    return axios.delete('/category/api/deleteCategory', {
        data: { id: categoryId }
    });
}

export {
    handleGetCity,
    handleCreateCity,
    handleEditCity,
    handleDeleteCity,
    handleGetCityFind,
    handleGetCategory,
    handleCreateCategory,
    handleEditCategory,
    handleDeleteCategory,

}