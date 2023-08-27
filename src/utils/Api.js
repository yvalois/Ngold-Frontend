import axios from 'axios';
import {getToken, setToken} from './localstorage'


const API = "https://plankton-app-it5jy.ondigitalocean.app/api"
//const API = "http://localhost:3000/api"

export const STORE_ID = "62f8d7884c3b4800136678c8"

export const TOKEN_NAME = 'Ngold';


const getStore = async () => {
  const {data} = await axios.get(`${API}/stores/${STORE_ID}`);
  return data;
}

const updateStore = async (store) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.put(`${API}/stores/update`, store, {headers});
  return data;
}


const getUser = async () => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.get(`${API}/user/user`, {headers})
  return data
}

const getUsers = async () => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.get(`${API}/user/users`, {headers})
  return data
}

const sigIn = async ({email, password}) => {
  const {data} = await axios.post(`${API}/user/signin`, 
  {
    email, 
    password, 
    storeId: STORE_ID
  })
  //save token to localstorage
  setToken(data.token)
  return data
}

const sigUp = async (fullName, email, password) => {
  const {data} = await axios.post(`${API}/user/signup`, {
    fullName, 
    email, 
    password, 
    storeId:STORE_ID
  })
  //save token to localstorage
  setToken(data.token)
  return data
}

const verifyEmail = async (code) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.post(`${API}/user/verify/email/code`, {
    verificationCode: code
  }, {headers})
  return data
}

const newCode = async () => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.post(`${API}/user/verify/email/code/new`, {}, {headers})
  return data
}


const modifyUserRole = async (userId, newRole) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.put(`${API}/user/user`, {
    _id: userId,
    role: newRole
  }, {headers})
  return data
}

const getProducts = async () => {
  const {data} = await axios.get(`${API}/products/${STORE_ID}`)

  return data
}

const getProductById = async (id) => {
  const {data} = await axios.get(`${API}/products/${id}`)
  return data
}

const getProductsByCategory = async (storeId, category) => {
  const {data} = await axios.get(`${API}/products/category/${storeId}/${category}`)
  return data
}

const createProduct = async (formData) => {
  const token = getToken()
  const headers = {
  
    'Authorization': `Bearer ${token}`,

  }
  const {data} = await axios.post(`${API}/products/`, {formData}, {headers})
  return data
}

const updateProduct = async (formData, id) => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.put(`${API}/products/${id}`, {formData}, {headers})
  return data
}

const deleteProduct = async (id) => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.delete(`${API}/products/${id}`, {headers})
  return data
}


const getCategories = async () => {
  const {data} = await axios.get(`${API}/categories/${STORE_ID}`)
  return data
}

const getCategoryById = async (id) => {
  const {data} = await axios.get(`${API}/categories/${id}`)
  return data
}

const createCategory = async (name) => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.post(`${API}/categories/`, {name}, {headers})
  return data
}

const deleteCategory = async (id) => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.delete(`${API}/categories/${id}`, {headers})
  return data
}

const addToCart = async (productId, quantity, option) => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.post(`${API}/cart/add`, {productId, count:quantity, option:option}, {headers})
  return data
}

const removeFromCart = async (productId) => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.post(`${API}/cart/delete/${productId}`, {}, {headers})
  return data
}


const getCart = async () => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.get(`${API}/cart/`, {headers})
  return data
}


const clearCart = async () => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.post(`${API}/cart/clear`, {}, {headers})
  return data
}

const modifyCart = async (productId, quantity) => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.post(`${API}/cart/modify`, {
    productId, 
    count: quantity
  }, {headers})
  return data
}

const getOrders = async () => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.get(`${API}/orders/`, {headers})
  return data
}

const createOrder = async (order) => {
  const token = getToken()
  const body = {
    fullName: order.Address.fullName,
    address: order.Address.address,
    zipCode: order.Address.zipCode,
    city: order.Address.city,
    country: order.Address.country,
    state: order.Address.state,
    phone: order.Address.phone,
    total: order.total,
    payed: order.payed,
    tokenUsed: order.tokenUsed,
    wallet: order.wallet,
    txHash: order.txHash,
    orderType: order.orderType,
    products : order.cartItems.map(item => {
      return {
        productId: item.product,
        count: item.qty,
        price: item.price,
        name: item.name,
        option: item.option
      }})
    
  }
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.post(`${API}/orders/`, body, {headers})
  return data
}

const confirmOrCancel = async (orderId, finalStatus) => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.put(`${API}/orders/${orderId}`, {finalStatus: finalStatus}, {headers})
  return data
}

const getAdminOrders = async () => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.get(`${API}/orders/admin`, {headers})
  return data
}

const getSubCategories = async () => {
  const {data} = await axios.get(`${API}/subcategories/${STORE_ID}`)
  return data
}

const createSubCategory = async (name) => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.post(`${API}/subcategories/`, {name}, {headers})
  return data
}

const createSubcategoryOption =async (id, option)=> {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.post(`${API}/subcategories/${id}`, {name:option}, {headers})
  return data
}


const deleteSubCategory = async (id) => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.delete(`${API}/subcategories/${id}`, {headers})
  return data
}

const updateSubCategory = async (id, name) => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.put(`${API}/subcategories/${id}`, {name}, {headers})
  return data
}

const deletesubcategoryoption = async (id, option) => {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
  const {data} = await axios.delete(`${API}/subcategories/${id}/${option}`, {headers})
  return data
}

const requestChangePassword = async (email) => {
  const {data} = await axios.post(`${API}/user/reset/password/${STORE_ID}`, {email})
  return data
}

const changePassword = async (code, password, email) => {
  const {data} = await axios.post(`${API}/user/reset/password/new/${STORE_ID}`, {
    verificationCode: code,
    password,
    email
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data
}





export const Api = {
  getUser,
  sigIn,
  sigUp,
  getProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getCategoryById,
  createCategory,
  deleteCategory,
  addToCart,
  removeFromCart,
  getCart,
  clearCart,
  modifyCart,
  getOrders,
  STORE_ID,
  createOrder,
  getStore, 
  updateStore,
  confirmOrCancel,
  getAdminOrders, 
  TOKEN_NAME,
  getUsers,
  modifyUserRole,
  verifyEmail,
  newCode,
  getSubCategories,
  createSubCategory,
  deleteSubCategory,
  updateSubCategory,
  createSubcategoryOption,
  deletesubcategoryoption,
  requestChangePassword,
  changePassword
}
