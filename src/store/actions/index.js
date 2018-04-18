import firebase from 'firebase';
import {
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_USER
} from './types';

export const emailChanged = (text) => {
    return{
        type: EMAIL_CHANGED,
        payload: text
    };
};

export const passwordChanged = (text) => {
    return{
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({email,password}) => {
    return(dispatch) => {
        dispatch({type: LOGIN_USER});

        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(user => {
                dispatch({type: LOGIN_SUCCESS, payload: user});
            })
            .catch( (error) => {                
                console.log(error);
                loginUserFail(dispatch);
            }); 
    };
    
};

const loginUserFail = (dispatch) => {
    dispatch({
       type: LOGIN_FAIL 
    });
}