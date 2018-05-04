import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_USER,
    REGISTER_USER,
    REGISTER_SUCCESS,
    REGISTER_FAIL
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
                Actions.main();
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

const registerUser = ({email, password}) => {
    return(dispatch) =>{
        dispatch({type: REGISTER_USER});

        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(user =>{
                dispatch({type: REGISTER_SUCCESS, payload: user})
            })
            .catch((error) =>{
                dispatch({type: REGISTER_FAIL});
            })
    }
}