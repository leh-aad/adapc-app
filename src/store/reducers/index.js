import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PlaceReducer from './PlaceReducer';

export default combineReducers({
    auth: AuthReducer,
    place: PlaceReducer
});

