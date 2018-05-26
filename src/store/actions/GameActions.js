import firebase from 'firebase';
import { UPDATE_LOGIN_COUNT, FIRST_LOGIN, GET_USER_COUNT, FIFTH_LOGIN, TENTH_LOGIN, UPDATE_POINTS_25, UPDATE_RATE_COUNT, UPDATE_POINTS_50, POINTS_100, POINTS_250, POINTS_500, POINTS_750, POINTS_1000 } from './types';

export const gameAction = () => {
    var user = firebase.auth().currentUser;
    return(dispatch) => {
        firebase.database().ref(`/users/${user.uid}`)
        .once('value', snap => {
            if(snap.val().loginCount == 0){
                dispatch({type: FIRST_LOGIN, payload: snap.val().loginCount});
            }else if(snap.val().loginCount == 4){
                dispatch({type: FIFTH_LOGIN, payload: snap.val().loginCount});
            }else if(snap.val().loginCount == 9){
                dispatch({type: TENTH_LOGIN, payload: snap.val().loginCount});
            }
            else{
                console.log('else');
            }
            dispatch(updateLoginCount(snap.val().loginCount, snap.val().points, user.uid));
        })
    }
}

export const updateLoginCount = (count,points,uid) => {
    return(dispatch) => {
        firebase.database().ref('users/' + uid).update({
            loginCount: count + 1,
            //points: points + 25
        })
        //dispatch(checkPoints(points+25));
        dispatch({type: UPDATE_LOGIN_COUNT});
        //dispatch({type: UPDATE_POINTS_25});
        
    }
}

export const updatePointsRating = (points,rating) => {
    return(dispatch) => {
        var user = firebase.auth().currentUser;
        firebase.database().ref('users/' + user.uid).update({
            points: points + 50,
            ratingCount: rating + 1
        })
        dispatch(checkPoints(points+50));
        dispatch({type: UPDATE_POINTS_50, payload: points+50});
        dispatch({type: UPDATE_RATE_COUNT, payload: rating+1});
        
    }
}
//refac para maior ou igual 
export const checkPoints = (points) => {
    console.log('check', points)
    return(dispatch) => {
        switch(points){
            case 100:
                dispatch({type: POINTS_100});
                break;
            case 250:
                dispatch({type: POINTS_250});
                break;
            case 500:
                dispatch({type: POINTS_500});
                break;
            case 750:
                dispatch({type: POINTS_750});
                break;
            case 1000:
                dispatch({type: POINTS_1000});
                break;
            default:
                return;
        }
    }
}