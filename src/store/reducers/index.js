import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlaceReducer from './PlaceReducer';
import RatingReducer from './RatingReducer';

export default combineReducers({
    auth: AuthReducer,
    place: PlaceReducer,
    rate: RatingReducer
});

