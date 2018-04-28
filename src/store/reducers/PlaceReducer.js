import {
    GET_DETAILS, GET_PLACE_IMG    
} from '../actions/types';

const INITIAL_STATE = {
    details: null,
    img_url: ''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_DETAILS:
            
            return { ...state, details: action.payload };
        case GET_PLACE_IMG:
            return { ...state, img_url: action.payload }
        default: 
            return state;
    }
};