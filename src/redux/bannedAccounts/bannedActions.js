import axios from "axios"
import { APIROUTER } from "../api/apiActions"

const loadingBanned = () => {
    return {
        type: "LOADING_BANNED",
    }
}

const loadingBannedSuccess = (payload) => {
    return {
        type: "LOADING_BANNED_SUCCESS",
        payload,
    }
}

const loadingBannedFailure = (payload) => {
    return {
        type: "LOADING_BANNED_FAILURE",
        payload,
    }
}


export const getBanned = () => async (dispatch) => {
    dispatch(loadingBanned());
    try{
        const { data } = await axios.get(APIROUTER + 'getbanneds');
        dispatch(loadingBannedSuccess({
            bannedAccounts: data,
        }));
    } catch(error) {
        dispatch(loadingBannedFailure({
            errorMsg: error.message,
        }));
    }
}

export const addBanned = (addressBanned, poolsBanned, accountAddress) => async (dispatch) => {
    dispatch(loadingBanned());
    try{
        const { data } = await axios.post(APIROUTER + `addbanned/${accountAddress}`, {
            addressBanned,
            poolsBanned,
        });
        dispatch(loadingBannedSuccess({
            bannedAccounts: data,
        }));
    } catch(error) {
        dispatch(loadingBannedFailure({
            errorMsg: error.message,
        }));
    }
}

export const removeBanned = (id, accountAddress) => async (dispatch) => {
    dispatch(loadingBanned());
    try{
        const { data } = await axios.delete(APIROUTER + `deletebanned/${id}/${accountAddress}`);
        dispatch(loadingBannedSuccess({
            bannedAccounts: data,
        }));
    } catch(error) {
        dispatch(loadingBannedFailure({
            errorMsg: error.message,
        }));
    }
}