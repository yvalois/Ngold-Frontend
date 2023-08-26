import {Api} from '../../../utils/Api';

const requestCategory = () => ({
    type: "FETCH_CATEGORIES_START",
});

const receiveCategory = payload => ({
    type: "FETCH_CATEGORIES_SUCCESS",
    payload: payload,
});

const errorCategory = payload => ({
    type: "FETCH_CATEGORIES_FAILURE",
    payload: payload,
});

export const fetchCategory = () => async dispatch => {
    dispatch(requestCategory());
    try {
        const data = await Api.getCategories();
        dispatch(receiveCategory(data));
    }
    catch (error) {
        dispatch(errorCategory(error));
    }
}

export const newCategory = (name) => async dispatch => {
    try {
        const data = await Api.createCategory(name);
        dispatch(receiveCategory(data));
    }
    catch (error) {
        dispatch(errorCategory(error));
    }
}

export const deleteCategory = (id) => async dispatch => {
    try {
        const data = await Api.deleteCategory(id);
        dispatch(receiveCategory(data));
    }
    catch (error) {
        dispatch(errorCategory(error));
    }
}