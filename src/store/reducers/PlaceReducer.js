import {
    GET_DETAILS    
} from '../actions/types';

const INITIAL_STATE = {
    details: null
};

export default (state = INITIAL_STATE, action) => {
    //console.log(action);
    switch(action.type){
        case GET_DETAILS:
            console.log(action.payload);
            return { ...state, details: action.payload };
        default: 
            return state;
    }
};