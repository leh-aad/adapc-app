import { Actions } from 'react-native-router-flux';
import {
    GET_DETAILS, 
    GET_PLACE_IMG,
    GET_NEAR_PLACES,
    GET_NEAR_PLACES_SUCCESS,
    GET_DETAILS_SUCCESS
} from './types';
var _ = require('lodash');

export const getNearPlaces = () => {
    return(dispatch) => {
        dispatch({type: GET_NEAR_PLACES})
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = Number(position.coords.latitude.toFixed(6));
                const long = Number(position.coords.longitude.toFixed(6));
                let url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=500&key=AIzaSyDXjSZ-gsHxG-WqacY_ufb52WZAF9_jdpo`;
                
                fetch(url)
                .then(res=>{
                    return res.json();
                })
                .then(res=>{
                   const data = _.uniqBy([...res.results], 'id');
                   dispatch({ type: GET_NEAR_PLACES_SUCCESS, payload: data});
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        )
            
    }

}

export const getPlaceDetails = ({place_id}) => {
    return(dispatch) => {
        dispatch({type: GET_DETAILS})
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
            dispatch({type: GET_DETAILS_SUCCESS, payload: res});
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