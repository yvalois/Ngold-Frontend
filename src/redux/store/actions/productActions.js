
import {Api} from '../../../utils/Api';
import {ethers} from 'ethers';

const requestProducts = () => ({
  type: "REQUEST_PRODUCTS",
})

const receiveProducts = payload => ({
  type: "RECEIVE_PRODUCTS",
  payload: payload,
})

const errorProducts = payload => ({
  type: "ERROR_PRODUCTS",
  payload: payload,
})

export const fetchProducts = () => async dispatch => {
  dispatch(requestProducts());
  try {
    
    const data = await Api.getProducts();
  
    dispatch(receiveProducts({
      products: data,
    }));
  }
  catch (error) {
    dispatch(errorProducts(error));
  }
}

export const fetchNewProduct = (formData) => async dispatch => {
  try {
    const data = await Api.createProduct(formData);
    dispatch(receiveProducts({
      products: data,
    }));
  }
  catch (error) {
    dispatch(errorProducts(error));
  }
}

export const editProducts = (formData, id) => async dispatch => {
  try {
    const data = await Api.updateProduct(formData, id);
    dispatch(receiveProducts({
      products: data,
    }));
  }
  catch (error) {
    dispatch(errorProducts(error));
  }
}

export const deleteProducts = (id) => async dispatch => {
  try {
    const data = await Api.deleteProduct(id);
    dispatch(receiveProducts({
      products: data,
    }));
  }
  catch (error) {
    dispatch(errorProducts(error));
  }
}




