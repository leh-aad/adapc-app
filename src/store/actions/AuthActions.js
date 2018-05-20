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
    REGISTER_FAIL,
    LOGOUT_USER,
    REGISTER_FAIL_PASSWORD,
    REGISTER_FAIL_INVALID_EMAIL,
    REGISTER_FAIL_EMAIL_IN_USE,
    NAME_CHANGED,
    GET_USER_DATA
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

export const nameChanged = (text) => {
    return{
        type: NAME_CHANGED,
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

export const logoutUser = () => {
    return(dispatch)=>{
        dispatch({type: LOGOUT_USER});

        firebase.auth().signOut()
        .then(() => {
            Actions.login();
        })
    };
};

const loginUserFail = (dispatch) => {
    dispatch({
       type: LOGIN_FAIL 
    });
};

export const registerUser = ({email, password, name}) => {
    return(dispatch) =>{
        dispatch({type: REGISTER_USER});
        
        firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(user => {
                firebase.database().ref('users/' + user.uid).set({
                    name: name,
                    points: 0,
                    loginCount: 0
                })
                .then(
                    dispatch({type: REGISTER_SUCCESS, payload: user})
                )
            })
            .catch((error) =>{
                if(error.code == 'auth/weak-password'){
                    dispatch({type: REGISTER_FAIL_PASSWORD});
                }
                else if(error.code == 'auth/invalid_email'){
                    dispatch({type: REGISTER_FAIL_INVALID_EMAIL});
                }
                else if(error.code == 'auth/email-already-in-use'){
                    dispatch({type: REGISTER_FAIL_EMAIL_IN_USE});
                }else{
                    dispatch({type: REGISTER_FAIL})
                }  
            })
    };
};

export const getUserData = () => {
    var user = firebase.auth().currentUser;
    return(dispatch) => {
        console.log("action",user.uid);
        firebase.database().ref(`/users/${user.uid}`)
        .on('value', snap => {
            console.log("snap",snap.val());
            dispatch({ type: GET_USER_DATA, payload: snap.val()})
        })
    }
        
    
}