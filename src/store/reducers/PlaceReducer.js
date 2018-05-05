import {
    GET_DETAILS, GET_PLACE_IMG, GET_NEAR_PLACES, GET_NEAR_PLACES_SUCCESS    
} from '../actions/types';

const INITIAL_STATE = {
    details: null,
    img_url: '',
    place_list: [],
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_DETAILS:
            return { ...state, details: action.payload };
        case GET_PLACE_IMG:
            return { ...state, img_url: action.payload };
        case GET_NEAR_PLACES:
            return { ...state, loading: true};
        case GET_NEAR_PLACES_SUCCESS:
            return { ...state, place_list: action.payload, loading: false}
        default: 
            return state;
    }
};