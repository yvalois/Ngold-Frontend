import { STORE_ID } from "./Api"

export const setToken = (token) => {
  window.localStorage.setItem(`token_store${STORE_ID}`, token)
}

export const getToken = () => {
  let token = window.localStorage.getItem(`token_store${STORE_ID}`)
  if (!!token) return token
  return false
}

export const removeToken = () => {
  window.localStorage.removeItem(`token_store${STORE_ID}`)
}





