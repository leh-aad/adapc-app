import firebase from 'firebase';
import {
    RATING_CHANGED,
    PUSH_RATING,
    GET_RATING,
    GET_RATING_SUCCESS
} from './types';

export const ratingChanged = (rating) => {
    return{
        type: RATING_CHANGED,
        payload: rating
    }
}

export const sendRating = ({rating, id}) => {
    return(dispatch) => {
        dispatch({type: PUSH_RATING});
        firebase.database().ref(`/rates/${id}`).push({rating});
    }
}

export const getRating = ({id}) => { 
    const rate = {};
    return(dispatch) => {
        dispatch({type: GET_RATING});
        firebase.database().ref(`/rates/${id}`)  
        .once('value')
        .then(snap =>{
            console.log(snap.val())
        })
    }
}