import {
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    GET_USER,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    USER_DATA,
    LOGOUT_USER
} from '../../../constants/actionTypes/login';

const initialState= {
    status: 'unknow',
    statusLogin: 'unknow',
    is_logged: false,
    access_token: '',
    user: {},
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                status: 'loading'
            }
        case LOGIN_USER_FAIL:
            return {
                ...state,
                status: 'failed',
                is_logged: false,
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state, 
                status: 'success',
                is_logged: true,
                access_token: action.payload.access_token
            }
        case GET_USER: 
            return {
                ...state, 
                statusLogin: 'loading',
            }
        case GET_USER_SUCCESS: 
            return {
                ...state, 
                statusLogin: 'success',
                access_token: action.payload.access_token,
                is_logged: true
            }
        case GET_USER_FAIL: 
            return {
                ...state,
                statusLogin: 'failed',
                is_logged: false,
            }
        case USER_DATA: 
            return {
                ...state,
                user: action.payload.user
            }
        case LOGOUT_USER:
            return {
                ...state,
                statusLogin: false,
                is_logged: false
            }
        default:
            return {...state};
    }
};