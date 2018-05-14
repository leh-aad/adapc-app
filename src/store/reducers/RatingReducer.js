import {
    RATING_CHANGED,
    GET_RATING_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    rating: null
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case RATING_CHANGED:
            return { ...state, rating: action.payload};
        case GET_RATING_SUCCESS:
            return { ...state, rating: action.payload};
        default: 
            return state;
    }
};