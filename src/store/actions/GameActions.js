import firebase from 'firebase';
import { UPDATE_LOGIN_COUNT, FIRST_LOGIN, GET_USER_COUNT, FIFTH_LOGIN, TENTH_LOGIN, UPDATE_POINTS_25, UPDATE_RATE_COUNT, UPDATE_POINTS_50, POINTS_100, POINTS_250, POINTS_500, POINTS_750, POINTS_1000, UPDATE_BADGES, GET_USERS_BY_POINTS, GET_LEADERBOARD } from './types';

export const gameAction = () => {
    var user = firebase.auth().currentUser;
    return(dispatch) => {
        var badge = null;
        firebase.database().ref(`/users/${user.uid}`)
        .once('value', snap => {
            if(snap.val().loginCount == 0){
                dispatch({type: FIRST_LOGIN, payload: snap.val().loginCount});
                badge = {name: FIFTH_LOGIN, path: '../assets/key.png'}
                dispatch(updateBadgeList(badge))
            }else if(snap.val().loginCount == 4){
                dispatch({type: FIFTH_LOGIN, payload: snap.val().loginCount});
                dispatch(updateBadgeList(FIFTH_LOGIN))
            }else if(snap.val().loginCount == 9){
                dispatch({type: TENTH_LOGIN, payload: snap.val().loginCount});
                dispatch(updateBadgeList(TENTH_LOGIN))
            }
            else{
                console.log('else');
            }
            dispatch(updateLoginCount(snap.val().loginCount, snap.val().points, user.uid));
            
        })
        dispatch(getUsersByPoints());
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
    return(dispatch) => {
        switch(points){
            case 100:
                dispatch({type: POINTS_100});
                dispatch(updateBadgeList(POINTS_100));
                break;
            case 250:
                dispatch({type: POINTS_250});
                dispatch(updateBadgeList(POINTS_250));
                break;
            case 500:
                dispatch({type: POINTS_500});
                dispatch(updateBadgeList(POINTS_500));
                break;
            case 750:
                dispatch({type: POINTS_750});
                dispatch(updateBadgeList(POINTS_750));
                break;
            case 1000:
                dispatch({type: POINTS_1000});
                dispatch(updateBadgeList(POINTS_1000));
                break;
            default:
                return;
        }
    }
}

const updateBadgeList = (badge) => {
    
    return(dispatch) =>{
        var user = firebase.auth().currentUser;
        var badges = [];
        firebase.database().ref('users/' + user.uid + '/badges')
        .on('value', snap => {
           if(snap.val()!=0){
                badges = snap.val();
           }
        });
        
        badges.push(badge);
    
        firebase.database().ref('users/' + user.uid).update({
            badges
        });
        dispatch({type: UPDATE_BADGES})
    }
}

export const getUsersByPoints = () => {
    let leaderboard = [];
    return(dispath) =>{
        firebase.database().ref('/users').orderByChild('points')
        .on("child_added", snap => {
            leaderboard.unshift({name: snap.val().name, points: snap.val().points})
            dispath({type: GET_LEADERBOARD, payload: leaderboard})  
        })
    }
}