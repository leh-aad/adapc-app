import { Actions } from 'react-native-router-flux';
import {
    GET_DETAILS
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