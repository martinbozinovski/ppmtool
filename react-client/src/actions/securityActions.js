import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setJWToken from '../securityUtils/setJWToken';
import jwt_decode from 'jwt-decode';

export const createNewUser = (newUser, history) => async dispatch => {
    try {
        await axios.post("/api/users/register", newUser);
        history.push("/login");
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    };
};

export const login = LoginRequest => async dispatch => {
    try {
        const res = await axios.post("/api/users/login", LoginRequest);  //post the LoginRequest obj
        const { token } = res.data; //extract token from res.data
        localStorage.setItem("jwtToken", token);    //store the token in localStorage
        setJWToken(token);  //set our token in header
        const decoded = jwt_decode(token);  //decode token on React
        dispatch({  //dispatch to securityReducer
            type: SET_CURRENT_USER,
            payload: decoded
        }); 
    } catch (error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    };
};

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    setJWToken(false);
    dispatch({
        type: SET_CURRENT_USER,
        payload: {}
    });
};