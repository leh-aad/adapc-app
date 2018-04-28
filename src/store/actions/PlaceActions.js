import { Actions } from 'react-native-router-flux';
import {
    GET_DETAILS, GET_PLACE_IMG
} from './types';

export const getPlaceDetails = ({place_id}) => {
    return(dispatch) => {
        let url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid='+place_id+'&key=AIzaSyDXjSZ-gsHxG-WqacY_ufb52WZAF9_jdpo';
        fetch(url)
        .then(res => {
            if(res){
                return res.json();
            }else{
                throw new Error('error');
            }
        })
        .then(res => {
            dispatch({type: GET_DETAILS, payload: res})
        })
        .catch((error) => {
            console.log(error);
        })
    }
}

export const getPlaceImg = ({photo_reference}) => {
    return(dispatch) =>{
        let url = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='+photo_reference+'&key=AIzaSyDXjSZ-gsHxG-WqacY_ufb52WZAF9_jdpo';
        fetch(url)
        .then(res=>{
            return res.url;
        })
        .then(res =>{
            dispatch({type: GET_PLACE_IMG, payload: res})
        })
        .catch((error) => {
            console.log(error);
        })
    }
}