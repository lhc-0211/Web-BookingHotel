import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

import {
    handleGetCategory,
    handleCreateCategory,
    handleEditCategory,
    handleDeleteCategory,

} from '../../services/siteService'

//[GET] category
export const fetchCategories = () => {
    return async (dispatch) => {
        try {
            const response = await handleGetCategory('ALL');
            const categories = response.categories;
            dispatch(fetchCategoriesSuccess(categories));
        } catch (error) {
            dispatch(fetchCategoriesFail());
        }
    };
};

export const fetchCategoriesSuccess = (categories) => ({
    type: actionTypes.FETCH_CATEGORIES_SUCCESS,
    payload: categories,
});

export const fetchCategoriesFail = () => ({
    type: actionTypes.FETCH_CATEGORIES_FAIL,
});

// [CREATE_CATEGORY] và [EDIT_CATEGORY]
export const createCategoryStart = () => ({
    type: actionTypes.CREATE_CATEGORY_START,
});

export const createCategorySuccess = (category) => ({
    type: actionTypes.CREATE_CATEGORY_SUCCESS,
    payload: category,
});

export const createCategoryFail = (error) => ({
    type: actionTypes.CREATE_CATEGORY_FAIL,
    payload: error,
});

export const editCategoryStart = () => ({
    type: actionTypes.EDIT_CATEGORY_START,
});

export const editCategorySuccess = (category) => ({
    type: actionTypes.EDIT_CATEGORY_SUCCESS,
    payload: category,
});

export const editCategoryFail = (error) => ({
    type: actionTypes.EDIT_CATEGORY_FAIL,
    payload: error,
});

export const deleteCategoryStart = () => ({
    type: actionTypes.DELETE_CATEGORY_START,
});

export const deleteCategorySuccess = (category) => ({
    type: actionTypes.DELETE_CATEGORY_SUCCESS,
    payload: category,
});

export const deleteCategoryFail = (error) => ({
    type: actionTypes.DELETE_CATEGORY_FAIL,
    payload: error,
});

export const handleCUDCategory = (actionType, categoryData) => async (dispatch) => {
    let startAction, successAction, failAction;

    if (actionType === 'CREATE') {
        startAction = createCategoryStart();
        successAction = createCategorySuccess;
        failAction = createCategoryFail;
    } else if (actionType === 'EDIT') {
        startAction = editCategoryStart();
        successAction = editCategorySuccess;
        failAction = editCategoryFail;
    } else if (actionType === 'DELETE') {
        startAction = deleteCategoryStart();
        successAction = deleteCategorySuccess;
        failAction = deleteCategoryFail;
    }

    try {
        dispatch(startAction);
        let response;

        if (actionType === 'CREATE') {
            response = await handleCreateCategory(categoryData);
        } else if (actionType === 'EDIT') {
            response = await handleEditCategory(categoryData);
        } else if (actionType === 'DELETE') {
            response = await handleDeleteCategory(categoryData.id);
        }

        const category = response.category;
        if (response && response.errCode === 0) {
            toast.success('Cập nhật thành công');
            dispatch(successAction(category));
        }
        else toast.error(`${response.message}`)
    } catch (error) {
        toast.error('Cập nhật thất bại')
        dispatch(failAction(error.message));
    }
};