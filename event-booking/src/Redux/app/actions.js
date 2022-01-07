import {
    GET_EVENTS_FAILURE,
    GET_EVENTS_REQUEST,
    GET_EVENTS_SUCCESS,
    GET_POPULAR_EVENTS_FAILURE,
    GET_POPULAR_EVENTS_REQUEST,
    GET_POPULAR_EVENTS_SUCCESS
} from "./actionTypes"
import datpop from '../../database/db.json';



// GET EVENTS-----------------------------------

const getEventsRequest = () => {
    return {
        type: GET_EVENTS_REQUEST
    }
}
const getEventsSuccess = (payload) => {
    return {
        type: GET_EVENTS_SUCCESS,
        payload
    }
}
const getEventsFailure = (error) => {
    return {
        type: GET_EVENTS_FAILURE,
        error
    }
}

export const getEvents = () => (dispatch) => {
    dispatch(getEventsRequest);
    var filtered = datpop.events.filter(a => a.is_popular == false);
    return dispatch(getEventsSuccess(filtered));
}



//GET POPULAR EVENTS---------------------------------------------

const getPopularEventsRequest = () => {
    return {
        type: GET_POPULAR_EVENTS_REQUEST
    }
}
const getPopularEventsSuccess = (payload) => {
    return {
        type: GET_POPULAR_EVENTS_SUCCESS,
        payload
    }
}
const getPopularEventsFailure = () => {
    return {
        type: GET_POPULAR_EVENTS_FAILURE
    }
}

export const getPopularEvents = () => dispatch => {
    dispatch(getPopularEventsRequest());
    var filtered = datpop.events.filter(a => a.is_popular == true);
   return dispatch(getPopularEventsSuccess(filtered));
        
}





// Auth----------------------------------------


export const storeAuth = (auth) => {
   return {type: "LOGIN-AUTH",
    auth}
}