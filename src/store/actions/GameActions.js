import firebase from 'firebase';
import { UPDATE_LOGIN_COUNT, FIRST_LOGIN, GET_USER_COUNT, FIFTH_LOGIN, TENTH_LOGIN, UPDATE_POINTS_25, UPDATE_RATE_COUNT, UPDATE_POINTS_50, POINTS_100, POINTS_250, POINTS_500, POINTS_750, POINTS_1000, UPDATE_BADGES, GET_USERS_BY_POINTS, GET_LEADERBOARD, FIRST_RATE, FIFTH_RATE, FOOD_BADGE, SCHOOL_BADGE } from './types';

export const gameAction = () => {
    var user = firebase.auth().currentUser;
    return(dispatch) => {
        var badge = null;
        firebase.database().ref(`/users/${user.uid}`)
        .once('value', snap => {
            if(snap.val().loginCount == 0){
                dispatch({type: FIRST_LOGIN, payload: snap.val().loginCount});
                badge = {name: FIRST_LOGIN, path: 'key'}
                dispatch(updateBadgeList(badge))
            }else if(snap.val().loginCount == 4){
                dispatch({type: FIFTH_LOGIN, payload: snap.val().loginCount});
                badge = {name: FIFTH_LOGIN, path: 'door5'}
                dispatch(updateBadgeList(badge))
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
        dispatch(checkRatingCount(rating+1));
        dispatch({type: UPDATE_POINTS_50, payload: points+50});
        dispatch({type: UPDATE_RATE_COUNT, payload: rating+1});
       
    }
}

export const checkRatingCount = (count) => {
    return(dispatch) => {
        switch(count){
            case 1:
                dispatch({type: FIRST_RATE})
                badge = {name: FIRST_RATE, path: 'star1'}
                dispatch(updateBadgeList(badge))
                break;
            case 5:
                dispatch({type: FIFTH_RATE})
                badge = {name: FIFTH_RATE, path: 'star5'}
                dispatch(updateBadgeList(badge))
            default:
                return;
        }
    }
}

//refac para maior ou igual 
export const checkPoints = (points) => {
    return(dispatch) => {
        switch(points){
            case 100:
                dispatch({type: POINTS_100})
                badge = {name: POINTS_100, path: '100p'}
                dispatch(updateBadgeList(badge))
                break;
            case 250:
                dispatch({type: POINTS_250})
                badge = {name: POINTS_250, path: '250p'}
                dispatch(updateBadgeList(badge))
                break;
            case 500:
                dispatch({type: POINTS_500})
                badge = {name: POINTS_500, path: '500p'}
                dispatch(updateBadgeList(badge))
                break;
            case 750:
                dispatch({type: POINTS_750})
                badge = {name: POINTS_750, path: '750p'}
                dispatch(updateBadgeList(badge))
                break;
            case 1000:
                dispatch({type: POINTS_1000})
                badge = {name: POINTS_1000, path: '1000p'}
                dispatch(updateBadgeList(badge))
                break;
            default:
                return;
        }
    }
}

export const checkRateType = (types,badges) =>{
    return(dispatch) => {
        var badge= null;
        for(var i=0; badges.length; i++){
            for(var j=0; types.length; j++){
                if(badges[i].name != types[j]){
                    if(types[j] == 'restaurant' || types[j] == 'food'){
                        dispatch({type: FOOD_BADGE})
                        badge = {name: FOOD_BADGE, path: 'food'}
                        dispatch(updateBadgeList(badge))
                        return;
                    }
                    if(types[j] == 'school' || types[j] == 'university'){
                        dispatch({type: SCHOOL_BADGE})
                        badge = {name: SCHOOL_BADGE, path: 'books'}
                        dispatch(updateBadgeList(badge))
                        return;
                    }
                }
            }
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