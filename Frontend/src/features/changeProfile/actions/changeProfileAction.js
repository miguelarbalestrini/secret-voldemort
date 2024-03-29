import {
    GET_PROFILE_INFO,
    GET_PROFILE_INFO_FAIL,
    GET_PROFILE_INFO_SUCCESS
} from '../../../constants/actionTypes/changeProfile';
import axios from 'axios'
import api from '../../../configs/api'

export const getUserInfo = (userName, email, newPassword, password, fullName) => (dispatch, getState) => _getUserInfo(userName, email, newPassword, password, fullName, dispatch, getState);
const _getUserInfo = async (userName, email, newPassword, password, fullName, dispatch, getState) => {
	try {
        dispatch({type: GET_PROFILE_INFO});
        
        let {access_token} = {...getState().login}
        
        let bodyFormData = new FormData();

        if (password === undefined){
            bodyFormData.append('password', password);
        }
        else{
            bodyFormData.append('username',userName);
            bodyFormData.append('email', email);
            bodyFormData.append('new_password', newPassword);
            bodyFormData.append('password', password);
            bodyFormData.append('full_name', fullName);                       
        }

        const response = await axios({
            method: 'put',
            url: `${api.url}/user/`,
            data: bodyFormData,
            headers: { 
            'Content-Type':'multipart/form-data',
            "Authorization" : `Bearer ${access_token}`
            }
        });
        dispatch({type:  GET_PROFILE_INFO_SUCCESS, payload: {userInfo:  response.data}})
    } catch (error) {
        console.log(error, "ERROR")
        
        if (error.response.status === 401) dispatch({type: GET_PROFILE_INFO_FAIL, payload: {errorMsg: error.response.data.detail }});
        if (error.response.status === 403) dispatch({type: GET_PROFILE_INFO_FAIL, payload: {errorMsg: error.response.data.detail }});
        if (error.response.status === 422) dispatch({type: GET_PROFILE_INFO_FAIL, payload: {errorMsg: error.response.data.detail[0].msg }});	
	}
};