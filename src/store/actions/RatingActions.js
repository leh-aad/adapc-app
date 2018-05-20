import firebase from 'firebase';
import b64 from 'base-64';
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

export const sendRating = (rating, id) => {
    return(dispatch) => {
        dispatch({type: PUSH_RATING});
        console.log(rating);
        firebase.database().ref("rates").child(id).set(rating);
    }
}

export const getRating = (id) => {  
    return(dispatch) => {
        firebase.database().ref(`/rates/${id}`)  
        .on('value', snap => {
            dispatch({type: GET_RATING_SUCCESS, payload: snap.val()})
        })
    }
}