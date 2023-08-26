import {Api} from '../../../utils/Api';

const requestSubCategory = () => ({
    type: "FETCH_SUBCATEGORIES_START",
});

const receiveSubCategory = payload => ({
    type: "FETCH_SUBCATEGORIES_SUCCESS",
    payload: payload,
});

const errorSubCategory = payload => ({
    type: "FETCH_SUBCATEGORIES_FAILURE",
    payload: payload,
});

export const fetchSubCategory = () => async dispatch => {
    dispatch(requestSubCategory());
    try {
        const data = await Api.getSubCategories();
        dispatch(receiveSubCategory(data));
    }
    catch (error) {
        dispatch(errorSubCategory(error));
    }
}

export const newSubCategory = (name) => async dispatch => {
    try {
        const data = await Api.createSubCategory(name);
        dispatch(receiveSubCategory(data));
    }
    catch (error) {
        dispatch(errorSubCategory(error));
    }
}

export const deleteSubCategory = (id) => async dispatch => {
    try {
        const data = await Api.deleteSubCategory(id);
        dispatch(receiveSubCategory(data));
    }
    catch (error) {
        dispatch(errorSubCategory(error));
    }
}
export const updateSubCategory = (id, name) => async dispatch => {
    try {
        const data = await Api.updateSubCategory(id, name);
        dispatch(receiveSubCategory(data));
    }
    catch (error) {
        dispatch(errorSubCategory(error));
    }
}

export const createSubcategoryOption = (id, option) => async dispatch => {
    try {
        const data = await Api.createSubcategoryOption(id, option);
        dispatch(receiveSubCategory(data));
    }
    catch (error) {
        dispatch(errorSubCategory(error));
    }
}

export const deletesubcategoryoption = (id, option) => async dispatch => {
    try {
        const data = await Api.deletesubcategoryoption(id, option);
        dispatch(receiveSubCategory(data));
    }
    catch (error) {
        dispatch(errorSubCategory(error));
    }
}

