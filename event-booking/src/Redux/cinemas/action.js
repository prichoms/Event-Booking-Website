import axios from "axios"
import {
    GET_CINEMAS_FAILURE,
    GET_CINEMAS_REQUEST,
    GET_CINEMAS_SUCCESS
} from "./actionTypes"


// GET CINEMAS --------------------------------------------

const getCinemasRequest = () => {
    return {
        type: GET_CINEMAS_REQUEST
    }
}
const getCinemasSuccess = (payload) => {
    return {
        type: GET_CINEMAS_SUCCESS,
        payload
    }
}
const getCinemasFailure = () => {
    return {
        type: GET_CINEMAS_FAILURE
    }
}

export const getCinemas = () => dispatch => {
    dispatch(getCinemasRequest());
    return axios.get("http://localhost:3001/cinema")
        .then(res => {
            console.log(res.data[0]);
            dispatch(getCinemasSuccess(res.data[0]))})
        .catch(error => dispatch(getCinemasFailure(error)))
}