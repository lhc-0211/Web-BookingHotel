import actionTypes from './actionTypes';
import { toast } from 'react-toastify';

import {
    handleCreateCompany,
    handleGetCompany,

} from '../../services/companyService'

//[GET] companies
export const fetchCompanies = () => {
    return async (dispatch) => {
        try {
            const response = await handleGetCompany('ALL');
            const companies = response.companies;
            dispatch(fetchCompaniesSuccess(companies));
        } catch (error) {
            dispatch(fetchCompaniesFail());
        }
    };
};

export const fetchCompaniesSuccess = (companies) => ({
    type: actionTypes.FETCH_COMPANIES_SUCCESS,
    payload: companies,
});

export const fetchCompaniesFail = () => ({
    type: actionTypes.FETCH_COMPANIES_FAIL,
});

// [CREATE_COMPANY]
export const createCompanyStart = () => ({
    type: actionTypes.CREATE_COMPANY_START,
});

export const createCompanySuccess = (company) => ({
    type: actionTypes.CREATE_COMPANY_SUCCESS,
    payload: company,
});

export const createCompanyFail = (error) => ({
    type: actionTypes.CREATE_COMPANY_FAIL,
    payload: error,
});

export const handleCUDCompany = (actionType, companyData) => async (dispatch) => {
    let startAction, successAction, failAction;

    if (actionType === 'CREATE') {
        startAction = createCompanyStart();
        successAction = createCompanySuccess;
        failAction = createCompanyFail;
    }
    //  else if (actionType === 'EDIT') {
    //     startAction = editCompanyStart();
    //     successAction = editCompanySuccess;
    //     failAction = editCompanyFail;
    // } else if (actionType === 'DELETE') {
    //     startAction = deleteCompanyStart();
    //     successAction = deleteCompanySuccess;
    //     failAction = deleteCompanyFail;
    // }

    try {
        dispatch(startAction);
        let response;

        if (actionType === 'CREATE') {
            response = await handleCreateCompany(companyData);
        }

        const company = response.company;
        if (response && response.errCode === 0) {
            toast.success('Cập nhật thành công');
            dispatch(successAction(company));
        }
        else toast.error(`${response.message}`)
    } catch (error) {
        toast.error('Cập nhật thất bại')
        dispatch(failAction(error.message));
    }
};